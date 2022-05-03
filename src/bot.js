const Twit = require('twit');

const tweets = require('./data/tweets');

require("dotenv").config();

const config = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    tiomeout_ms: 60 * 1000,
}

// Conectando a API com as credenciais fornecidas
const Bot = new Twit(config);

console.log("Bot está rodando");

const userId = 3304634823; //id do usuário desejado (no exemplo utilizei meu id de usuário). Obs: posso colocar alguma frase chave ou outros filtros, basta alterar aqui e na criação da stream. Para saber mais dos filtros: https://developer.twitter.com/en/docs/twitter-api/v1/tweets/filter-realtime/guides/basic-stream-parameters

//criando uma váriavel com o tamanho da array tweets
const tweetsLength = tweets.length;

// Configurando stream de usuário
const stream = Bot.stream('statuses/filter', { follow: userId });

stream.on('tweet', botReply);

function botReply(tweet) {

    var id = tweet.id_str;
    let name = tweet.user.screen_name;

    //if para checar se o tweet captado pela stream é do usuário "pedroSem_pai"
    if (name === "pedroSem_pai") { 

        // Faz uma seleção randomica baseada no array de tweets
        let tweetsPosition = Math.floor(Math.random() * tweetsLength);

        //cria a respoota do tweet
        let tweetReply = (tweets[tweetsPosition]);

        // Posta o tweet em resposta. É necessário especificar o @ do usuário a ser respondido, como coloquei meu id anteriormente, estarei usando meu usuário
        Bot.post('statuses/update', { status: "@pedroSem_pai " + tweetReply, in_reply_to_status_id: id }, status);


        //função para aadministrar os sucessos e erros, caso ocorram
        function status(err, reply) {
            if (err) {
                console.log(err.message);
            } else {
                console.log('Twitado: ' + reply.text);
            }
        };

    //se o usuário não for o pedroSem_pai exibe uma msg de erro
    }else{
        console.log('O usuário que respondeu o tweet não é o @pedroSem_pai');
    }
}