// imports
import bcrypt from 'bcryptjs';
import { connect } from '../../db/index.js';
import { sign } from '../../jwt/index.js';

export default (io, socket) => {
  socket.on('signIn', async ({ email, password }, callback) => {
    console.log('socket.io - signIn');

    // connect to db
    const client = await connect();

    try {
      // find email in db
      const user = await client.db().collection('users').findOne({ banned: false, email });

      // error if user is null
      if (user === null) throw 'Credentials could not be verified.'

      // compare password
      const compare = await bcrypt.compare(password, user.password);

      // error if password doesn't match
      if (!compare) throw 'Credentials could not be verified.'

      // deconstruct user
      const { _id, settings, verified } = user;

      // error if status is not verified
      if (!verified) throw 'User has not been verified.'

      // generate token
      const token = await sign(_id);

      callback({ settings, token })
    } catch (error) {
      callback({ error })
    }
  })
}