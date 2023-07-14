const express = require('express');
const { WebhookClient } = require("dialogflow-fulfillment");
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

console.log(process.env.OPENAI_API_KEY);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const textGeneration = async (prompt) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Human: ${prompt}\nAI: `,
      temperature: 0.9,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: ['Human:', 'AI:']
    });

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

const webApp = express();

webApp.use(express.urlencoded({ extended: true }));
webApp.use(express.json());
webApp.use((req, res, next) => {
  console.log(`Path ${req.path} with Method ${req.method}`);
  next();
});

webApp.get('/', (req, res) => {
  res.sendStatus(200);
});

webApp.post('/dialogflow', async (req, res) => {
  let action = req.body.queryResult.action;
  let queryText = req.body.queryResult.queryText;

  if (action === 'input.unknown') {
    let result = await textGeneration(queryText);
    if (result.status == 1) {
      res.send({
        fulfillmentText: result.response
      });
    } else {
      res.send({
        fulfillmentText: "Desculpe, Eu não posso te ajudar no momento."
      });
    }
  } else {
    res.send({
      fulfillmentText: `Nenhum manipulador para a ação ${action}.`
    });
  }
});

const listener = webApp.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
