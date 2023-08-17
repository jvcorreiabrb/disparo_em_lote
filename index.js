/*
**********ATENÇÃO***********

-AJUSTAR OS PARÂMETROS DE CHAMADA NO FIM DESTE ARQUIVO
-PARA TESTES COLOCAR AMBIENTE = 'dsv'
-PARA DISPARO REAL COLOCAR AMBIENTE = 'prd'
-EVITAR MENSAGENS COM MAIS DE 150 CARACTERES


-PARA RODAR O ARQUIVO, DIGITAR O SEGUINTE COMANDO NO TERMINAL: node .\index.js
**********ATENÇÃO***********
*/

//Imports e variáveis estáticas
var fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var accountSid = 'AC8edf3306e38377af615a903c1d88c224';
var authToken = '32483f7afe414f29d15c474e07634015';
var client = require('twilio')(accountSid, authToken);
var idInstanciaChatPro = "chatpro-bbd8272945";
var tokenChatPro = "8700601dc8d7ad8aa7fe11b8bcce23ac";
var numeroTwilio = "+14849699787"

//Massa de dados para ser usada na execução do script
var telefonesDsv = ["5561998142978"]
var telefonesPrd = [
"5561991190302",
"5561998221226",
"5561983471138",
"5561999783885",
"5561998754575",
"5561995578762",
"5561986790009",
"5561981144500",
"5561981824340",
"5561991190302",
"5561998221226",
"5561983471138",
"5561999783885",
"5561998754575",
"5561995578762",
"5561986790009",
"5561981144500",
"5561981824340",
"5561991190302",
"5561998221226",
"5561983471138",
"5561999783885",
"5561998754575",
"5561995578762",
"5561986790009",
"5561981144500",
"5561981824340",
"5561998142978",
"5561998142978",
"5561998142978"
];


async function enviaWhatsApp(mensagem, ambiente){
    let telefones = telefonesDsv

    if (ambiente === "prd") telefones = telefonesPrd
	
    const promises = telefones.map((telefone) =>
        fetch('https://v5.chatpro.com.br/'+ idInstanciaChatPro +'/api/v1/send_message', {
        method: 'POST',
        headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": tokenChatPro
        },
        body: JSON.stringify({message: mensagem, number: telefone})
        }).then((response) => {
            console.log("Processando envio de mensagem no WhatsApp... " + response.json())
        })
    );
    const dados = await Promise.all(promises);

};

async function enviaSms(mensagem, ambiente){

    let telefones = telefonesDsv

    if (ambiente === "prd") telefones = telefonesPrd

    const promisesSms = telefones.map((telefone) =>
            client.messages
            .create({
                body: mensagem,
                from: numeroTwilio,
                to: '+'+telefone
            })
            .then(message => console.log("Processando envio de mensagem no SMS " + message.sid))
    );
    const dadosSms = await Promise.all(promisesSms);
};

enviaWhatsApp("A votação está aberta no link : https://287c-2804-14c-65d3-5aaa-94e5-f52-ba39-5eb4.ngrok-free.app/login", "dsv");
enviaSms("A votação está aberta no link : https://287c-2804-14c-65d3-5aaa-94e5-f52-ba39-5eb4.ngrok-free.app/login", "dsv");
