var sendForm = document.querySelector('#chatform'),
    textInput = document.querySelector('.chatbox'),
    chatList = document.querySelector('.chatlist'),
    userBubble = document.querySelectorAll('.userInput'),
    botBubble = document.querySelectorAll('.bot__output'),
    animateBotBubble = document.querySelectorAll('.bot__input--animation'),
    overview = document.querySelector('.chatbot__overview'),
    hasCorrectInput,
    imgLoader = false,
    animationCounter = 1,
    animationBubbleDelay = 600,
    input,
    previousInput,
    isReaction = false,
    unkwnCommReaction = "I didn't quite get that.",
    chatbotButton = document.querySelector(".submit-button")

sendForm.onkeydown = function(e){
  if(e.keyCode == 13){
    e.preventDefault();

    //No mix ups with upper and lowercases
    var input = textInput.value.toLowerCase();

    //Empty textarea fix
    if(input.length > 0) {
      createBubble(input)
    }
  }
};

sendForm.addEventListener('submit', function(e) {
  //so form doesnt submit page (no page refresh)
  e.preventDefault();

  //No mix ups with upper and lowercases
  var input = textInput.value.toLowerCase();

  //Empty textarea fix
  if(input.length > 0) {
    createBubble(input)
  }
}) //end of eventlistener

var createBubble = function(input) {
  //create input bubble
  var chatBubble = document.createElement('li');
  chatBubble.classList.add('userInput');

  //adds input of textarea to chatbubble list item
  chatBubble.innerHTML = input;

  //adds chatBubble to chatlist
  chatList.appendChild(chatBubble)

  checkInput(input);
}

var checkInput = function(input) {
  hasCorrectInput = false;
  isReaction = false;
  //Checks all text values in possibleInput
  for(var textVal in possibleInput){
    //If user reacts with "yes" and the previous input was in textVal
    if(input == "yes" || input.indexOf("yes") >= 0){
      if(previousInput == textVal) {
        console.log("sausigheid");

        isReaction = true;
        hasCorrectInput = true;
        botResponse(textVal);
      }
    }
    if(input == "no" && previousInput == textVal){
      unkwnCommReaction = "For a list of commands type: Commands";
      unknownCommand("I'm sorry to hear that :(")
      unknownCommand(unkwnCommReaction);
      hasCorrectInput = true;
    }
    //Is a word of the input also in possibleInput object?
    if(input == textVal || input.indexOf(textVal) >=0 && isReaction == false){
			console.log("succes");
      hasCorrectInput = true;
      botResponse(textVal);
		}
	}
  //When input is not in possibleInput
  if(hasCorrectInput == false){
    console.log("failed");
    unknownCommand(unkwnCommReaction);
    hasCorrectInput = true;
  }
}

// debugger;

function botResponse(textVal) {
  //sets previous input to that what was called
  // previousInput = input;

  //create response bubble
  var userBubble = document.createElement('li');
  userBubble.classList.add('bot__output');

  if(isReaction == true){
    if (typeof reactionInput[textVal] === "function") {
    //adds input of textarea to chatbubble list item
      userBubble.innerHTML = reactionInput[textVal]();
    } else {
      userBubble.innerHTML = reactionInput[textVal];
    }
  }

  if(isReaction == false){
    //Is the command a function?
    if (typeof possibleInput[textVal] === "function") {
      // console.log(possibleInput[textVal] +" is a function");
    //adds input of textarea to chatbubble list item
      userBubble.innerHTML = possibleInput[textVal]();
    } else {
      userBubble.innerHTML = possibleInput[textVal];
    }
  }
  //add list item to chatlist
  chatList.appendChild(userBubble) //adds chatBubble to chatlist

  // reset text area input
  textInput.value = "";
}

function unknownCommand(unkwnCommReaction) {
  // animationCounter = 1;

  //create response bubble
  var failedResponse = document.createElement('li');

  failedResponse.classList.add('bot__output');
  failedResponse.classList.add('bot__output--failed');

  //Add text to failedResponse
  failedResponse.innerHTML = unkwnCommReaction; //adds input of textarea to chatbubble list item

  //add list item to chatlist
  chatList.appendChild(failedResponse) //adds chatBubble to chatlist

  animateBotOutput();

  // reset text area input
  textInput.value = "";

  //Sets chatlist scroll to bottom
  chatList.scrollTop = chatList.scrollHeight;

  animationCounter = 1;
}

