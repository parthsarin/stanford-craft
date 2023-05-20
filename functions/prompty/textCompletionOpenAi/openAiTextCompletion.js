const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports.openAiTextCompletion = async function (prompt) {
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1024,
    n: 3,
    stop: null,
    temperature: 0.7,
  });
  return completion.data.choices;
};