import cookieParser from "cookie-parser";
import admin from "firebase-admin";
import * as xml from "xmlhttprequest";
// @ts-ignore
global.XMLHttpRequest = xml.XMLHttpRequest;

const AdminApp = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_SERVER_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_SERVER_PRIVATE_KEY,
    projectId: process.env.FIREBASE_SERVER_PROJECT_ID
  }),
  databaseURL: process.env.FIREBASE_SERVER_DATABASE_URL
});

module.exports = (req, res, next) => {
  getIdTokenFromRequest(req, res).then(idToken => {
    if (idToken) {
      addDecodedIdTokenToRequest(idToken, req).then(() => {
        next();
      });
    } else {
      next();
    }
  });
};

function getIdTokenFromRequest(req, res) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    return Promise.resolve(req.headers.authorization.split("Bearer ")[1]);
  }
  return new Promise(resolve => {
    cookieParser()(req, res, () => {
      if (req.cookies && req.cookies.__session) {
        resolve(req.cookies.__session);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Returns a Promise with the Decoded ID Token and adds it to req.user.
 */
function addDecodedIdTokenToRequest(idToken, req) {
  return AdminApp.auth()
    .verifyIdToken(idToken)
    .then(decodedIdToken => {
      req.user = decodedIdToken;
    })
    .catch(error => {
      console.error("Error while verifying Firebase ID token:", error);
    });
}
