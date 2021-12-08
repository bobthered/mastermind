// imports
import bcrypt from 'bcryptjs';
import { connect } from '../../db/index.js';
import { sign } from '../../jwt/index.js';
import { sendVerificationCode } from '../../auth/index.js';

export default (io, socket) => {
  socket.on('register', async ({ email, password }, callback) => {
    console.log('socket.io - register');

    // connect to db
    const client = await connect();

    // check if email already exists
    let user = await client.db().collection('users').findOne({ email });

    // return error if user exists
    if (user !== null) return callback({ error: `Email '${email}' already exists.` })

    // hash password
    password = await bcrypt.hash(password, 10);

    // initiate user settings
    const settings = {
      color: 'blue',
      darkMode: true,
      fontSize: 16
    }

    // initiate user
    user = {
      banned: false,
      email,
      password,
      settings,
      verified: false
    }

    // insert into db
    const { insertedId: _id } = await client.db().collection('users').insertOne(user)

    // generate token
    const token = await sign(_id);

    // send verification code
    await sendVerificationCode({ _id, email });

    return callback({ token })
  })
}