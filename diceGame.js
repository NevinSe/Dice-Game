
function rollDie(n)
{ 
	let outcome = Math.floor(Math.random()*n)+1;
	
	return outcome;
}

function turnDecider()
{
	let playerOneTurn = rollDie(20);
	let playerTwoTurn = rollDie(20);
	if(playerOneTurn == playerTwoTurn)
	{
		console.log("REROLL!");
		turnDecider();
	}
	else if (playerOneTurn !== playerTwoTurn)
	{
		if(playerOneTurn < playerTwoTurn)
		{
			console.log("Player Two Turn");
			return false;
		}
		else if(playerOneTurn > playerTwoTurn)
		{
			console.log("Player one Turn");
			return true;
		}
	}
}

function attackingPhase()
{
		let critMultiplier = rollDie(4);
		let attack;
		let critChecker = criticalCheck();
		if (critChecker === true)
		{
			attack = rollDie(6) * critMultiplier
		}
		else
		{
			attack = rollDie(6);
		}
		console.log(attack);
		return attack;
}

function criticalCheck()
{
	let critCheck = rollDie(4);
	if(critCheck > 3)
	{
		console.log("You critical!")
		return true;
	}
	else
	{
		console.log("You did not critial")
		return false;
	}

}

function attackValue(playerHealth)
{
			playerHealth -= attackingPhase();
			playerHealth += amountHealed();
			return playerHealth;
}

function healingFactor()
{
	let healingCheck = rollDie(10);
	if(healingCheck > 6)
	{
		console.log("You were able to regenerate some health!");
		return true;
	}
	else
	{
		console.log("You were not able to regenerate this time");
		return false;
	}

}
function amountHealed()
{
	let amountHeal = 0;
	let didHeal = healingFactor();
	if(didHeal === true)
	{
		amountHeal = rollDie(8)
		console.log("You healed: ", amountHeal, "HP");
		return amountHeal;
	}
	else
	{
		console.log("NOPE!");
		return amountHeal;
	}
}

function stealGold()
{
	let goldStolen = rollDie(12);
	goldStolen *= 10;
	console.log(goldStolen, "Gold Stolen!");
	return goldStolen;
}

function winnerOutput(playerOneHealth, playerTwoHealth, playerOneGold, playerTwoGold)
{
	if(playerOneHealth <= 0)
	{
		alert("Player Two Wins!"+"\n"+"With: " + playerTwoHealth+" "+"health remaining"+"\n"+"And Has:" +" "+  playerTwoGold +" "+ "Gold!");
		document.getElementById("result1").innerHTML = "Player 2 Won";
	}
	else if(playerTwoHealth <= 0)
	{
		alert("Player One Wins!"+"\n"+"With: "+ playerOneHealth+" "+"health remaining."+"\n"+"And Has:" +" "+ playerOneGold +" "+ "Gold!");
		document.getElementById("result1").innerHTML = "Player 1 Won";
		
	}
}



function runTheGauntlet()
{
	let playerOneHealth = 300;
	let playerOneGold = 1000;
	let playerTwoHealth = 300;
	let playerTwoGold = 1000;
	let turnPicker;
	while(playerOneHealth > 0 && playerTwoHealth > 0)
	{
		turnPicker = turnDecider();
		if(turnPicker === true)
		{
			playerTwoHealth = attackValue(playerTwoHealth);
			goldSteal = stealGold();
			if(playerTwoGold > 0)
			{
				playerTwoGold -= goldSteal;
				playerOneGold += goldSteal;
			}
			console.log(playerTwoHealth, playerTwoGold);
		}
		else
		{
			playerOneHealth = attackValue(playerOneHealth);
			goldSteal = stealGold();
			if(playerOneGold > 0)
			{
				playerOneGold -= goldSteal;
				playerTwoGold += goldSteal;
			}
			
			console.log(playerOneHealth, playerOneGold);
		}

	}
	winnerOutput(playerOneHealth, playerTwoHealth, playerOneGold, playerTwoGold);

}


