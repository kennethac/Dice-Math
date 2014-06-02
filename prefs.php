<?php include($_SERVER["DOCUMENT_ROOT"]."/Dice-Game/src/php/frame/frame.php"); ?>
<!DOCTYPE html>
<html>
<head>
	<?php getHeadContents("Preferences"); ?>
	<link href="/Dice-Game/src/style/prefs.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="/Dice-Game/src/scripts/prefs.js"></script>
</head>
<body>
	<?php getHeader(); ?>
<div class="preference-pane">

	<div class="pref">
		<div class="opt">
			<label>Game Type:</label>
			<select class="game-type">
				<option>Original</option>
				<option>Keyboard</option>
				<option>Smartboard</option>
			</select>
		</div>	
		<div class="desc">
			<p class="game-type-desc"></p>
		</div>
	</div>
	<div class="pref">
		<div class="opt">
			<label>Victory Score:</label>
			<input min=1 class="victory-score-pref" type="number"></input>
		</div>
		<div class="desc">
			<p class="victory-score-desc"></p>
		</div>
	</div>
	<div class="pref">
		<div class="opt">
			<label>Dice Types:</label>
			<select class="dice-pref">
				<option>6</option>
				<option>12</option>
				<option>20</option>
			</select>
			<select class="dice-pref">
				<option>6</option>
				<option>12</option>
				<option>20</option>
			</select>
			<select class="dice-pref">
				<option>6</option>
				<option>12</option>
				<option>20</option>
			</select>
			<select class="dice-pref">
				<option>6</option>
				<option>12</option>
				<option>20</option>
			</select>
			<select class="dice-pref">
				<option>6</option>
				<option>12</option>
				<option>20</option>
			</select>
		</div>
		<div class="desc">
			<p class="dice-type-desc">
				The number of faces on each dice to be rolled. (The extra dice always has 6).
			</p>
		</div>
	</div>
	<div class="pref">
		<div class="opt">
			<label>Digit display:</label>
			<select class='radix-pref'>
				<option>Decimal</option>
				<option>Binary</option>
				<option>Hexadecimal</option>
			</select>
		</div>
		<div class="desc">
			<p class="radix-type-desc">
				The radix with which to display the digit representation.<br />Viewing in binary will make it much easier to see bitwise operation possibilities...
			</p>
		</div>
	</div>


</div>

	<?php getFooter(); ?>
</body>
</html>
