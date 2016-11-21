//javascript for Tower of Hanoi by Sam Brind//

//global arrays
var t_one = [30]; //tower one
var t_two = [30]; //tower two
var t_three = [30]; //tower three
var before = ''; //storage for a html string
var aim = []; //the tower to be aimed for

//function to generate the initial tower of a max no of blocks
var generate_initial = function(max) {
	$('.block').remove(); //remove any blocks
	//check that requested no of blocks is within 20
	if (max > 20){
		return alert("Maximum of 20 blocks!");	
	}
	//initialise towers
	t_one = [30];
	t_two = [30];
	t_three = [30];
	//loop through and add block numbers in reverse order to tower one array
	for(i=0;i<max;i++){
		t_one.push(max - i);
	}
	aim = t_one; //initialise aim to initial tower one
	//set the minimum top and left values
	var i_t = $('.tower').eq(0).offset().top + 666;
	var i_l = $('.tower').eq(0).offset().left;
	//loop through and generate the html for the blocks
	for (i=1;i<=max;i++){
		generate_block(i,max,i_l,i_t);
	}
};

//function to generate the html for a block
var generate_block = function(n,max,l,t){
	var w = (280/max)*n; //set the block width
	var pos = (max - n); //set the blocks position
	//check if block is even
	if (n%2===0){
		var block = '<div class="new block even one" style="width:'+w+'px">'+n+'</div>';
	}else{
	//or block is odd
		var block = '<div class="new block odd one" style="width:'+w+'px">'+n+'</div>';
	}
	$('body').append(block); //add the block to the html
	//position the block
	$('.new').css('left',l-(w/2)+4);
	$('.new').css('top',t-(pos*34));
	$('.new').css('z-index',pos); //set the z-index
	$('.new').removeClass('new'); //remove the new class now the block has been positioned
};

//function to increment the move counter
var increment_count = function(){
	var current = Number($('.counter').html().replace('Moves:','')); //get the current move count
	$('.counter').html('Moves:'+(current+1)); //increment the counter by one
};

//function to refresh the game
var refresh = function(num){
	generate_initial(num); //generate the blocks
	drag_blocks(); //attach draggable to all blocks
	drag_set(); //run function to set blocks to draggable
	$('.counter').html('Moves:0'); //reset move counter
	$('.optimal').html('Optimal:'+(Math.pow(2,num)-1)); //set optimal move display
}

//function to cancel a block move
var cancel_move = function(){
	//restore body html to before drag
	$('body').children().remove();
	$('body').append(before);
	//iterate over each block in tower two
	$('.two').each(function() {
		var w = (280/Number($('.active').html()))*Number($(this).html()); //block width
		var new_l = $('.tower').eq(1).offset().left-(w/2)+4 + 'px'; //the new block left
		$(this).css('left',new_l); //update block's left
	});
	//iterate over each block in tower three
	$('.three').each(function() {
    		var w = (280/Number($('.active').html()))*Number($(this).html()); //block width
		var new_l = $('.tower').eq(2).offset().left-(w/2)+4 + 'px'; //the new block left
		$(this).css('left',new_l); //update block's left
	});
	drag_blocks(); //attach draggable to all blocks
	drag_set(); //run function to set blocks to draggable
	clicks(); //set the click functions
}

//function to set all blocks as draggable
var drag_blocks = function(){
	//attach draggable function to all blocks
	$('.block').draggable({
		start: function(event,ui){
			before = $('body').html(); //save the body html before dragging
		}
	});
	//set the out of bounds region
	var out_bounds = [$('.tower').eq(0).offset().left-136,$('.tower').eq(0).offset().top,$('.tower').eq(2).offset().left-3.5,$('.tower').eq(0).offset().top+666];
	$('.block').draggable( "option", "containment", out_bounds ); //set the blocks as draggable unless out of bounds
}

//function to set top blocks as draggable
var drag_set = function(){
	$('.block').draggable('disable'); //disable dragging on all blocks
	$('.one:first, .two:first, .three:first').draggable('enable'); //enable top blocks on each tower to be dragged
}

//declare function to check if player has won
var check_win = function(){
	//check if either tower two or three are equal to the aim
	if (t_two.join('') === aim.join('') || t_three.join('') === aim.join('')){
		$('.active').addClass('complete'); //indicate level is complete
		$('.status').html('Completed');
		//check if no of moves was optimal
		if ($('.counter').html().replace('Moves:','') === $('.optimal').html().replace('Optimal:','')){
			//add green class to indicate optimal completion
			$('.active').addClass('green');
			$('.status').addClass('green');
			//display optimal congratulatory message
			if ($('.active').html() === '1'){
				alert('Congratulations, you have stacked '+$('.active').html()+' block in the optimal number of moves.');
			}else{
				alert('Congratulations, you have stacked '+$('.active').html()+' blocks in the optimal number of moves.');
			}
		}else{
			//display congratulatory message with no of moves of optimal solution
			if (Number($('.counter').html().replace('Moves:',''))-Number($('.optimal').html().replace('Optimal:','')) === 1){
				alert('Congratulations, you have stacked '+$('.active').html()+' blocks in '+$('.counter').html().replace('Moves:','')+' moves. You are 1 move over the optimal amount.');
			}else{
				alert('Congratulations, you have stacked '+$('.active').html()+' blocks in '+$('.counter').html().replace('Moves:','')+' moves. You are '+(Number($('.counter').html().replace('Moves:',''))-Number($('.optimal').html().replace('Optimal:',''))).toString()+' moves over the optimal amount.');
			}
		}
		$('.block').draggable( "disable" ); //disable drag on blocks
	}
}

