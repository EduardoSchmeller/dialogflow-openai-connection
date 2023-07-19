const express = require('express');
const { WebhookClient } = require("dialogflow-fulfillment");
const { Configuration, OpenAIApi } = require("openai");
const chatgpt = require ("./openai_utils.js");
require('dotenv').config();

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
    let result = await chatgpt.textGeneration(queryText);
    console.log(result);
    if (result.status === 1) {
      res.send({
        fulfillmentText: result.response.data.choices[0].text
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