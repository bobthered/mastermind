// imports
import { connect } from '../../db/index.js';
import { sendVerificationCode } from '../../auth/index.js';

export default (io, socket) => {
  socket.on('resendPasswordVerificationCode', async ({ email }, callback) => {
    console.log('socket.io - resendPasswordVerificationCode');

    // connect to db
    const client = await connect();

    try {
      // find email in db
      const user = await client.db().collection('users').findOne({ banned: false, email });

      // error if user is null
      if (user === null) throw 'Credentials could not be verified.'

      // deconstruct user
      const { _id } = user;

      // send verification code
      await sendVerificationCode({ _id, email, type: 'password' });

      return callback({})
    } catch (error) {
      callback({ error })
    }
  })
}