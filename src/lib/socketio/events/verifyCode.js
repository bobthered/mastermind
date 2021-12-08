// imports
import { connect } from '../../db/index.js';
import { sign } from '../../jwt/index.js';
import { ObjectId } from 'mongodb';


export default (io, socket) => {
  socket.on('verifyCode', async ({ code, email }, callback) => {
    console.log('socket.io - verifyCode');

    // connect to db
    const client = await connect();

    try {
      // find email in db
      const user = await client.db().collection('users').findOne({ banned: false, email });

      // error if user is null
      if (user === null) throw 'Credentials could not be verified.'

      // deconstruct user
      const { _id, settings } = user;

      // find verification in db
      const verification = await client.db().collection('user-verifications').findOne({ _id: ObjectId(_id) })

      // error if verification is null
      if (verification === null) throw 'Could not find user to verify.'

      // get current time
      const now = new Date().getTime();

      // get expires time
      const expires = new Date(verification.expires).getTime();

      // error if code has expired
      if (now > expires) throw 'Code has expired.';

      // error if code does not match
      if (code.toString() !== verification.code.toString()) {
        console.log(code.toString(), verification.code.toString())
        throw 'Could not find verify code for user.'
      }

      // remove code
      await client.db().collection('user-verifications').findOneAndDelete({ _id: ObjectId(_id) })

      // update user verification
      await client.db().collection('users').findOneAndUpdate({ _id: ObjectId(_id) }, { $set: { verified: true } })

      // update token
      const token = await sign(_id);

      callback({ settings, token })
    } catch (error) {
      callback({ error })
    }
  })
}