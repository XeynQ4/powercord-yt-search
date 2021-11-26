// Maybe totally joinked from https://github.com/E-boi/github-in-discord
// Thanks @ugly-patootie#0611 and @Pavy#3481, appreciate you not minding!

const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'iseq81d0nJR4waBBZYTIiUyiaFq40K3b';
const iv = crypto.randomBytes(16);

exports.encrypt = text => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

exports.decrypt = hash => {
    const decipher = crypto.createDecipheriv(
        algorithm,
        secretKey,
        Buffer.from(hash.iv, 'hex')
    );

    const decrpyted = Buffer.concat([
        decipher.update(Buffer.from(hash.content, 'hex')),
        decipher.final()
    ]);

    return decrpyted.toString();
};
