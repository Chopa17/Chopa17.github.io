//javascript for rock Paper Scissors by Sam Brind//
//Play RPS against a basic AI

//initialise global throws array [last throw, throw before last, won last throw?]
var throws = [0,0,0];

//declare function to increment scoreboard
var increment = function(person){
	var score = parseInt($('font:nth-child('+person.toString()+')').html().replace('AI:','')); //parse current score from scoreboard html
	score += 1; //add 1 to current score
	//if 1, update ai score
	if (person === 1){
		$('font:nth-child(1)').html('AI:'+ score.toString()); //display new score
	//otherwise, update human score
	}else{
		$('font:nth-child(2)').html(score.toString()+':YOU'); //display new score
	}
}

//declare function to flash hand
var flash = function(person){
	if (person === 1){ var select = '.ai .hand' }else{ var select = '.player .hand' } //set jquery selector for hand
	//change background to rock
	$(select).animate({opacity:'0'},800); //fade image out
    	window.setTimeout(function() {
        	$(select).addClass('rock'); //change to rock image
		$(select).animate({opacity:'1'},800); //fade image in
		window.setTimeout(function() {
			//change background to paper
			$(select).animate({opacity:'0'},800); //fade image out
			window.setTimeout(function() {
				$(select).removeClass('rock'); //remove rock image
				$(select).addClass('paper'); //change to paper image
				$(select).animate({opacity:'1'},800); //fade image in
				window.setTimeout(function() {
					//change background to scissors
					$(select).animate({opacity:'0'},800); //fade image out
					window.setTimeout(function() {
						$(select).removeClass('paper'); //remove paper image
						$(select).addClass('scissors'); //change to scissors image
						$(select).animate({opacity:'1'},800); //fade image in
						window.setTimeout(function() {
							$(select).animate({opacity:'0'},800); //fade image out
							window.setTimeout(function() {
								$(select).removeClass('scissors'); //remove scissors image
							}, 800);
						}, 800);
					}, 800);
				}, 800);
			}, 800); //note: use of timeout to make sure animation is done before adjusting properties
		}, 800);
    	}, 800);

}

//declare function to reset game
var reset = function(){
	//remove classes from hands
	$('.hand').removeClass('paper rock scissors');
	//remove clicked state
	$('.button').removeClass('clicked');
}

//declare function to decide AI throw decision
var ai = function(){
//ai notes:
//asume first throw will be rock
//typical selection percentages of player {r,p,s = 36,34,30}
//ai typical slection should be {r,p,s = 30,34,36}
//if theres 2 in a row, 3rd throw whatever would be beaten e.g. scissors for 2 rocks in a row
//if the player wins, assume they will stick
	//check if its the first throw
	if (throws[0] === 0){
		return 'paper';
	}
	//check for 2 subsequent throw
	if (throws[0] === throws[1]){
		if (throws[0] === 'rock'){
			return 'scissors';
		}
		if (throws[0] === 'paper'){
			return 'rock';
		}else{
			return 'paper';
		}
	}
	//check for a win
	if (throws[2] === 1){
		if (throws[0] === 'rock'){
			return 'paper';
		}else if(throws[0] === 'paper'){
			return 'scissors';
		}else{
			return 'rock';
		}
	}
	//default to a weighted random throw
	var random = Math.floor(Math.random() * 100) + 1; //generate random no 1-100
	if (random < 30){
		return 'rock'; //rock with 30% chance
	}else if(random > 64){
		return 'paper'; //paper with 36% chance
	}else{
		return 'scissors'; //scissors with 34% chance
	}
}

//function to determine winner, returns {0,1,2} representing {draw,ai win, player win}
var winner = function(player,ai){
	//case of a draw
	if (player === ai){ throws[2] = 0; return 0; }
	//player selects rock
	if (player === 'rock'){
		if (ai === 'paper'){
			throws[2] = 0; //player loss
			return 1;
		}
		if (ai === 'scissors'){
			throws[2] = 1; //player win
			return 2;
		}
	}
	//player selects paper
	if (player === 'paper'){
		if (ai === 'rock'){
			throws[2] = 1; //player win
			return 2;
		}
		if (ai === 'scissors'){
			throws[2] = 0; //player loss
			return 1;
		}
	}	
	//player selects scissors
	if (player === 'scissors'){
		if (ai === 'paper'){
			throws[2] = 1; //player win
			return 2;
		}
		if (ai === 'rock'){
			throws[2] = 0; //player loss
			return 1;
		}
	}
}

//function to play the game
var playgame = function(){
	//flash both hands
	flash(1);
	flash(2);
	//use ai function to decide ai response
	var AI = ai();
	//show hands
	var player = $('.clicked').attr('class').replace(' button clicked','').replace(' left','').replace(' middle','').replace(' right',''); //players selection
	//update throws array
	throws[1] = throws[0]; //move last throw back one
	throws[0] = player; //add this throw as last throw
	window.setTimeout(function() {
		$('.ai .hand').addClass(AI); //show ai hand
		$('.player .hand').addClass(player); //show player hand
		$('.hand').animate({opacity:'1'},800);
    	}, 5650);
	//determine winner and update scoreboard
	window.setTimeout(function() {
		//run winner
		var result = winner(player,AI);
		//if it's not a draw
		if (result > 0){
			increment(result); //update scoreboard
		}
		window.setTimeout(function() {
			//reset the game
			reset();
		}, 500);
	}, 6450);

}

//when the document is ready
$(document).ready(function(){
	//attach click function to buttons
	$('.button').click(function(){
		//check all buttons are currently unclicked
		if (!$('.button').hasClass('clicked')){
			//add clicked class to this button
			$(this).addClass('clicked');
			//run game function
			playgame();
		}
	});
});