/* eslint-disable @typescript-eslint/no-var-requires */
const crypto = require("crypto");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { ethers } = require("ethers");
const { v4: uuidv4 } = require("uuid");
const { signatureMessage } = require("./constant");
const { getContractsForChainId } = require("./web3");

admin.initializeApp();
const firestore = admin.firestore();

const algorithm = "aes-256-ctr";
const secretKey = process.env.SECRET_KEY
  ? process.env.SECRET_KEY
  : "17fdbd0b2ec008d1008d62d02a49cbf8b11107a177df6e843b1940506cd4788a";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports.signIn = functions.region("asia-northeast1").https.onCall(async (data, context) => {
  const { signature, userAddress } = data;
  const recoveredAddress = ethers.utils.verifyMessage(`${signatureMessage}${userAddress}`, signature).toLowerCase();
  const customToken = await admin.auth().createCustomToken(recoveredAddress, {});
  return customToken;
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports.lock = functions.region("asia-northeast1").https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }
  const userAddress = context.auth.uid;
  const { chainId, nftContractAddress, contentUrl, password } = data;
  const id = uuidv4();
  const ivBuffer = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, "hex"), ivBuffer);
  const encryptedPasswordBuffer = Buffer.concat([cipher.update(password), cipher.final()]);

  const iv = ivBuffer.toString("hex");
  const encryptedPassword = encryptedPasswordBuffer.toString("hex");
  await firestore.collection("locks").doc(id).set({
    id,
    userAddress,
    nftContractAddress,
    chainId,
    contentUrl,
    encryptedPassword,
    iv,
  });
  return id;
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports.unlock = functions.region("asia-northeast1").https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }
  const { id, tokenId } = data;
  const doc = await firestore.collection("locks").doc(id).get();
  if (!doc.exists) {
    throw new functions.https.HttpsError("failed-precondition", "The function must be called " + "for existing lock");
  }
  const lock = doc.data();
  const { erc721Contract } = getContractsForChainId(lock.chainId);
  try {
    const BurnEvent = erc721Contract.filters.Transfer(
      context.auth.uid,
      "0x0000000000000000000000000000000000000000",
      Number(tokenId)
    );
    const events = await erc721Contract.attach(lock.nftContractAddress).queryFilter(BurnEvent, 0, "latest");
    if (events.length < 1) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "user who has burned the token"
      );
    }
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, "hex"), Buffer.from(lock.iv, "hex"));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(lock.encryptedPassword, "hex")), decipher.final()]);
    return decrpyted.toString();
  } catch (err) {
    throw new functions.https.HttpsError("failed-precondition", err.message);
  }
});

module.exports.delete = functions.region("asia-northeast1").https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }
  const { id } = data;
  const doc = await firestore.collection("locks").doc(id).get();
  if (!doc.exists) {
    throw new functions.https.HttpsError("failed-precondition", "The function must be called " + "for existing lock");
  }
  const lock = doc.data();
  if (lock.userAddress !== context.auth.uid) {
    throw new functions.https.HttpsError("failed-precondition", "The function must be called " + "by lock owner");
  }
  await firestore.collection("locks").doc(id).delete();
  return "ok";
});
