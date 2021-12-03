// imports
import _dotenvConfig from 'dotenv/config';
import jwt from 'jsonwebtoken';

export default async token => {
  // decode token
  const decoded = await jwt.verify(token, import.meta.env?.JWT_SECRET || process.env.JWT_SECRET);

  // destructure token
  const { _id } = decoded;

  return _id;
}