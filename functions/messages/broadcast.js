const { logger } = require("firebase-functions/v1");

const DEV_TEAM = [
  "dguimara@stanford.edu",
  // "psarin@stanford.edu",
  "isabelrs@stanford.edu",
  "deepakvd@stanford.edu",
];

const COMMS_TEAM = [
  // "psarin@stanford.edu",
  "cbywater@stanford.edu",
  "jrabin@stanford.edu",
  "jwolf@stanford.edu",
  "vrlee@stanford.edu",
];

const FUNDRAISING_TEAM = [
  "vrlee@stanford.edu",
  "pfiden@stanford.edu",
  // "psarin@stanford.edu",
];

let NEED_TO_KNOW = {
  "Report a bug": [...DEV_TEAM],
  "Request a feature": [
    ...DEV_TEAM,
    "jwolf@stanford.edu",
    "raycellegarcia@stanford.edu",
  ],
  "Media inquiry": [...COMMS_TEAM],
  "Partnership inquiry": ["vrlee@stanford.edu", "cbywater@stanford.edu"],
  "Make a gift to the project": [...FUNDRAISING_TEAM],
  "Other (please specify)": ["vrlee@stanford.edu"],
};

// if (process.env.FUNCTIONS_EMULATOR) {
//   NEED_TO_KNOW = {
//     "Report a bug": ["psarin@stanford.edu"],
//     "Request a feature": ["psarin@stanford.edu"],
//     "Media inquiry": ["psarin@stanford.edu"],
//     "Partnership inquiry": ["psarin@stanford.edu"],
//     "Make a gift to the project": ["psarin@stanford.edu"],
//     "Other (please specify)": ["psarin@stanford.edu"],
//   };
// }

module.exports.broadcastMessage = (db, event) => {
  const data = event.data.data();
  const { name, email, topic, message } = data;

  // Figure out who to send the message to
  const to = NEED_TO_KNOW[topic];
  if (!to) {
    logger.error(`No recipients for topic ${topic}`);
    return;
  }

  // Send the message
  db.collection("mail").add({
    to,
    message: {
      subject: `[CRAFT] ${topic}`,
      text: `From: ${name} <${email}>
Topic: ${topic}

${message}

—
Warning: Replying to this email will send your message to the person who sent the original message.
—`,
    },
    headers: {
      "Reply-To": `${name} <${email}>`,
    },
  });
};
