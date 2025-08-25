import crypto from 'crypto';

const algorithm = 'aes-256-ctr';

// Criar uma chave de 32 bytes a partir do secret usando SHA-256
function generateKeyFromSecret(secret) {
  return crypto.createHash('sha256').update(secret).digest();
}

const rawSecretKey = process.env.CRYPTO_SECRET || 'chave-padrao-secreta';
const secretKey = generateKeyFromSecret(rawSecretKey);

export function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  
  return JSON.stringify({
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  });
}

export function decrypt(hash) {
  try {
    const hashObj = JSON.parse(hash);
    const decipher = crypto.createDecipheriv(
      algorithm, 
      secretKey, 
      Buffer.from(hashObj.iv, 'hex')
    );
    
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(hashObj.content, 'hex')), 
      decipher.final()
    ]);
    
    return decrypted.toString('utf8');
  } catch (error) {
    console.error('Erro na descriptografia:', error);
    throw new Error('Falha ao descriptografar: ' + error.message);
  }
}