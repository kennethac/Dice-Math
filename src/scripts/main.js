// Declaration of global variables:

// Game types:
// Original: 0
// Keyboard: 1
// Smartboard: 2
var gameType = 0;  
var diceList = [6,6,6,6,6];
var radix = 10;

var tally; // Will be set to function to call on score depending on game.
var ready; // Will be set to function to call on start/roll, depending on game.
var wrong; // Will be called in the event of a wrong answer.

var smartboardButtonHit;
var activeCalcScreen = 2;

var teamOneScore = 0;
var teamTwoScore = 0;

var victoryScore = 11;

var teamOneStyle = 0;
var teamTwoStyle = 0;

var currentDice;
var currentAnswer;

var gameStarted = false;
var rollUsed = false;


var calcScreen = 2;

// End global variables

// Math functions for more convenient input.
String.prototype.splice = function (ind,len,ins){
    char = this.split("");
    char.splice(ind,len,ins);
    return char.join("");
};

function frac(a){
    a = parseInt(a,10);
    if (isNaN(a)){
        return a;
    } else if (a<0){
        return -1*frac(-a);
    } else if (a===0||a==1) {
        return a; 
    } else {
        return a*frac(a-1);
    }
}

function replaceFractal(str){
    patt = /[0-9]+\!/g;
    m = patt.exec(str);
    if (m === null){
        return false;
    } else {
        st = m[0];
        ln = st.length;
        ind = m["index"];
        st = st.substring(0,ln-1);
        st = "frac("+st+")";
        return str.splice(ind,ln,st);
    }
}

function replaceFractals(str){
    do {
        x = replaceFractal(str);
        if (x === false){
            return str;
        } else {
            str = x;
        }
    } while (str);
    return str;
}

function log(a,b){
    return Math.log(b)/Math.log(a);
}

function exp(a,b){
    return Math.pow(a,b);
}

function cos(a){
    return Math.cos(a);
}

function arccos(a){
    return Math.acos(a);
}

function sin(a){
    return Math.sin(a);
}

function arcsin(a){
    return Math.asin(a);
}

function tan(a){
    return sin(a)/cos(a);
}

function arctan(a){
    return Math.atan(a);
}

function sec(a){
    return 1.0/cos(a);
}

function arcsec(a){
    return arccos(1.0/a);    
}

function csc(a){
    return 1.0/sin(a);
}

function arccsc(a){
    return arcsin(1.0/a);
}

function cot(a){
    return 1.0/tan(a);
}

function arccot(a){
    return arctan(1.0/a);
}

// End Math functions

// Checking functions.
Array.prototype.clone = function(){
    return this.slice(0);
};

function checkStr(str,dices){
    var dice = dices.clone();
    patt = /[0-9]+/g;
    missing = [];
    extra = [];
    error = 0;
    do {
        m = patt.exec(str);

        if (m !== null){
            num = m[0];
            num = parseInt(num,10);
            ind = dice.indexOf(num);
            if (ind === -1){
                console.log(num.toString()+" isn't in the dice.");
		// return num.toString();
		extra.push(num);

            } else {
                dice.splice(ind,1);
		console.log(dice.toString());
            }
        }
    }  while (m !== null);

    if (dice.length !== 0){
        console.log("The following dice went unused: "+dice.toString());
	//        return false;
	missing = dice;
    }
    if (missing.length > 0){
	error+=1;
    } 
    if (extra.length > 0){
	error+=2;
    }
    if (error != 0){
	return [error,[missing,extra]];
    } else {
	return true;
    }
}

function checkAns(str, ans){
    submitValue = eval(str)
    if (submitValue == ans){
        return true;
    }
    return submitValue;
}

function feedback(fb){
    $(".feedback").html(fb);
}

function instruct(t){
	$(".instructions").html(t);
}

