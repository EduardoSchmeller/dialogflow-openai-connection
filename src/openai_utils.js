// openai_utils.jsc
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const textGeneration = async (prompt) => {
  try {
    const gptParams = {
      model: 'text-davinci-003',
      prompt: `Human: ${prompt}\nAI: `,
      temperature: 0.9,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: ['Human:', 'AI:']
    };
    const response = await openai.createCompletion(gptParams);

    return {
      status: 1,
      response: response.data.choices[0].text
    };
  } catch (error) {
    return {
      status: 0,
      response: ''
    };
  }
};

module.exports = { 
  textGeneration,
  configuration, 
};
