import crypto from 'crypto'

import 'dotenv/config'

const {  PASSKEY, SALT } = process.env
const ALGORITHM = "AES-256-CBC"

// Generate a cipher key from the password.
function getCipherKey(): Buffer {

  return crypto.createHash('sha256').update(<string>PASSKEY).digest();
}

export function encryptFile(fileData: Buffer) {

  const CIPHER_KEY = getCipherKey();

  const cipher = crypto.createCipheriv(ALGORITHM, CIPHER_KEY, <string>SALT);
  const crypted = Buffer.concat([cipher.update(fileData), cipher.final()]);
  return crypted;

}


export function dencryptFile(encData: string) {


  const dataBuffer = Buffer.from(encData, 'base64');
  const CIPHER_KEY = getCipherKey();

  const cipher = crypto.createDecipheriv(ALGORITHM, CIPHER_KEY, <string>SALT);
  const decrypted = Buffer.concat([cipher.update(dataBuffer), cipher.final()]);
  return decrypted;
}