function checkSubmition(str,dice,ans){

    winner = true;
    
    // Check numbers.
    str = replaceFractals(str);
    strReturn = checkStr(str,dice);
    ansReturn = checkAns(str,ans);
    if (strReturn !== true){
	winner = false;
	error = strReturn[0];
	if (error == 1){ // We were only missing numbers...
	    feedback("Nope! The following numbers were missing: "+strReturn[1][0].toString());
	} else if (error == 2) { // We only had extra numbers...
	    feedback("Nope! These numbers aren't in the dice: "+strReturn[1][1].toString());
	} else if (error == 3){
	    feedback("No.<br/>You missed these numbers: "+strReturn[1][0].toString()+".<br/>And these don't belong: "+strReturn[1][1].toString());
	} else {
	    feedback("System error: "+error.toString());
	}
  	
	$(".submit-field").val("");
	wrong();
    } // End number check
    // CHeck equivilance
    else if (ansReturn !== true){
	console.log(ansReturn);
	// Prorate feedback on distance from mark...
        sigma = Math.floor(ans/5); 
	sigma = Math.max(sigma,2);
	if (ansReturn > ans){
	    max = ansReturn;
	    min = ans;  
	} else {
	    max = ans;
	    min = ansReturn;
	}

	diff = max-min;

	if (diff>(10*sigma)){ // Way off!
	    feedback("What? You are way off. "+ansReturn.toString()+" is no where near "+ans.toString()+".");
	} else if (diff>(5*sigma)){ // Not close.
	    feedback("Way off. "+ansReturn.toString()+" isn't anything like "+ans.toString()+".");
	} else if (diff > (3*sigma)){ // Getting closer
	    feedback("Pretty close, but no. "+ansReturn.toString() + " is pretty close to "+ans.toString()+".");
	} else if (diff > sigma) {
	    feedback(digitToWord(ansReturn.toString()) + " is quite close to "+ans.toString()+", but no cigar.");
	} else { // Smokin' close.
	    feedback("So close! Only "+diff.toString()+" off!");
	}
	wrong();
    } else {
	feedback("Nailed it! Nice!");
	rollUsed = true;
	// Set up leave page warning - somone must have scored.
	window.onbeforeunload = leaving;

	tally();
	setScores();
	checkVictory();
    }


}

function checkVictory(){

	if (Math.max(teamOneScore,teamTwoScore)>=window.victoryScore){
		// We don't need to be warned anymore.
		window.onbeforeunload = undefined;
		gameStarted = false;
		win();
	}
}

function win(){
	winner_number = (teamOneScore > teamTwoScore) ? "1" : "2";
//	winner_number = digitToWord(winner_number);
//	$(".medal").attr("src","/Dice-Game/src/img/Team"+winner_number+"Medal.png");
	$(".medal").css("background","url(/Dice-Game/src/img/Team"+winner_number+"Medal.png)");
//	$winner_content = $(".team-"+winner_number).parent().clone();
//	$(".team-holder").html("");
//	$(".team-holder").html($winner_content.html());
	$(".victory-modal").show();
}


// End Checking Functions.


tally = function(){
    feedback("Way to score! Unfortunately, there's no score system yet...");
    $(".start-button").text("Go again!");
}




// Old function for consolebased dev stage game.

function playGame(){
    dice = [2,8,3,1];
    ans = 9;
    str = prompt("Numbers: "+dice.toString()+"\n"+"Answer: "+ans.toString());
    if (checkStr(str,dice) === false){
        alert("You haven't used the right numbers!");
    }  else if (checkAns(str,ans) === false){
        alert("Your expression doesn't evaluate correctly!");
    } else {
        alert("You win!");
    }
	str = "log(2,8)*exp(1,3)";

}

// End playGame


// Begin game definitions.

DICE = [6]; // Right now, we only have one type of dice
SIDES_PER_TYPE = [6];

function digitToWord(digit){

	switch (digit){

		case 0:
			return "zero";
			break;
		case 1:
			return "one";
			break;
		case 2:
			return "two";
			break;
		case 3:
			return "three";
			break;
		case 4:
			return "four";
			break;
		case 5:
			return "five";
			break;
		case 6:
			return "six";
			break;
		case 7:
			return "seven";
			break;
		case 8: 
			return "eight";
			break;
		case 9: 
			return "nine";
			break;
		case 10:
			return "ten";
			break;
		case 11:
			return "eleven";
			break;
		case 12: 
			return "twelve";
			break;
		case 13:
			return "thirteen";
			break;
		case 14: 
			return "fourteen";
			break;
		case 15:
			return "fifteen";
			break;
		case 16:
			return "sixteen";
			break;
		default:
			return "Out of range";
			break;

	}
	return "Error";
}

function sixSidedDice(){
	classes = ["six-one","six-two","six-three","six-four","six-five","six-six"];
	sides = 6;
	number = Math.floor(Math.random()*sides);
	return classes[number];
}

