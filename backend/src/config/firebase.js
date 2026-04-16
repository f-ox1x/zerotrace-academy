const admin = require('firebase-admin');

// تحميل ملف service account من Firebase Console
const serviceAccount = require('../../../firebase-service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const verifyFirebaseToken = async (idToken) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        return decodedToken;
    } catch (error) {
        throw new Error('Invalid Firebase token');
    }
};

module.exports = { admin, verifyFirebaseToken };