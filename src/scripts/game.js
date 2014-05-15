// Math functions for more convenient input.

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
function checkStr(str,dice){
    patt = /[0-9]+/g;
    do {
        m = patt.exec(str);
        if (m !== null){
            num = m[0];
            num = parseInt(num,10);
            ind = dice.indexOf(num);
            if (ind === -1){
                console.log(num.toString()+" isn't in the dice.");
                return false;
            } else {
                dice.splice(ind,1);
            }
        }
    }  while (m !== null);
    if (dice.length !== 0){
        console.log("The following dice went unused: "+dice.toString());
        return false;
    }
    return true;
    
}

function checkAns(str, ans){
    if (eval(str) == ans){
        return true;
    }
    return false;
}
 
// End Checking Functions.






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





