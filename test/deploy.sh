#!/bin/bash

# Ensure we have input for our git commit message.
if [ $# -eq 0 ]
	then 
		echo "Supply a git commit message."
		exit;
fi

# Substitute '/./' for '/Dice-Game/' in all html, css or js, files since the 
# app is in root On heroku, but in /Dice-Game/ locally. (Should find a 
# better fix) Also remove all the '-e' files bash so annoyingly 
# creates...

echo "Replacing url's... "
find . | grep '.css\|.html\|.js' | xargs sed -i -e 's/\/Dice\-Game\//\/\.\//g'
find . | grep "\-e" | xargs sudo rm
echo "Replaced.\n"

# Push to heroku (app "dice-math")
echo "Adding and committing all files...."
git add .
git commit -am $0
echo "Done.\n"
echo "Pushing to Heroku..."
echo "Done pushing.\n"

# Resubstitute '/Dice-Game/' for '/./' on local machine.

echo "Reverting urls..."
find . | grep '.css\|.html\|.js' | xargs sed -i -e 's/\/Dice\-Game\//\/\.\//g'
find . | grep "\-e" | xargs sudo rm
echo "Done.\n"
echo "App deployed.\n"
