function showGTDesc(){

	gt = localStorage.DG_GT;
	gt = parseInt(gt);
	switch (gt){
		case 0: // Original
			d = "Manual, list-type selection of team submitting answer.";
			break;
		case 1: // Keyboard
			d = "Keyboard based, preemptive selection of submitting team.<br />Press your team's button to win the opportunity to submit an answer.";
			break;
		case 2: // Smartboard
			d = "Play game optimized for smartboard play: screen button based, preemptive selection of submitting team.<br />Press your team's button for the opportuty to submit an answer.<br />(Also works well for mobile devices)";
			break;
		default:
			d = "Unknown game type.";
	}
	$(".game-type-desc").html(d);

}


$(document).ready(function(){

	gameType = localStorage.DG_GT; // DiceGame_GameType
	if (gameType == undefined){
		gameType = 0;
	}
	$(".game-type").children().addClass("gto");
	$(".gto:eq("+gameType.toString()+")").attr("selected","selected");
	showGTDesc();

	diceTypes = localStorage.DG_DT;
	if (diceTypes != undefined){
		diceTypes = JSON.parse(diceTypes);
		lgth = diceTypes.length;
		for (i = 0; i<lgth; i++){
			$(".dice-pref:eq("+i.toString()+")").val(diceTypes[i]);
		}
	}

	radixType = localStorage.DG_RT;
	if (radixType != undefined){
		radixType = parseInt(radixType);
		switch (radixType){
			case 10:
				$(".radix-pref").val("Decimal");
				break;
			case 2: 
				$(".radix-pref").val("Binary");
				break;
			case 16:
				$(".radix-pref").val("Hexadecimal");
				break;
			default: 
				$(".radix-pref").val(radixtype);

		}
	} 

	victoryScore = localStorage.DG_VS;
	if (victoryScore != undefined){
		victoryScore = parseInt(victoryScore);
		$(".victory-score-pref").val(victoryScore);
	} else {
		$(".victory-score-pref").val(11);
		localStorage.DG_VS = 11;
	}

	$(".game-type").change(function(){
		value = $(this).val();
		switch (value){
			case "Original":
				localStorage.DG_GT = 0;
				break;
			case "Keyboard":
				localStorage.DG_GT = 1;
				break;
			case "Smartboard":
				localStorage.DG_GT = 2;
				break;
		}
		showGTDesc();
	});

	$(".victory-score-pref").change(function(){

		score = $(this).val();
		if (score<1){
			$(".victory-score-desc").html("Given value is too low. <br />Please provide a value greater than one for changes to take effect.");			
		} else if (score >= 20){
			localStorage.DG_VS = score;
			$(".victory-score-desc").html("Play to "+score.toString()+".<br />That's a long game, have fun!<br />Please be aware that at present, the game is optimized for a victory score of 11.");
		} else if (score > 11){
			localStorage.DG_VS = score;
			$(".victory-score-desc").html("Play to "+score.toString()+".<br />Please be aware that at present, the game is optimized for a final victory score of 11.");
		} else {
			localStorage.DG_VS = score;
			$(".victory-score-desc").html("Play to "+score.toString()+".");
		}
	});
	$(".victory-score-pref").change();


	$(".dice-pref").change(function(){
		list = [];
		$(".dice-pref").each(function(){
			list.push($(this).val());
		});
		localStorage.DG_DT = JSON.stringify(list); // DiceGame_DiceTypes
	})
	
	$(".radix-pref").change(function(){
		value = $(this).val();
		switch (value){
			case "Decimal":
				localStorage.DG_RT = 10;
				break;
			case "Binary":
				localStorage.DG_RT = 2;
				break;
			case "Hexadecimal":
				localStorage.DG_RT = 16;
				break;
			default:
				localStorage.DG_RT = value;

		}
	});
});

