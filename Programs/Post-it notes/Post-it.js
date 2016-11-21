//javascript for post-it notes by Sam Brind//

//global variables to store current post it z-index
var z_index = 3;

//function to change stationary to type
var change_stationary = function(type){
	$('.shadow').removeClass('shadow'); //remove the current shadow
	$('#'+type).addClass('shadow'); //add shadow to selected stationary
	$('.stack.top').removeClass('pen pencil redpen marker'); //remove all stationary classes
	$('.stack.top').addClass(type); //add type class
}

//function to bring a post-it note to the front
move_front = function(target){
	//loop through all post-it notes
	$('.post-it').each(function() {
		//check if z-axis is above selected post-it
		if(Number($(this).css('z-index'))>Number($(target).css('z-index'))){
			//decrease z-index by 1
			$(this).css('z-index',String(Number($(this).css('z-index'))-1));
		}
	});
	//set this post-it note as max z-axis
	$(target).css('z-index',z_index-1);
}

//when the document is ready
$(document).ready(function(){
	//attach clicks to colour palette
	$('.colour').click(function(){
		$('.stack').removeClass('yellow orange pink blue'); //remove current colour class
		//add button clicked colour
		if($(this).hasClass('yellow')){return $('.stack').addClass('yellow');}
		if($(this).hasClass('orange')){return $('.stack').addClass('orange');}
		if($(this).hasClass('pink')){return $('.stack').addClass('pink');}
		if($(this).hasClass('blue')){return $('.stack').addClass('blue');}
	});
	//attach click functions to stationary
	$('#pen').click(function(){
		change_stationary('pen');
	});
	$('#pencil').click(function(){
		change_stationary('pencil');
	});
	$('#redpen').click(function(){
		change_stationary('redpen');
	});
	$('#marker').click(function(){
		change_stationary('marker');
	});
	$('#eraser').click(function(){
		$('.stack.top').html('');
	});
	//attach key press function to enter key within stack
	$('.stack.top').keydown(function(e) {
		if (e.keyCode === 13) {
      			// insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
      			document.execCommand('insertHTML', false, '<br><br>');
      			// prevent the default behaviour of return key pressed
      			return false;
   		 }
  	});
	//attach hover functions to arrow
	$('#arrow').mouseenter(function(){
		$('.stack.top').addClass('peeled',400); //'peel' the top of stack
	});
	$('#arrow').mouseleave(function(){
		$('.stack.top').removeClass('peeled',400); //'flatten' the top of stack
	});
	//attach click function to arrow
	$('#arrow').click(function(){
		//clone top of stack and conver to post-it
		var post = $('.stack.top').clone().removeClass('stack top').addClass('post-it');
		post.prop('contenteditable',false);
		//add post-it to the noticeboard
		$('#board').append(post);
		//add draggable to post-it
		post.draggable({
			start: function(event,ui){
				//call function to move post-it to front
				move_front(this);
			}
		});
		//add a click function to post it
		post.click(function(){
			//call function to move post-it to front
			move_front(this);
		});
		//set the out of bounds region
		var x_edge = $('#right').offset().left - Number($('.post-it').css('width').replace('px',''));
		var y_edge = Number($('#board').css('height').replace('px','')) - Number($('.stack').css('height').replace('px',''));
		var out_bounds = [0,0,x_edge,y_edge];
		post.draggable( "option", "containment", out_bounds );
		//add z-index and iterate z-index variable
		post.css('z-index',z_index)
		z_index++;
		//setTimeout(function(){
			post.removeClass('peeled');
			post.addClass('flat'); 
		//}, 410);
		//reset stack
		$('.stack.top').html('');
	});
	//attach drop function to bin
	$('#bin').droppable({
	//animate height reduction
		drop: function(event, ui){
			$(ui.draggable).addClass('bin',500); //animate binning it
			setTimeout(function(){ $(ui.draggable).remove(); }, 400); //delete the post-it after animation
		}
	});
	//default start with pen
	$('#pen').click();
	//set post-it note border
	var border = $('.stack').css('border-top-width');
	//alert(border);
	//size post-it and stack
	$('.stack').css('border-top-width',border);
	$('.post-it').css('border-top-width',border);
	//focus on stack
	$('.stack.top').focus();
});
