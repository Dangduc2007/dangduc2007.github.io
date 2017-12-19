var card=['1','2','3','4','5','6','7','8','9'];
var current=null;
var count=0;
var time=50;
var sound_gameover=document.getElementById('gameover')
var sound_bg = document.getElementById('background');
var sound_start = document.getElementById('soundstart');
var sound_win = document.getElementById('winner');
var sound_correct = document.getElementById('correct');
var sound_incorrect=document.getElementById('incorrect');
var sound_flip = document.getElementById('flipcard');
function shuffle (array) {
    var currentIndex = array.length, temporaryValue, randomIndex
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array;
}
function flip(card){
	 //$('#progress').val(time);
	 $(card).css('pointer-events', 'none')
	 $(card).toggleClass('flipped');
	 if(!current){
	 	current=$(card);
	 	sound_flip.play()
	 	//sound_flip.volume = 2;
	 }
	 else{
	 	$(card).css('pointer-events', 'none')
	 	sound_flip.play();

	 	if(current.attr('data-name')!=$(card).attr('data-name')){

	 		setTimeout(function(){
	 		current.toggleClass('flipped');
	 		$(card).toggleClass('flipped');
	 		current=null;
	 		 $('.card').css('pointer-events', 'auto')
	 		 sound_incorrect.play();
	 	},400);

	 	}
	 	else
	 	{
	 		setTimeout(function(){
	 		sound_correct.play();
	 		$(card).css('opacity','0');
	 		current.css('opacity','0');
			current=null;
			$('.card').css('pointer-events', 'auto')
			count++;
			if(count==card.length/2)
				clearInterval(run);

	 		},300);
	 		

	 	}

}
}
function start(){
	card=card.concat(card);
	card=shuffle(card);
	$('#start').fadeOut();
	$('#progress').show();
	$('#notification').hide();
	sound_bg.play();
	sound_bg.volume = 0.2;
	sound_start.pause();
	var html='';
	for(var i=0;i<card.length;i++){
		html+='<div class="card" data-name="' + card[i] + '" onclick="flip(this)">' +
		    '<img class="font" src="img/back.jpg"/>' +
            '<img class="back" src="img/' + card[i] + '.jpg"/>' + '</div>'
	}
	$('.content').html(html);
	$('#progress').val(time);
	var run=setInterval(function(){
		time--;
		 $('#progress').val(time);

		if(time==0){
			clearInterval(run);
			lose();
			$('#start').fadeIn();

		}
		else if(count==card.length/2){
			clearInterval(run);
			winner();
			$('#start').fadeIn();
		}
	},1000)
}
function lose(){
	$('#notification').show();
	sound_gameover.play();
	$('.messenger').css('background-image', 'url("img/lose1.jpg")');
	$('.title').css('display', 'none');
	$('.messenger').find('button').text('Replay');
    $('.messenger').find('button').click(function() {
        location.reload();
    });
    sound_bg.pause();

}
function winner() {
    $('#notification').show();
    $('.messenger').css('background-image', 'url("img/wingame.jpg")');
    $('.messenger').find('h1').text('');
    $('.messenger').find('button').text('Replay');
    $('.messenger').find('button').click(function() {
       location.reload();
    });
    sound_bg.pause();
    sound_win.play();
}
$(function(){
	$('#progress').hide();
	 $('#start').fadeIn();
	 sound_start.play();
})