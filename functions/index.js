const functions = require("firebase-functions");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { generateFromTemplate, endQuiz } = require("./quiz");

const { initializeApp } = require('firebase-admin/app');
initializeApp();

exports.generateQuiz = functions.https.onCall(async (data, context) => {
  if (!data || !data.joinCode) {
    throw new functions.https.HttpsError('invalid-argument', 'Quiz join code is required');
  }
  const joinCode = data.joinCode;

  // get the template from the database
  const db = getFirestore();
  const doc = await db.collection('datamax').doc(joinCode).get();
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

exports.endQuiz = functions.https.onCall(async (data, context) => {
  if (!data || !data.joinCode) {
    throw new functions.https.HttpsError('invalid-argument', 'Quiz join code is required');
  }
  const joinCode = data.joinCode;

  // get the template from the database
  const db = getFirestore();
  const doc = await db.collection('datamax').doc(joinCode).get();
  if (!doc.exists) {
    throw new functions.https.HttpsError('not-found', 'No such document!');
  }

  // validate that the user is the owner
  const isOwner = context.auth.uid === doc.data().owner;
  if (!isOwner) {
    throw new functions.https.HttpsError('permission-denied', 'You are not the owner of this quiz');
  }

  // confirm that there are responses
  const responses = await db.collection('datamax').doc(joinCode).collection('responses').get();
  if (responses.empty) {
    throw new functions.https.HttpsError('failed-precondition', 'There are no responses to this quiz');
  }

  endQuiz(doc, responses);

  // update the user's document to put the quiz in the "completed" state
  const userDoc = db.collection('users').doc(context.auth.uid);
  userDoc.update({
    datamax: {
      activeQuizzes: FieldValue.arrayRemove(joinCode),
      pastQuizzes: FieldValue.arrayUnion(joinCode)
    }
  }, { merge: true });


  return {
    success: true
  }
})