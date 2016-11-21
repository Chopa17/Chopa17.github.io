//javascript for the game of life by Sam Brind//

//board generation function
var generateBoard = function(size){
	var row = '<tr>';
	var cell = '<td class="dead">&nbsp</td>';
	//add a cell to the row size times
	for(var i = 0;i < size; i++){row += cell;}
	row += '</tr>';
	//add a row to the table size times
	while(size--){$('table').append(row);}
}
//add an iteration to the counter
var addIteration = function(){
	var count = $('input').val();
	count--;
	return $('input').val(count);
}

//check whether a cell is alive
var checkCell = function(x,y,size){
	//check that cell isn't off the board
	if (x < 1 || y < 1) { return 0; }
	if (x > size || y > size) { return 0; }
	//set board postion into jquery selector
	var selector = 'table tr:nth-child('+y+') td:nth-child('+x+')';
	switch ($(selector).attr('class')){
		case "alive":
			return 1;
			break;
		case "dead":
			return 0;
			break;
	}
}
//count no of neighbours
var countNeighbours = function(x,y,size){
	var count = 0;
	//check directly above
	count += checkCell(x,y-1,size);
	//check directly below
	count += checkCell(x,y+1,size);
	//check leftward column
	count += checkCell(x-1,y-1,size);
	count += checkCell(x-1,y,size);
	count += checkCell(x-1,y+1,size);
	//check rightward column
	count += checkCell(x+1,y-1,size);
	count += checkCell(x+1,y,size);
	count += checkCell(x+1,y+1,size);
	return count;
}
//time increment function
var incrementTime = function(size){
	//initialise loop variables,selector string and neighbour count
	var x,y,selector,count;
	x = y = 0;
	//loop through all the cells
	while(y < size){
		y++;
		x = 0;
		while(x < size){
			x++;
			selector = 'table tr:nth-child('+y+') td:nth-child('+x+')';
			count = countNeighbours(x,y,size);
			switch ($(selector).attr('class')){
				case "dead":
					//3 live neighbours will result in the cell coming to life
					if(count === 3){
						$(selector).html('alive');
					}else{
						$(selector).html('dead');
					}
					break;
				case "alive":
					if(count < 2){
						//under-population
						$(selector).html('dead');
					}else if(count>3){
						//over-population
						$(selector).html('dead');
					}else{
						//survival
						$(selector).html('alive');
					}
			}
		}
	}
	//change html labels to classes
	$("td:contains('alive')").attr('class','alive');
	$("td:contains('dead')").attr('class','dead');
	$('td').html('&nbsp');
	//if this is last increment, renable counter input and run button
	if($('input').val() == 1){
		$('button').html('Run');
		$('button').prop('disabled',false);
		$('input').prop('disabled',false);
	}

}
var iterate = function(max){
	incrementTime(max);
	addIteration();			
}
//document is ready
$(document).ready(function(){
	//set max board dimension
	var max = 30;
	//generate board
	generateBoard(max);
	//attach click function to cells
	$('td').click(function(){
		//switch cell between alive and dead when clicked
		if ($(this).hasClass('dead')===true){
			$(this).removeClass('dead');
			return $(this).addClass('alive');
		}else{
			$(this).removeClass('alive');
			return $(this).addClass('dead');
		}	
	});
	//attach click function to button
	$('button').click(function(){
		var count = $('input').val();
		//check counter is a number
		if(isNaN(count)){
			$('input').val('');
			return alert('Error: Number of iterations must be a number!');
		}
		//check counter is an integer
		if(Number(count) !== parseInt(count)){
			$('input').val('');
			return alert('Error: Number of iterations must be an integer!');
		}
		//check counter is positive
		if(count < 1){
			$('input').val('');
			return alert('Error: Number of iterations must be a positive number!');
		}
		//disable button and counter input
		$('button').html('Running...');
		$('button').prop('disabled',true);
		$('input').prop('disabled',true);
		//set i as counter value
		var i = $('input').val();
		//iterate until counter is zero with 500ms delay
		setInterval(function() {
			i--; 
			if (i >= 0) { iterate(max); } 
		}, 500);
	});
	//attach click to help icon to show hide help info
	$('.icon').click(function(){
		if($('.help').height() === 120){
			$('.help').animate({height:'0px'},150).removeClass('extras'); //hide help text
		}else{
			$('.help').animate({height:'120px'},150).addClass('extras'); //show help text
		}
	});
});