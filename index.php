<?php include($_SERVER["DOCUMENT_ROOT"]."/Dice-Game/src/php/frame/frame.php"); ?>
<!DOCTYPE html>
<html>
<head>
<?php getHeadContents(""); ?>

<!-- Get better js... -->


</head>
<body>
<?php getHeader(); ?>

<div class="game-area container">


	<div class="row row1">

		<div class="team-spot">
			<button class="smart-button smart-button-1 btn btn-danger"><h3>Got It!</h3></button>
			<div class="scorer team-one">
				<i class="team team-logo"></i>
				<i class="score-number team-score"></i>
			</div>


		</div>


		<div class="game-controls">
			<button class="btn btn-success btn-large start-button">Start!</button>
			<div class="dice-area">

				<div class="dice-group">
					<span class="dice btn add-die">Add One</span>
					<img class="dice" id="extra-die"/>
					<img class="dice first"/>
					<img class="dice second"/>
					<img class="dice third"/>
					<img class="dice fourth"/>
					<span>=</span>
					<img class="dice answer"/>
				</div>

				<div class="digit-group">
					<span class="digit extra">N/A</span>
					<span class="digit"></span>
					<span class="digit"></span>
					<span class="digit"></span>
					<span class="digit"></span>
					<span>=</span>
					<span class="digit"></span>
				</div>
	
			</div>
			<div class="solution-area">
<div class="calculator-holder">
	<div class="calculator">
		<div class="screen screen1">
			<div class="button-row btn-group">
				<button repr=1 class="btn calc-button screen-button">Operators</button>
				<button repr=2 class="btn calc-button screen-button">Digits</button>
				<button repr=3 class="btn calc-button screen-button">Functions</button>
			</div>
			<div class="button-row">
				<button class="calc-button btn">+</button>
				<button class="calc-button btn">-</button>
				<button class="calc-button btn">>></button>
			</div>
			<div class="button-row">
				<button class="calc-button btn">*</button>
				<button class="calc-button btn">/</button>
				<button class="calc-button btn"><<</button>
			</div>
			<div class="button-row">
				<button class="calc-button btn">&</button>
				<button class="calc-button btn">|</button>
				<button class="calc-button btn">^</button>
			</div>
			<div class="button-row">
				<button class="calc-button btn">(</button>
				<button class="calc-button btn">)</button>
				<button class="calc-button btn">!</button>
			</div>
			<div class="button-row">
				<button class="calc-button btn calc-back">&#8656;</button>
				<button class="calc-button btn calc-clear">Clear</button>
				<button class="calc-button btn calc-right">&rarr;</button>
			</div>
		</div>
		<div class="screen screen2">
			<div class="button-row btn-group">
				<button repr=1 class="btn calc-button screen-button">Operators</button>
				<button repr=2 class="btn calc-button screen-button">Digits</button>
				<button repr=3 class="btn calc-button screen-button">Functions</button>
			</div>
			<div class="button-row">
				<button class="calc-button btn">1</button>
				<button class="calc-button btn">2</button>
				<button class="calc-button btn">3</button>
			</div>
			<div class="button-row">
				<button class="calc-button btn">4</button>
				<button class="calc-button btn">5</button>
				<button class="calc-button btn">6</button>
			</div>
			<div class="button-row">
				<button class="calc-button btn">7</button>
				<button class="calc-button btn">8</button>
				<button class="calc-button btn">9</button>
			</div>
			<div class="button-row">
				<button class="calc-button btn">,</button>
				<button class="calc-button btn">0</button>
				<button class="calc-button btn">.</button>
			</div>
			<div class="button-row">
				<button class="calc-button btn calc-left">&larr;</button>
				<button class="calc-button btn calc-clear">Clear</button>
				<button class="calc-button btn calc-right">&rarr;</button>

			</div>

		</div>
		<div class="screen screen3">
			<div class="button-row btn-group">
				<button repr=1 class="btn calc-button screen-button">Operators</button>
				<button repr=2 class="btn calc-button screen-button">Digits</button>
				<button repr=3 class="btn calc-button screen-button">Functions</button>
			</div>
			<div class="button-row">
				<button class="calc-button btn">sin(</button>
				<button class="calc-button btn">cos(</button>
				<button class="calc-button btn">tan(</button>
			</div>
			<div class="button-row">
				<button class="calc-button btn">arcsin(</button>
				<button class="calc-button btn">arccos(</button>
				<button class="calc-button btn">arctan(</button>
			</div>
			<div class="button-row">
				<button class="calc-button btn">csc(</button>
				<button class="calc-button btn">sin(</button>
				<button class="calc-button btn">cot(</button>
			</div>
			<div class="button-row">
				<button class="calc-button btn">arccsc(</button>
				<button class="calc-button btn">arcsec(</button>
				<button class="calc-button btn">arccot(</button>
			</div>
			<div class="button-row">
				<button class="calc-button btn calc-left">&larr;</button>
				<button class="calc-button btn">exp(</button>
				<button class="calc-button btn">log(</button>
			</div>

		</div>
	</div>
</div>

				<select class="submit-team">
					<option>Team 1</option>
					<option>Team 2</option>
				</select>
				<input type="text" class="submit-field"  placeholder="Type solution here."></input>
				<button class="btn submit-btn">Submit</button>
			</div>
		</div>
		<div class="team-spot">
			<button class="smart-button smart-button-1 btn btn-danger"><h3>Got It!</h3></button>
			<div class="scorer team-two">
				<i class="team team-logo"></i>
				<i class="score-number team-score"></i>
			</div>
		</div>
	</div>
	<div class="row row2">
		<div class="feedback-area">
			<div class="feedback-holder">
				<p class="feedback"></p>
			</div>
		</div>
	</div>

</div>
<div class="victory-modal">
	<span class="vert-helper"></span>
<!--	<img class="medal"/>
-->
	<div class="medal">
		<span class="vert-helper"></span>
		<button class="replay btn btn-info">Replay</button>
	</div>
<!--	<div class="victory-halo">
		<div class="team-holder">

		</div>
		<button class="restart">Replay</button>		
	</div>
-->
</div>



<?php getFooter(); ?>
</body>
</html>

