import { log } from 'console';
import * as crypto from 'crypto';

export class RSACrypto {
  public static encrypt(value: string, publicKey: string): string {
    const encryptedValue = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(value),
    );
    return encryptedValue.toString('base64');
  }

  public static decrypt(value: string, privateKey: string): string {
    log(value);
    log(privateKey);
    const decryptedValue = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(value, 'base64'),
    );
    return decryptedValue.toString('utf8');
  }
}