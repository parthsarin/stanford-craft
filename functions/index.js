const functions = require("firebase-functions");
const { getFirestore } = require("firebase-admin/firestore");
const { generateFromTemplate } = require("./quiz");

const { initializeApp } = require('firebase-admin/app');
initializeApp();

exports.generateQuiz = functions.https.onCall(async (data, context) => {
  const joinCode = data.joinCode;
  if (!joinCode) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with one argument "joinCode"');
  }

  // get the template from the database
  const db = getFirestore();
  const doc = await db.collection('datamax-active').doc(joinCode).get();
  if (!doc.exists) {
    throw new functions.https.HttpsError('not-found', 'No such document!');
  }

  // generate a new quiz from this template
  const template = doc.data().template;
  functions.logger.log(`template data for ${joinCode}`, template);
  return {
    quiz: generateFromTemplate(template)
  };
});