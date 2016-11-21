//javascript for random shapes by Sam Brind//
//Displays a random collection of customisable shapes on screen

//function to produce a random RGB colour
var random_colour = function(){
	//produce random RGB values between 0 and 255
	var r = Math.round(255*Math.random());
	var g = Math.round(255*Math.random());
	var b = Math.round(255*Math.random());
	//combine them into a string
	return 'rgb('+r+','+g+','+b+')';
}

//function the document is loaded
$(document).ready(function(){
	//loop a set no of times
	for (var i = 0; i < 200; i++) {
		//set max shape value
		var max = 120;
		//set max position value
		var max2 = 2000; 
		//generate random integers up to max value
		var h = Math.round(max*Math.random()); //height
		var w = Math.round(max*Math.random()); //width
		var br = Math.round(max*Math.random()); //border-radius
		var t = Math.round(max2*Math.random()); //top
		var l = Math.round(max2*Math.random()); //left
		var z = String(i); //z-index
		//append new shape with the random numbers as dimensions and positions
		var add = '<div class="shape" style="background-color:'+random_colour()+';height:'+h+'px;width:'+w+'px;top:'+t+'px;left:'+l+'px;border-radius:'+br+'px;z-index:'+z+';">&nbsp</div>';
		$('body').append(add);
	}
	$('.shape').resizable().draggable(); //make shapes draggable and resizable
	//attach droppable function to bring shape to the front
	$('.shape').droppable({
		drop: function(event, ui){
			//loop through all shapes
			$('.shape').each(function() {
				//check if z-axis is above selected block
				if(Number($(this).css('z-index'))>Number($(ui.draggable).css('z-index'))){
					//decrease z-index by 1
					$(this).css('z-index',String(Number($(this).css('z-index'))-1));
				}
			});
			//set this shape as max z-axis
			$(ui.draggable).css('z-index','199');
		}
	});
	//attach clickable function to change colour
	$('.shape').click(function(){
		//change background colour to random one
		$(this).css('background-color',random_colour());
	});
});