const functions = require("firebase-functions");

function roundToDecimal(num, decimal) {
  return Math.round(num * (10 ** decimal)) / (10 ** decimal);
}

function generateUniform(min, max, round) {
  const out = Math.random() * (max - min) + min;
  return roundToDecimal(out, round);
}

function generateNormal(mean, std, round) {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  const out = z * std + mean;
  return roundToDecimal(out, round);
}

function generateSample(dataElement) {
  switch (dataElement.generator) {
    case 'Normal':
      return generateNormal(dataElement.mean, dataElement.std, dataElement.round);
    case 'Uniform':
      return generateUniform(dataElement.min, dataElement.max, dataElement.round);
    default:
      return NaN;
  }
}

module.exports.generateFromTemplate = (template) => {
  // generate a new quiz from this template by replacing each of the data
  // elements with a generated value
  for (let i = 0; i < template.questions.length; i++) {
    let question = template.questions[i];
    
    // for each of the data elements, generate a sample
    for (let j = 0; j < question.dataElements.length; j++) {
      let dataElement = question.dataElements[j];
      dataElement = { ...dataElement, value: generateSample(dataElement) };
      question.dataElements[j] = dataElement;
    }
  }

  return template;
}