const json2csv = require("json2csv").parse;
const { logger } = require("firebase-functions/v1");

function sanitize(str) {
  return str.replace(/[^a-zA-Z0-9\#]/g, "_") // restrict to letters and numbers
            .replace(/^_+|_+$/g, "") // remove leading and trailing underscores
            .replace(/_+/g, "_") // replace multiple underscores with a single underscore
            .toLowerCase(); // convert to lowercase
}

/**
 * Builds a mapping from question ID (and data element ID) to field name
 * @param template The quiz template
 */
function getFieldNames(template) {
  const fieldNames = {}; // questionID -> dataElementID -> fieldName

  for (const question of template.questions) {
    const questionMap = {};
    questionMap.prompt = sanitize(question.prompt);

    // each data element has an ID
    for (const dataElement of question.dataElements) {
      questionMap[dataElement.id] = sanitize(dataElement.name);
    }

    // reattach this map to the question ID
    fieldNames[question.id] = questionMap;
  }

  return fieldNames;
}

function getResponseData(responses, fieldNames) {
  const data = [];
  let numResponses = 0;
  responses.forEach((snapshot) => {
    const response = snapshot.data();
    const name = response.name;

    // go through the response and build the data object
    for (const [qid, qresp]  of Object.entries(response.response)) {
      const questionResponse = { name };
      const mapper = fieldNames[qid];

      // add the response and data element values
      questionResponse[mapper.prompt] = qresp.response;
      for (const [did, dval] of Object.entries(qresp.dataElementValues)) {
        questionResponse[mapper[did]] = dval;
      }

      data.push(questionResponse);
    }

    numResponses++;
  })
  return [data, numResponses];
}

module.exports.endQuiz = (quizDoc, responses) => {
  const data = quizDoc.data();
  const fieldNames = getFieldNames(data.template);
  const [responseData, numResponses] = getResponseData(responses, fieldNames);

  // update the quiz document
  quizDoc.ref.update({
    active: false,
    responses: responseData,
    csv: json2csv(responseData),
    numResponses,
  });
};