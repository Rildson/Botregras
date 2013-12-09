Botregras
=========

4sharedPRO
$(document).ready(function(){

//When script loads
API.sendChat("/me Bem vindo a sala EDT, alguma duvida sobre as regras da sala, clique no link aqui/Welcome to EDT room, a question about the rules of the room, click the link here: https://docs.google.com/document/d/1DBE2hr_cwb23b0llZtrzrlePha-hdlAMHFvVYG4T-lo/pub ")
$('#button-vote-positive').click();

//global var
var total = 0;


if (localStorage.usData === undefined) {
    localStorage.usData = JSON.stringify({
        counter: 0,
    })
}

function fanEveryone(data) {
    var relationship = require('app/models/TheUserModel');
    if (relationship.getRelationship(data.id) < 2) {
        var fan = require('app/services/user/UserFanService');
        fan = new fan(true, data.id);
          var totalCount = JSON.parse(localStorage.usData);
        ++totalCount.counter;
        console.log('Fanned new user: ' + data.username + '. Total number fanned: ' + totalCount.counter);
        localStorage.usData = JSON.stringify(totalCount);
		total + 1;
    }
}
API.on(API.USER_FAN, fanEveryone);

//chat commands and so on below here 
var intervalMessage = setInterval(function(){message();},240000);

function message(){
var m, msgs;
msgs = ["/me Proibido o uso do Caps Lock/ Siga as regras da sala/ Evite pedir fans e cargos, obrigado por sua preferência de sala / Prohibited the use of the Caps Lock / Follow the rules of the room / Avoid asking fans and posts, thank you for your preference", "/me Em caso de Dúvidas chame algum membro da staff, estamos sempre dispostos a ajudar/If in doubt call a member of staff, we are always willing to help ;) !", "/me Oi Bem vindo a sala, Divirta Se/Hi Welcome to room, If fun :P ! ", "/me É novo na sala, Monte seu playlist e venha compartilhar seu som conosco/New to room, Mount your playlist and come share with us their sound ! :))", "/me Mantenha o respeito com todos, Evite constrangimentos/Maintain compliance with all constraints Avoid ;P !"];

m = Math.floor(Math.random() * msgs.length);
API.sendChat(msgs[m]);		  
			  
}


API.on(API.CHAT_COMMAND, command);
function command(value)
{
	switch(value)
	{
		case "/stopchat":
		clearInterval(intervalMessage);
		API.chatLog("FanBOT CHAT OFFLINE => BOT ONNLINE", alert)
		break;
		
		case "/restart":
	    intervalMessage = setInterval(function(){message();},240000);
		break;
		
		case "/fans?":
		//API.sendChat(total + " People fanned since launched");
		API.chatLog(total + " People fanned since launched", alert)
		break;
		
		case "/chat":
		message();
		break;
		
	}
}

API.on(API.DJ_ADVANCE, woot);
function woot()
{
	$('#button-vote-positive').click();
}


});
