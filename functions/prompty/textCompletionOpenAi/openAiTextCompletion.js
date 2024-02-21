const axios = require("axios");

module.exports.openAiTextCompletion = async function (prompt) {
  const data = {
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 1024,
    n: 3,
    stop: null,
    temperature: 0.7,
  };

  const config = {
    method: "post",
    url: "https://api.openai.com/v1/chat/completions",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    return response.data.choices;
  } catch (error) {
    console.error(error);
  }
};
