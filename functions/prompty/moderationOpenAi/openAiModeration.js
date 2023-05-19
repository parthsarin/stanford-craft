const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports.openAiModeration = async function (prompt) {
  const openai = new OpenAIApi(configuration);
  const moderation = await openai.createModeration({
    input: prompt,
  });
  return moderation.data.results[0];
};