function responseText(e) {

  var response = document.createElement('li');

  response.classList.add('bot__output');

  //Adds whatever is given to responseText() to response bubble
  response.innerHTML = e;

  chatList.appendChild(response);

  animateBotOutput();

  console.log(response.clientHeight);

  //Sets chatlist scroll to bottom
  setTimeout(function(){
    chatList.scrollTop = chatList.scrollHeight;
    console.log(response.clientHeight);
  }, 0)
}

function responseImg(e) {
  var image = new Image();

  image.classList.add('bot__output');
  //Custom class for styling
  image.classList.add('bot__outputImage');
  //Gets the image
  image.src = "/images/"+e;
  chatList.appendChild(image);

  animateBotOutput()
  if(image.completed) {
    chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
  }
  else {
    image.addEventListener('load', function(){
      chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
    })
  }
}

//change to SCSS loop
function animateBotOutput() {
  chatList.lastElementChild.style.animationDelay= (animationCounter * animationBubbleDelay)+"ms";
  animationCounter++;
  chatList.lastElementChild.style.animationPlayState = "running";
}

function commandReset(e){
  animationCounter = 1;
  previousInput = Object.keys(possibleInput)[e];
}

// hlep

var possibleInput = {
  // "hlep" : this.help(),
  "help" : function(){
    responseText("You can type a command in the chatbox")
    responseText("Something like &quot;Please show me your&rsquo; best work&quot;")
    responseText("Did you find a bug or problem? DM me on Discord @co1lective")
    commandReset(0);
    return
    },
  "best work" : function(){
    responseText("I will show you my best work!");
    responseText("These are my <a href='#animation'>best scripts</a>")
    responseText("These are my <a href='#projects'>best projects</a>")
    commandReset(1);
    return
    },
  "about" : function(){
    responseText("This is me, Co1lective");
    responseText("I'm a 13 year old Programmer with 2+ years of experience and a Full Stack Developer @Roblox");
    responseText("My ambition is to create the greatest and most awe-inspiring games on Roblox.");
    responseText("Would you like to know about my vision? (Yes/No)");
    commandReset(2);
    return
    },
  "experience" : function(){
    responseText("I have previously worked at:");
    responseText("AquaZone / 26k+ members");
    responseText("Bivaro / 2.7k+ members");
    responseText("Venus Tech / 1.2k+ members");
    responseText("Palm Beach Entertainment / 1k+ members");
    commandReset(3);
    return
  },
  "hobbies" : function(){
    responseText("I love:");
    responseText("Scripting");
    responseText("Swimming");
    responseText("Family time");
    responseText("Helping others");
    commandReset(4);
    return
  },
  "interests" : function(){
    responseText("I love:");
    responseText("Scripting");
    responseText("Swimming");
    responseText("Family time");
    responseText("Helping others");
    commandReset(5);
    return
  },
  "vision" : function(){
    responseText("Things I want to learn or do:");
    responseText("Inspire others to become a developer @Roblox");
    responseText("Make a living on Roblox");
    responseText("Meet great people");
    responseText("Become a well known developer in the Roblox community");
    commandReset(6);
    return
  },
  "contact" : function(){
    responseText("Roblox: <a href='https://www.roblox.com/users/1189826805/profile' target='_top'>co1lective</a>");
    responseText("Discord: <a href='https://discord.com/users/1143173164512317492' target='_top'>send me a message</a>");
    responseText("Twitter: <a href='https://twitter.com/Co1lectiveDev'>@Co1lectiveDev</a>");
    commandReset(7);
    return
  },
  "commands" : function(){
    responseText("This is a list of commands my portfolio knows:")
    responseText("help, best work, about, vision, experience, hobbies / interests, contact, rick roll");
    commandReset(8);
    return
  },
  "rick roll" : function(){
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
  // work experience
}

var reactionInput = {
  "about" : function(){
    responseText("Things I want to learn or do:");
    responseText("Inspire others to become a developer @Roblox");
    responseText("Make a living on Roblox");
    responseText("Meet great people");
    responseText("Become a well known developer in the Roblox community");
    animationCounter = 1;
    return
    }
}