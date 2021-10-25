import crypto, { Hash, Cipher, Decipher, BinaryLike } from 'crypto';

export class Octanv3 {
  private keyPass: string = '84A2BE1BE98BF07B2D694CC41C78EFBB';
  private firstHash: any;
  private secondHash: any;
  private algorithm : string = 'sha1';
  constructor() {
    this.firstHash = crypto.createHash(this.algorithm);
    this.secondHash = crypto.createHash(this.algorithm);
  };
  public encryptPassword = (user: string, pass: string) : string => {
    let auxEncryption = this.firstHash.update(this.keyPass + pass, 'binary').digest('binary');
    let encryptedPass = this.secondHash.update(user + auxEncryption, 'binary').digest('hex');  
    return encryptedPass;
  }
}

export class CryptoPayload {
  private secretKey : string = 'u8x/A?D(G+KbPeSgVkYp3s6v9y$B&E)H'; //256-bit Encryption Key
  private cipher : Cipher;
  private decipher : Decipher;
  private algorithm : string = 'aes-256-cbc';
  constructor(){
  }

  public async encryptData (data: string) : Promise<{iv: string, data: string}>{
    try {
      let iv = crypto.randomBytes(16);
      let ivMasked = iv.toString('hex');
      this.cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);
      let dataEncrypted = this.cipher.update(data, 'binary', 'hex');
      dataEncrypted += this.cipher.final('hex'); 
      return {iv: ivMasked, data: dataEncrypted};
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async decryptData (data: string, iv: string ): Promise<string> {
    try {
      let ivUnMasked = Buffer.from(iv, 'hex');
      this.decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, ivUnMasked);
      let dataDecrypted = this.decipher.update(data, 'hex', 'binary');
      dataDecrypted += this.decipher.final('binary');  
      return dataDecrypted;      
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}