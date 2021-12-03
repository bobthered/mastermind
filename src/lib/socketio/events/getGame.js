// imports
import mongodb from 'mongodb';
import { connect } from '../../db/index.js';
import { sign, verify } from '../../jwt/index.js';

// destructure mongodb
const { ObjectId } = mongodb;

export default (io, socket) => {
  socket.on('getGame', async ({ _id: _gameId, token }, callback) => {
    console.log('socket.io - getGame');

    // connect to db
    const client = await connect();

    try {
      // verify token
      const _id = await verify(token);

      // find game
      const game = await client.db().collection('games').findOne({ _id: ObjectId(_gameId) })

      // return error if game does not exist
      if (game === null) throw 'Could not find game.';

      // add now to game
      game.now = new Date();
      
      // update token
      token = await sign(_id)

      callback({ game, token })
    } catch (error) {
      callback({ error })
    }
  })
}