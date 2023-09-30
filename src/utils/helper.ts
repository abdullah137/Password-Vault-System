import * as argon from 'argon2';
import * as crypto from 'crypto';

export const genHash = (password: string) => {
  return argon.hash(password);
};

export const generateSalt = () => {
  return crypto.randomBytes(64).toString('hex');
};