//function to assign click functions
var clicks = function(){
	//atach click function to help icon
	$('.icon').click(function(){
		if($('.help').height() === 23){
			$('.help').animate({height:'0px'},150).removeClass('extras'); //hide help text
		}else{
			$('.help').animate({height:'23px'},150).addClass('extras'); //show help text
		}

	});
	//attach click function to level table cells
	$('td').click(function(){
		$('.active').removeClass('active'); //remove active class from active cell
		//reset status bar
		$('.status').removeClass('green');
		$('.status').html('&nbsp');
		$(this).addClass('active'); //add active class to clicked cell
		//check if level is already completed
		if ($(this).hasClass('complete')){
			$('.status').html('Completed');
		}
		//check if level was optimally completed
		if ($(this).hasClass('green')){
			$('.status').addClass('green');
		}
		refresh(Number($(this).html())); //call refresh function with clicked cell no
	});
}

//function to position block on nth tower
var position_block = function(n,value,ui){
	var new_l = '';
	var new_t = '';
	w = (280/Number($('.active').html()))*value;
	new_l = $('.tower').eq(n-1).offset().left-(w/2)+4 + 'px';
	$(ui.draggable).css('left',new_l);
	if(n === 1){ pos = t_one.length; }
	if(n === 2){ pos = t_two.length; }
	if(n === 3){ pos = t_three.length; }
	new_t = $('.tower').eq(n-1).offset().top + 734 -(pos*34);
	$(ui.draggable).css('top',new_t);
}

//function when document is loaded
$('document').ready(function() {
	clicks(); //set the click functions
	$('td').eq(0).trigger('click'); //select level 1
	//set the function when a block is dropped
	$('body').droppable({
		drop: function(event, ui){
			var halfwidth = Number($(ui.draggable).css('width').replace('px','')/2); //half the block width
			var left = Number($(ui.draggable).css('left').replace('px','')); //left value
			var value = Number($(ui.draggable).html()); //numerical value of block
			//check if being dropped on the 1st tower
			if (left + halfwidth < $('.tower').eq(0).offset().left + 178){
				//check if move is allowed
				if ( value >= t_one[t_one.length-1]){
					cancel_move(); //cancel move
				}else{
				//a legal move
					//came from 2nd tower
					if ($(ui.draggable).hasClass('two')){
						$(ui.draggable).removeClass('two'); //remove two two class
						t_two.pop(); //remove block from tower two array
						$(ui.draggable).addClass('one'); //add tower one class
						t_one.push(value); //add block to tower one array
					}else{
						//came from 3rd tower
						if ($(ui.draggable).hasClass('three')){
							$(ui.draggable).removeClass('three'); //remove tower three class
							t_three.pop(); //remove block from tower three array
							$(ui.draggable).addClass('one'); //add tower one class
							t_one.push(value); //add block to tower one array
						}
					}
					increment_count(); //increment move count
					position_block(1,value,ui); //position the block
				}
				
			}else{
				//check if being dropped on the 3rd tower
				if (left + halfwidth > $('.tower').eq(1).offset().left + 178){
					//check for illegal move
					if ( value >= t_three[t_three.length-1]){
						cancel_move();
					}else{
						//came from 2nd tower
						if ($(ui.draggable).hasClass('two')){ 
							$(ui.draggable).removeClass('two');
							t_two.pop();
							$(ui.draggable).addClass('three');
							t_three.push(value);
						}else{
							//came from 1st tower
							if ($(ui.draggable).hasClass('one')){
								$(ui.draggable).removeClass('one');
								t_one.pop();
								$(ui.draggable).addClass('three');
								t_three.push(value);
							}	
						}
					increment_count(); //increment move count
					position_block(3,value,ui); //position the block
					}
				}else{
					//otherwise it's dropped on 2nd tower
					//check for illegal move
					if ( value >= t_two[t_two.length-1]){
						cancel_move();
					}else{
						//came from 1st tower
						if ($(ui.draggable).hasClass('one')){
							$(ui.draggable).removeClass('one');
							t_one.pop();
							$(ui.draggable).addClass('two');
							t_two.push(value);
						}else{
							//came from 3rd tower
							if ($(ui.draggable).hasClass('three')){
								$(ui.draggable).removeClass('three');
								t_three.pop();
								$(ui.draggable).addClass('two');
								t_two.push(value);
							}
						}
					increment_count(); //increment move count
					position_block(2,value,ui); //position the block
					}
				}
			}
		check_win(); //check if user has won
		drag_set(); //reset draggable blocks
		}
	});
});