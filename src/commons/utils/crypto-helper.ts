import forge from "node-forge";

// RSA 키 쌍 생성
export const generateRSAKeyPair = async (): Promise<{
  publicKey: string;
  privateKey: string;
}> => {
  return new Promise((resolve) => {
    forge.pki.rsa.generateKeyPair(
      { bits: 2048, workers: 2 },
      (err, keypair) => {
        if (err) throw err;
        resolve({
          publicKey: forge.pki.publicKeyToPem(keypair.publicKey),
          privateKey: forge.pki.privateKeyToPem(keypair.privateKey),
        });
      },
    );
  });
};

// AES-256-CBC 암호화
export const encryptAES = (password: string, data: string): string => {
  const md = forge.md.sha256.create();
  md.update(password);
  const key = md.digest().getBytes().slice(0, 32);
  const iv = forge.random.getBytesSync(16);

  const cipher = forge.cipher.createCipher("AES-CBC", key);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(data, "utf8"));
  cipher.finish();

  const encrypted = forge.util.encode64(cipher.output.getBytes());
  return `${forge.util.encode64(iv)}:${encrypted}`;
};

// AES-256-CBC 복호화
export const decryptAES = (password: string, encryptedData: string): string => {
  const [ivBase64, encryptedBase64] = encryptedData.split(":");
  const iv = forge.util.decode64(ivBase64);
  const encrypted = forge.util.decode64(encryptedBase64);

  const md = forge.md.sha256.create();
  md.update(password);
  const key = md.digest().getBytes().slice(0, 32);

  const decipher = forge.cipher.createDecipher("AES-CBC", key);
  decipher.start({ iv });
  decipher.update(forge.util.createBuffer(encrypted));
  const success = decipher.finish();

  if (!success) throw new Error("AES decryption failed");
  return decipher.output.toString("utf-8");
};

// RSA 암호화
export const encryptRSA = (publicKeyPem: string, data: string): string => {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encrypted = publicKey.encrypt(data, "RSAES-PKCS1-V1_5");
  return forge.util.encode64(encrypted);
};

// RSA 복호화
export const decryptRSA = (
  privateKeyPem: string,
  encryptedData: string,
): string => {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const decrypted = privateKey.decrypt(
    forge.util.decode64(encryptedData),
    "RSAES-PKCS1-V1_5",
  );
  return decrypted;
};

// RSA 서명
export const signRSA = (privateKeyPem: string, data: string): string => {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const md = forge.md.sha256.create();
  md.update(data, "utf8");
  const signature = privateKey.sign(md);
  return forge.util.encode64(signature);
};

// RSA 서명 검증
export const verifyRSASignature = (
  publicKeyPem: string,
  data: string,
  signatureBase64: string,
): boolean => {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const md = forge.md.sha256.create();
  md.update(data, "utf8");
  const signature = forge.util.decode64(signatureBase64);
  return publicKey.verify(md.digest().bytes(), signature);
};

// 하이브리드 암호화 (RSA + AES)
export const hybridEncrypt = (
  rsaPublicKeyPem: string,
  plaintext: string,
): string => {
  const publicKey = forge.pki.publicKeyFromPem(rsaPublicKeyPem);
  const aesKey = forge.random.getBytesSync(32);
  const iv = forge.random.getBytesSync(16);

  const cipher = forge.cipher.createCipher("AES-CBC", aesKey);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(plaintext, "utf8"));
  cipher.finish();
  const ciphertext = forge.util.encode64(cipher.output.getBytes());

  const encryptedKey = forge.util.encode64(
    publicKey.encrypt(aesKey, "RSA-OAEP", {
      md: forge.md.sha256.create(),
    }),
  );

  const payload = {
    iv: forge.util.encode64(iv),
    ciphertext,
    encryptedKey,
  };

  return forge.util.encode64(forge.util.encodeUtf8(JSON.stringify(payload)));
};

// 하이브리드 복호화
export const hybridDecrypt = (
  rsaPrivateKeyPem: string,
  encryptedPayload: string,
): string => {
  const privateKey = forge.pki.privateKeyFromPem(rsaPrivateKeyPem);
  const decoded = forge.util.decodeUtf8(forge.util.decode64(encryptedPayload));
  const { iv, ciphertext, encryptedKey } = JSON.parse(decoded);

  const aesKey = privateKey.decrypt(
    forge.util.decode64(encryptedKey),
    "RSA-OAEP",
    {
      md: forge.md.sha256.create(),
    },
  );

  const decipher = forge.cipher.createDecipher("AES-CBC", aesKey);
  decipher.start({ iv: forge.util.decode64(iv) });
  decipher.update(forge.util.createBuffer(forge.util.decode64(ciphertext)));
  const success = decipher.finish();
  if (!success) throw new Error("Hybrid decryption failed");
  return decipher.output.toString("utf-8");
};
