#!/bin/bash

read -p "Commit message: " -e input


# Substitute '/./' for '/Dice-Game/' in all html, css or js, files since the 
# app is in root On heroku, but in /Dice-Game/ locally. (Should find a 
# better fix) Also remove all the '-e' files bash so annoyingly 
# creates...

echo "Replacing url's... "
find * | grep '\.css\|\.html\|\.js' | xargs sudo sed -i -e 's/\/Dice\-Game\//\/\.\//g'
find * | grep "\-e" | xargs sudo rm
echo "Replaced.\n"

# Push to heroku (app "dice-math")
echo "Adding and committing all files...."
git add .
git commit -am "$input"
echo "Done.\n"
echo "Pushing to Heroku..."
git push heroku master
echo "Done pushing.\n"

# Resubstitute '/Dice-Game/' for '/./' on local machine.

echo "Reverting urls..."
find * | grep '\.css\|\.html\|\.js' | xargs sudo sed -i -e 's/\/\.\//\/Dice\-Game\//g'
find * | grep "\-e" | xargs sudo rm
echo "Done.\n"
echo "App deployed.\n"
