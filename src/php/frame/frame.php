<?php

function rootPath($a){
	return $_SERVER["DOCUMENT_ROOT"].$a;
}

function getHeadContents($title){


	// build the final title from given page title.
	$full_title = "The Dice Game";
	if ($title !== ""){
		$full_title .= ": ".$title;
	}

	echo "\n";
	echo "<title>".$full_title."</title>";
	echo "\n";

	// import ubiquitous head content.
	readfile(rootPath("/Dice-Game/src/php/frame/html/head-content.html")); // Will send contents to browser...

}

function getHeader(){ // Also imports the website background image...
	// Ack.. We'll have to use some js to customize the header stuff...
	readfile(rootPath("/Dice-Game/src/php/frame/html/header.html")); // will send contents to browser...
}

function getFooter(){
	readfile(rootPath("/Dice-Game/src/php/frame/html/footer.html")); // Will send contents to browser...
}

?>
