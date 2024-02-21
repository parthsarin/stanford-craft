const axios = require("axios");

module.exports.openAiModeration = async function (prompt) {
  const response = await axios.post(
    "https://api.openai.com/v1/moderations",
    {
      input: prompt,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.results[0];
};
