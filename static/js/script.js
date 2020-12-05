// Challenge 1
function ageInDays() {
    var birthYear = prompt("What's your birth year... good friend?")
    var ageindays= (2020-birthYear)*365;
    var h1 = document.createElement('h1')
    var textAnswer = document.createTextNode('You are ' + ageindays + ' days old')
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer)
    document.getElementById('flex-box-result').appendChild(h1)
}

function reset() {
    document.getElementById('ageInDays').remove();
}

// Challenge 2: Cat generator
function generateCat() {
    var image=document.createElement('img')
    var div =document.getElementById('flex-cat-gen')
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small"
    div.appendChild(image)
}

// Challenge 3: Rock, paper, scissor

function rpsGame(yourChoice) {
    console.log(yourChoice)
    var humanChoice, botChoice;
    humanChoice=yourChoice.id;
    botChoice =numToChoice(randTorps());
    console.log('computerchoice', botChoice);
    results = decideWinner(humanChoice, botChoice); //
    console.log(results)
    message = finalMessage(results); // {'message':'You won!', 'color': 'red' 
    console.log(message)
    
    rpsFrontEnd(humanChoice, botChoice, message); 
}

function randTorps() {
    return Math.floor(Math.random()* 3)
}

function numToChoice(number) {
    return ['rock', 'paper', 'scissors'][number]
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock':{'scissors':1, 'rock':0.5, 'paper': 0},
        'paper':{'scissors':0, 'rock':1, 'paper': 0.5},
        'scissors':{'scissors':0.5, 'rock':0, 'paper': 1},
    }

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore =rpsDatabase[computerChoice][yourChoice];
    
    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore===0) {
        return {'message': "You lost!", 'color': "red"};
    }
    else if (yourScore===0.5) {
        return {'message': "You tied", 'color': "yellow"};
    }
    else {
        return {'message': "You won!", 'color': "green"};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMsg) {
    var imagesDatabase = {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src,
    }
    // let's remove all the images
    document.getElementById('rock').remove()
    document.getElementById('paper').remove()
    document.getElementById('scissors').remove()

    // pick the images chosen and display them with the message
    var humanDiv =document.createElement('div')
    var botDiv =document.createElement('div')
    var messageDiv =document.createElement('div')

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMsg['color'] + "; font-size: 60px; padding: 30px; '>" + finalMsg['message'] + "</h1>"
    botDiv.innerHTML ="<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

// Challenge 4: Change the color of buttons
var all_buttons = document.getElementsByTagName('button')

var copyAllButtons = [];
for (let i=0; i<all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1])
}


function buttonColorChange(buttonThingy) {
    //console.log(buttonThingy.value)
    if (buttonThingy.value === 'red'){
        buttonsRed();
    } else if (buttonThingy.value === 'green') {
        buttonsGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonsReset();
    } else if (buttonThingy.value === 'random') {
        buttonsRandom();
    } 
}

function buttonsRed() {
    for (let i=0; i <all_buttons.length; i++ ) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger')
    }
}
function buttonsGreen() {
    for (let i=0; i <all_buttons.length; i++ ) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success')
    }
}

function buttonsReset() {
    for (let i=0; i <all_buttons.length; i++ ) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonsRandom() {
    let choices = ['btn-primary', 'btn-danger', 'btn-warning', 'btn-success'];
    for (let i=0; i <all_buttons.length; i++ ) {
        let randonNum = Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randonNum]);
    }
}

// Challenge 5: BlackJack
let blackjackGame = {
    'you': {'scorespan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scorespan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6','7', '8', '9', '10', 'K', 'J', 'A', 'Q'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6,'7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'A':[1, 11], 'Q': 10},
    'wins': 0,
    'losses':0,
    'draws': 0,
    'isStand':false,
    'turnsOver':false,
};

const YOU=blackjackGame['you']
const DEALER=blackjackGame['dealer']
const hitSound=new Audio('static/sounds/swish.m4a');
const winSound=new Audio('static/sounds/cash.mp3')
const lossSound=new Audio('static/sounds/aww.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);


function blackjackHit() {
    if (blackjackGame['isStand']===false){
        showCard(YOU);
        showScore(YOU);
    }
}

function showCard(activePlayer) {
    if (activePlayer['score'] <=21) {
        let cardImage = document.createElement('img')
        let card = generateCard();
        cardImage.src = 'static/images/'+ card+ '.png';
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        updateScore(card, activePlayer)
        hitSound.play();
    }
}

function generateCard() {
    let randomIndex = Math.floor(Math.random()*13)
    return blackjackGame['cards'][randomIndex]
}

function blackjackDeal() {
    if (blackjackGame['turnsOver']===true) {
        
        blackjackGame['isStand']= false;
        let yourImages =document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages =document.querySelector('#dealer-box').querySelectorAll('img')

        for (i=0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (i=0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        YOU['score']=0;
        DEALER['score']=0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color='#ffff';
        document.querySelector('#dealer-blackjack-result').style.color='#ffff';
        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';
        blackjackGame['turnsOver']=false;
    }

}

function updateScore(card, activePlayer) {
    if (card ==='A') {
    // if adding 11 keeps me bellow 21, add 11. otherwise add 1
        if (activePlayer['score']+blackjackGame['cardsMap'][card][1]<=21) {
            activePlayer['score']+=blackjackGame['cardsMap'][card][1]
        } else {
            activePlayer['score']+=blackjackGame['cardsMap'][card][0]
        }
    }
    else {
    activePlayer['score']+=blackjackGame['cardsMap'][card]
    }
}

function showScore(activePlayer) {
    if (activePlayer['score']>21) {
        document.querySelector(activePlayer['scorespan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scorespan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score'];
    }
}

// card for dealer played every second
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function dealerLogic() {
    blackjackGame['isStand']=true;
    while (DEALER['score']<16 && blackjackGame['isStand']===true) {
        let card=generateCard();
        showCard(DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    blackjackGame['turnsOver'] =true;
    let winner = determineWinner();
    showWinner(winner);
    
}

// compute winner and return the winner
// update the wins, draws and losses
function determineWinner() {
    let winner;
    if (YOU['score'] <=21){
        if ((YOU['score']>DEALER['score']) || (DEALER['score']>21)){
            blackjackGame['wins']++;
            winner = YOU
        } else if (YOU['score']<DEALER['score']){
            blackjackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score']===DEALER['score']) {
            blackjackGame['draws']++;
        }
    } else if (YOU['score']>21 && DEALER['score']<=21){
        blackjackGame['losses']++;
        winner = DEALER;
    } else if (YOU['score']>21 && DEALER['score']>21) {
        blackjackGame['draws']++;
    }

    console.log("Winner is: ", winner)
    return winner
}

function showWinner(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver']===true)
    {
        if (winner===YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play()
        } else if (winner===DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost!';
            messageColor = 'red';
            lossSound.play()
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'Draw!';
            messageColor = 'black';
        }

        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}