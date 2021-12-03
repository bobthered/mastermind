// imports
import mongodb from 'mongodb';
import { connect } from '../../db/index.js';
import { sign, verify } from '../../jwt/index.js';

// destructure mongodb
const { ObjectId } = mongodb;

export default (io, socket) => {
  socket.on('createGame', async ({ settings, token }, callback) => {
    console.log('socket.io - createGame');

    // connect to db
    const client = await connect();

    try {
      // verify token
      let _id = await verify(token);

      // initiate date
      const date = new Date();

      // initiate insert
      const insert = {
        _userIds: [ObjectId(_id)],
        date,
        settings
      }

      // update token
      token = await sign(_id)

      // insert into db
      const { insertedId } = await client.db().collection('games').insertOne(insert);

      callback({ _id: insertedId, token })
    } catch (error) {
      callback({ error })
    }
  })
}