const functions = require("firebase-functions");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

// Upgrading to v2!
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

// Modules
const { broadcastMessage } = require("./messages");
const { endQuiz } = require("./quiz");
const { openAiTextCompletion } = require("./prompty/textCompletionOpenAi");
const { openAiModeration } = require("./prompty/moderationOpenAi");

const { initializeApp } = require("firebase-admin/app");
initializeApp();

exports.endQuiz = functions.https.onCall(async (data, context) => {
  if (!data || !data.joinCode) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Quiz join code is required"
    );
  }
  const joinCode = data.joinCode;

  // get the template from the database
  const db = getFirestore();
  const doc = await db.collection("datamax").doc(joinCode).get();
  if (!doc.exists) {
    throw new functions.https.HttpsError("not-found", "No such document!");
  }

  // validate that the user is the owner
  const isOwner = context.auth.uid === doc.data().owner;
  if (!isOwner) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "You are not the owner of this quiz"
    );
  }

  // confirm that there are responses
  const responses = await db
    .collection("datamax")
    .doc(joinCode)
    .collection("responses")
    .get();
  if (responses.empty) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "There are no responses to this quiz"
    );
  }

  endQuiz(doc, responses);

  // update the user's document to put the quiz in the "completed" state
  const userDoc = db.collection("users").doc(context.auth.uid);
  await userDoc.update({
    "datamax.activeQuizzes": FieldValue.arrayRemove(joinCode),
    "datamax.pastQuizzes": FieldValue.arrayUnion(joinCode),
  });

  return {
    success: true,
  };
});

exports.broadcastMessage = onDocumentCreated(
  "messages/{messageId}",
  (event) => {
    const db = getFirestore();
    broadcastMessage(db, event);
  }
);

exports.generateAiResponse = functions
  .region("us-central1")
  .https.onCall(async (data, context) => {
    try {
      let response = {
        success: true,
        response: await openAiTextCompletion(data),
      };
      return response;
    } catch (e) {
      throw new functions.https.HttpsError("unknown", e);
    }
  });

exports.moderatePrompt = functions
  .region("us-central1")
  .https.onCall(async (data, context) => {
    try {
      let response = { success: true, response: await openAiModeration(data) };
      return response;
    } catch (e) {
      throw new functions.https.HttpsError("unknown", e);
    }
  });