function Dice(sides){
	self.name = ""
	self.sides = sides
	r = Math.floor(Math.random()*sides)+1
	self.value = r
	self.name = digitToWord(sides)+"-"+digitToWord(r)
	return self;
}





function rollDice(){
	rollUsed = false;
        currentDice = [];

	$(".extra").css("color","transparent");
	$("span.add-die").css("display","inline-block");
	$("#extra-die").css("display","none");

	$("img.dice").attr("class","dice"); // Wipe out all other classes.
	for (i = 0;i<5;i++){
		j = i+1
		die = new Dice(diceList[i]);
		$("img.dice:eq("+j.toString()+")").addClass(die.name);
		$("span:not(.extra).digit:eq("+i.toString()+")").text(die.value.toString(radix));
		if (i == 4){
		    currentAnswer = die.value;
		} else {
		    currentDice.push(die.value);
		}
	}



}

function getGameType(){

	// Check local Storage.
	gt = parseInt(localStorage.DG_GT) // DiceGame_GameType
	if (gt !== NaN){
		gameType = gt;
	}
	
	// Check hash.
	hash = window.location.hash.substring(1);
	switch (hash){
		case "original":
			gameType = 0;
			break;
		case "keyboard":
			gameType = 1;
			break;
		case "smartboard":
			gameType = 2;
			break;
			
	}
}


function scoreOrig(){
	team = $(".submit-team").val();
	if (team == "Team 1"){
		teamOneScore += 1;
	} else if (team == "Team 2"){
		teamTwoScore += 1;
	} else { 
		feedback("You've managed to select an invalid team. No score!");
	}
	instruct("Press the 're-roll' button for the next round.");
}

function setUpOrig(){
	$(".submit-team").show();
	window.tally = scoreOrig;
	window.ready = function(){instruct("Select the team and their answer to check and score")};
	window.wrong = function(){return};
}

function setUpKeyboard(){
	alert("This game is not yet implemented. Setting up original style.");
	setUpOrig();
}

function scoreSmartboard(){
	scoring = smartboardButtonHit;
	if (scoring == 0){
		teamOneScore += 1;
	} else if (scoring == 1){
		teamTwoScore += 1;
	} else {
		feedback("No one hit the button!");
	}
	instruct("Press the 're-roll' button to roll the dice again.");
	$(".scorer").show();	
}

function listenSmartboard(){
	smartboardTeamHit = -1;
	$(".smart-button").show();
	$(".scorer").hide();
	$(".solution-area").hide()
	instruct("Hit your team's button for a chance to score!");

}


function setUpSmartboard(){
	window.tally = scoreSmartboard;
	window.ready = listenSmartboard;
	window.wrong = listenSmartboard;
	activateCalcScreen();
}

function getDiceTypes(){
	types = localStorage.DG_DT;
	if (types != undefined){
		types = JSON.parse(types);
		typesInts = [];
		for (i = 0;i<types.length;i++){
			typesInts.push(parseInt(types[i]));
		}
		diceList = typesInts;	
	}
}

function getRadix(){
	rad1 = localStorage.DG_RT;
	if (rad1 !== undefined){
		rad1 = parseInt(rad1);
		window.radix = rad1;
	}
}

function getVictoryScore(){
	vs = localStorage.DG_VS;
	if (vs !== undefined){
		vs = parseInt(vs);
		window.victoryScore = vs;
	}
}

function setUpGame(){
	getDiceTypes();
	getGameType();
	getRadix();
	getVictoryScore();
	switch (gameType){

		case 0:
			setUpOrig();
			break;
		case 1:
			setUpKeyboard();
			break;
		case 2:
			setUpSmartboard();
			break;
		default:
			setUpOrig();
			break;

	}
	
}

function setScores(){

	baseScoreClass = "score-number";
	baseScoreIdentifier = baseScoreClass + "-Team";
	tos = "";
	tts = "";
	if (teamOneStyle == 2){
		tos = "2";
	} 
	if (teamTwoStyle == 1){
		tts = "2";
	}
	teamOnes = baseScoreIdentifier+"1-N"+tos+"-"+teamOneScore.toString();
	teamTwos = baseScoreIdentifier+"2-N"+tts+"-"+teamTwoScore.toString();
	$(".team-one .team-score").attr("class","score-number team-score").addClass(teamOnes);
	$(".team-two .team-score").attr("class","score-number team-score").addClass(teamTwos);
}

