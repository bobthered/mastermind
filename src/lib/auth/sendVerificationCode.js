// imports
import { ObjectId } from 'mongodb';
import path from 'path';
import { connect } from '../db/index.js';
import sendMail from '../sendMail/index.js';
import { generateVerificationCode } from './index.js';

export default async options => {
  // initiate defaults
  const defaults = {
    _id: null,
    email: null,
    type: 'user'
  }

  // merge defaults and options
  options = Object.assign(defaults, options);

  // deconstruct options
  const { _id, email, type } = options;

  // connect to db
  const client = await connect();

  // generate code
  const code = generateVerificationCode();

  // get expire time
  const now = new Date();
  const expires = new Date(now.getTime() + 1000 * 60 * 5)

  // insert into db
  await client.db().collection('user-verifications').findOneAndUpdate({ _id: ObjectId(_id) }, { $set: { _id: ObjectId(_id), code, expires } }, { upsert: true });

  // send verification email
  await sendMail({
    replacements: {
      code,
      title: type === 'user' ? 'Here is your code to verify your account.' : 'Here is your code to reset your password.'
    },
    subject: 'Mastermind Verification Code',
    template: 'user-verification.html',
    to: email,
    attachments: [{
      filename: 'dark=false.png',
      path: path.resolve('./static/logo/dark=false.png'),
      cid: 'logo'
    }]
  })
  return { code };
}