# Dialogflow-OpenAI Connection![dialogflow](https://github.com/EduardoSchmeller/dialogflow-openai-connection/assets/93481364/6f2955a8-184f-4f97-b3ab-f5a7485bc2b6)




Este projeto oferece uma integração avançada entre o Dialogflow e o OpenAI, possibilitando uma experiência de conversação aprimorada com chatbots. A combinação do Dialogflow, conhecido por sua eficiência em compreender intenções em linguagem natural, com o poderoso modelo de linguagem do OpenAI, GPT, permite que os chatbots gerem respostas mais coesas e contextualizadas, proporcionando uma interação mais natural com os usuários.

### Características Principais
- Integração entre o Dialogflow e o OpenAI para melhorar as capacidades de conversação do chatbot.
- Respostas mais humanas e coesas geradas pelo modelo de linguagem do OpenAI.
- Personalização avançada dos chatbots para atender a necessidades específicas.
- Solução flexível e adaptável para diversas aplicações, incluindo atendimento ao cliente e assistentes virtuais.

## Configuração

### Pré-requisitos

- Node.js instalado na sua máquina

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/EduardoSchmeller/dialogflow-openai-connection.git
   cd dialogflow-openai-connection
   npm install

2. Crie um arquivo .env na raiz do projeto e adicione sua chave de API do OpenAI:

        OPENAI_API_KEY=coloque_sua_chave_aqui

### Configuração do Dialogflow

  - Acesse o Dialogflow Console.

  - Crie um novo agente ou selecione um agente existente para o qual você deseja conectar o OpenAI.

  - No painel de controle do agente, vá para a seção "Fulfillment" no menu lateral.

  - Habilite o webhook fulfillment e insira a URL do webhook ngrok que você obterá após executar o projeto (consulte as instruções abaixo).

### Executando o projeto
Inicie o servidor Express localmente:

    npm start

Inicie o ngrok para criar um túnel seguro para o seu servidor local:

bash

    ngrok http 3000

    Após iniciar o ngrok, copie a URL fornecida pelo ngrok (geralmente começa com "https://") e cole-a na configuração do webhook do Dialogflow.

    Com o servidor local e o ngrok em execução, você está pronto para testar o projeto!

### Como usar

Após configurar corretamente o projeto no Dialogflow e conectar o webhook, você pode enviar uma mensagem desconhecida para o agente do Dialogflow. O agente enviará a solicitação para o servidor local, que usará o modelo de linguagem do OpenAI para gerar uma resposta adequada. A resposta será enviada de volta ao Dialogflow e exibida como a resposta do agente.
Notas

O modelo de linguagem do OpenAI usado neste projeto é "text-davinci-003". Se desejar usar um modelo diferente, você pode alterar essa configuração no arquivo openai_utils.js.
Este projeto é fornecido apenas como exemplo e não aborda todas as considerações de segurança e produção que podem ser necessárias para um ambiente de produção.

Lembre-se de não compartilhar sua chave de API do OpenAI publicamente ou incluí-la no repositório.





