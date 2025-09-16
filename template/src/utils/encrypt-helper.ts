import { Buffer } from 'buffer'
// import { AES, CBC, PBKDF2, Pkcs7, WordArray } from 'crypto-es'
// import * as CryptoJS from 'crypto-js'
import RNCryptoJS from 'react-native-crypto-js'
import { encryptRSA, generateRSAKeyPair } from 'rn-encryption'

import logger from '@/infrastructures/common/logger'

// TODO: get from api
import { SystemInfo } from './sys-info-data'

export class EncryptHelper {
  public static encryptData(data: string): Promise<{
    encryptedData: string
    encryptedAesKey: string
    iv: string
  }> {
    return new Promise<{
      encryptedData: string
      encryptedAesKey: string
      iv: string
    }>((resolve, reject) => {
      const publicKey = SystemInfo.data.secKey || ''
      const pemHeader = '-----BEGIN PUBLIC KEY-----'
      const pemFooter = '-----END PUBLIC KEY-----'
      const pemContents = publicKey.replace(pemHeader, '')
        .replace(pemFooter, '')
        .replace(/\n/g, '')
      // 1. Generate random AES key and IV
      const aesKey = RNCryptoJS.lib.WordArray.random(32) // 256-bit key
      const iv = RNCryptoJS.lib.WordArray.random(16) // 128-bit IV
      // const aesKey = PBKDF2('password', 'salt', { keySize: 256 / 32 })
      // const iv = WordArray.random(128 / 8)

      // 2. Encrypt data with AES
      const encryptedData = RNCryptoJS.AES.encrypt(data, aesKey, {
        iv: iv,
        mode: RNCryptoJS.mode.CBC,
        padding: RNCryptoJS.pad.Pkcs7,
      }).toString()

      // logger.log('encryptedData', encryptedData)
      // const encryptedData = AES.encrypt('message', aesKey, { padding: Pkcs7, mode: CBC, iv: iv }).toString()

      // 3. Encrypt AES key with RSA public key
      // const encryptedAesKey = await this._rsaEncrypt(this._wordArrayToUint8Array(aesKey), publicKey)
      // const encryptedAesKey = await RSA.encrypt(aesKey.toString(RNCryptoJS.enc.Utf8), publicKey)
      const aesKeyString = aesKey.toString(RNCryptoJS.enc.Base64)
      // logger.log('aesKeyString', aesKeyString)
      const encryptedAesKey = encryptRSA(aesKeyString, pemContents)

      // logger.log('encryptedAesKey', encryptedAesKey)

      const result = {
        encryptedData,
        encryptedAesKey,
        iv: RNCryptoJS.enc.Base64.stringify(iv),
      }
      resolve(result)
    })

  }

  /*
  private static async _rsaEncrypt(data: Uint8Array, publicKeyPem: string): Promise<string> {
    const pemHeader = '-----BEGIN PUBLIC KEY-----'
    const pemFooter = '-----END PUBLIC KEY-----'
    const pemContents = publicKeyPem.replace(pemHeader, '').replace(pemFooter, '')
      .trim()
    const binaryDer = this._base64ToArrayBuffer(pemContents)
    console.log('crypto', crypto)

    const publicKey = await crypto.subtle.importKey(
      'spki',
      binaryDer,
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      true,
      ['encrypt'],
    )

    const encrypted = await crypto.subtle.encrypt(
      { name: 'RSA-OAEP' },
      publicKey,
      Buffer.from(data),
    )

    return this._arrayBufferToBase64(encrypted)
  }

  private static _base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    return bytes.buffer
  }

  private static _arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer)

    return btoa(String.fromCharCode(...bytes))
  }

  private static _wordArrayToUint8Array(wordArray: RNCryptoJS.lib.WordArray): Uint8Array {
    const words = wordArray.words
    const sigBytes = wordArray.sigBytes
    const u8 = new Uint8Array(sigBytes)
    for (let i = 0; i < sigBytes; i++) {
      // eslint-disable-next-line no-bitwise
      u8[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff
    }

    return u8
  }
  */
}
