import { DataElement, Quiz } from "../../DatamaxTypes";

function roundToDecimal(num: number, decimal: number) {
  return Math.round(num * (10 ** decimal)) / (10 ** decimal);
}

function generateUniform(min: number, max: number, round: number) {
  const out = Math.random() * (max - min) + min;
  return roundToDecimal(out, round);
}

function generateNormal(mean: number, std: number, round: number) {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  const out = z * std + mean;
  return roundToDecimal(out, round);
}

function generateSample(dataElement: DataElement) {
  switch (dataElement.generator) {
    case 'Normal':
      return generateNormal(dataElement.mean!, dataElement.std!, dataElement.round);
    case 'Uniform':
      return generateUniform(dataElement.min!, dataElement.max!, dataElement.round);
    default:
      return NaN;
  }
}

const generateFromTemplate = (rawTemplate: Quiz) => {
  // generate a new quiz from this template by replacing each of the data
  // elements with a generated value
  const template = { ...rawTemplate };
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

export default generateFromTemplate;