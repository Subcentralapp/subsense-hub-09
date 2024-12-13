import CryptoJS from 'crypto-js';

// Clé de chiffrement dérivée de l'ID utilisateur pour garantir l'unicité
const generateEncryptionKey = (userId: string): string => {
  return CryptoJS.SHA256(userId).toString();
};

export const encryptData = (data: any, userId: string): string => {
  console.log('Encrypting data for user:', userId);
  const key = generateEncryptionKey(userId);
  const jsonString = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonString, key).toString();
};

export const decryptData = (encryptedData: string, userId: string): any => {
  console.log('Decrypting data for user:', userId);
  try {
    const key = generateEncryptionKey(userId);
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
};