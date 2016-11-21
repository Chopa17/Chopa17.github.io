$(document).ready(function(){
	//add js-enabled class to all detailed chunks
	$('.detailed').addClass('js-enabled');
	//code to show details when clicking titles
	var show = function(page,n,clicked){
		var selector = '#'+page+' .detailed';
		if($(selector).eq(n).css('display') === 'none'){
			$('.detailed').eq(n).show(300);
			$(clicked).addClass('clicked');
		}else{
			$(selector).eq(n).hide(300);
			$(clicked).removeClass('clicked');
		}
	}
	$('#education #university').click(function(){show('education',0,this);});
	$('#education #alevel').click(function(){show('education',1,this);});
	$('#education #gcse').click(function(){show('education',2,this);});
	$('#skills #computing').click(function(){show('skills',0,this);});
	$('#skills #creativity').click(function(){show('skills',1,this);});
	$('#skills #programming').click(function(){show('skills',2,this);});
	$('#skills #teamwork').click(function(){show('skills',3,this);});
	$('#skills #writing').click(function(){show('skills',4,this);});
	$('#personal #game').click(function(){show('personal',0,this);});
	$('#personal #sports').click(function(){show('personal',1,this);});
	$('#personal #art').click(function(){show('personal',2,this);});
	$('#personal #photo').click(function(){show('personal',3,this);});
});