function setTeams(){

	baseTeamClass = "team"
	baseTeamIdentifier = baseTeamClass+"-Team";
	r1 = (Math.floor(Math.random()*2)+1).toString();
	r2 = (Math.floor(Math.random()*2)+1).toString();
	
	teamOneStyle = r1;
	teamTwoStyle = r2;

	$(".team-one .team-logo").addClass(baseTeamIdentifier+"1-"+r1);
	$(".team-two .team-logo").addClass(baseTeamIdentifier+"2-"+r2);
 		
}

function leaving(){
	if (gameStarted === true){
		return "If you leave now, your game progress will not be saved. Are you sure you want to leave?";
	}
}

function activateCalcScreen(){
		activeInt = parseInt(activeCalcScreen);
		$(".screen").hide();
		$(".screen"+activeCalcScreen.toString()).show();		
		$(".screen-button").attr("class","btn calc-button screen-button");
		$(".screen-button[repr="+activeCalcScreen.toString()+"]").addClass("active");

}

$(document).ready(function(){

	setUpGame();
	

	$(".add-die").css("padding-top","20px");
	$(".add-die").height(38)
	$(".add-die").css("background","rgb(50, 50, 50) linear-gradient(rgb(240, 240, 240), rgb(0, 0, 0)) repeat-x scroll 0% 0% / auto padding-box border-box")
	$(".add-die").css("color","white")

	$(".start-button").click(function(){

		if (gameStarted == false){
			setTeams();
		}
		// Fix visuals 
		$(".start-button").text("Re-roll.");
		$(".start-button").removeClass("btn-success").addClass("btn-primary");
		$(".solution-area").css("display","block");
		$(".dice-area").css("display","block");
		$(".feedback-area").css("display","block");
		ready();
		feedback("");
		// Get going.
		gameStarted = true;

		rollDice();

	    });

	$("img.dice").attr("src","/Dice-Game/src/img/img_trans.gif");
	$(".submit-btn").click(function(){
		if (gameStarted !== true){
		    feedback("You must begin the game to play! Press start!");
		    return false;
		} 

		if (window.rollUsed === true){
			feedback("Re-roll!");
			return false;
		}
		input = $(".submit-field").val().trim();
		if (input == ""){
		    feedback("Please actually provide a guess.");
		} else {
			try {
			    checkSubmition(input,currentDice,currentAnswer);
			} catch (e){
				console.log(e);
				feedback("Something went wrong with your submition. <br/> Please make sure your expression is evaluable (only digits, arithmatic operators, not '=', no variables...)");
			}
		}

	});

	$(".add-die").click(function(){

		$(".extra").css("color","black");
		extra = new Dice(6);
		$("span.add-die").css("display","none");
		$("#extra-die").css("display","inline-block");
		$("#extra-die").addClass(extra.name);
		$(".extra").text(extra.value);
		currentDice.push(extra.value);
	});

	$(".replay").click(function(){
		teamOneScore = 0;
		teamTwoScore = 0;
		setTeams();
		setScores();
		$(".start-button").click();
		$(".victory-modal").hide();
		feedback("");
	});

	$(".smart-button").click(function(){
		instruct("Use the 'calculator' to enter your guess.");
		smartboardButtonHit = $(".smart-button").index($(this));
		$(".smart-button").hide();
		$(".submit-field").attr("placeholder","Team "+(smartboardButtonHit+1).toString()+", write your guess here!");
		$(".scorer").show();
		$(".solution-area").show();
		$(".calculator-holder").show();
		$(".screen").hide();
		$(".screen"+activeCalcScreen.toString()).show();		
	});

	$(".calc-button").click(function(){
		if ($(this).hasClass("calc-left")){
			activeCalcScreen-=1;
			activateCalcScreen();
		} else if ($(this).hasClass("calc-right")){
			activeCalcScreen += 1;
			activateCalcScreen();
		} else if ($(this).hasClass("screen-button")){
			activeCalcScreen = $(this).attr("repr");
			activateCalcScreen();
		} else if ($(this).hasClass("calc-back")){
			cur = $(".submit-field").val();
			cur = cur.substring(0,cur.length-1);
			$(".submit-field").val(cur);
		} else if ($(this).hasClass("calc-clear")){
			$(".submit-field").val("");
		} else if ($(this).hasClass("calc-back")){
			cont = $(".submit-field").val();
			$(".submit-field").val(cont.substring(0,cont.length-1));
		} else {
			$(".submit-field").val($(".submit-field").val()+$(this).text());
		} 

	});

})
