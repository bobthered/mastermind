// imports
import mongodb from 'mongodb';
import { connect } from '../../db/index.js';
import { sign, verify } from '../../jwt/index.js';

// destructure mongodb
const { ObjectId } = mongodb;

export default (io, socket) => {
  socket.on('updateSettings', async ({ token, settings }, callback) => {
    console.log('socket.io - updateSettings');

    // connect to db
    const client = await connect();

    try {
      // verify token
      const _id = await verify(token);

      // find and update user
      const user = await client.db().collection('users').findOneAndUpdate({ _id: ObjectId(_id) }, { $set: { settings } }, { new: true });

      // error if user is null
      if (user === null) throw 'Could not verify user.'

      // update token
      token = await sign(_id)

      callback({ settings, token })
    } catch (error) {
      callback({ error })
    }
  })
}