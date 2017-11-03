var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;

var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

function display_stats() {
    if(attempts === 0) {
        accuracy = '0%';
    } else {
        accuracy = (matches / attempts) * 100;
        accuracy = Math.trunc(accuracy) + '%';
    }
    
    $('.games-played .value').text(games_played);
    $('.accuracy .value').text(accuracy);
    $('.attempts .value').text(attempts);
}

function reset_stats() {
    accuracy = 0;
    attempts = 0;
    matches = 0;
    display_stats();
    randomizeCards();
    $('.card.matched').removeClass('matched');
    $('.card.flipped').removeClass('flipped');
    //$('.card.flipped').removeClass('matched');
    //reset all cards to back face showing
}

function onLoad() {
    games_played = 0;
    display_stats();
    randomizeCards();
}

function randomizeCards(){
    var arrSrc = ["images/capamerica.svg","images/deadpool.svg","images/deathstroke.svg","images/drdoom.svg","images/flash.svg","images/redskull.svg","images/spawn.svg","images/thanos.svg","images/thing.svg","images/capamerica.svg","images/deadpool.svg","images/deathstroke.svg","images/drdoom.svg","images/flash.svg","images/redskull.svg","images/spawn.svg","images/thanos.svg","images/thing.svg"];
    
    var j = arrSrc.length;
    //if(j ==0) return false;
    while(--j){
        var k = Math.floor(Math.random()*(j+1));
        var tempj = arrSrc[j];
        var tempk = arrSrc[k];
        arrSrc[j] = tempk;
        arrSrc[k] = tempj;
    }
    
    console.log(arrSrc);
    
    //for(var j=0; j<arrSrc.length-1; j++)
    
    //arrId = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    var $frontId = '';
    for(var i=1; i<19; i++) {
        $frontId = '.front#'+i+ " img";
        console.log(arrSrc[i-1]);
        $($frontId).attr('src',arrSrc[i-1]);
        //console.log($($frontId).attr('src',arrSrc[i-1]));
    }
    
    
    //
    
}

$(document).ready(initializeApp);

function initializeApp() {
    //$('.card').on('click', card_clicked);
    $('.card').on('click', function () {
        card_clicked(this);
    });

    $('.reset').on('click', reset_stats);
}

function card_clicked(elem) {
    console.log("clicked card");

    if (first_card_clicked === null) {
        $(elem).addClass('flipped');
        first_card_clicked = elem;
        console.log("first card clicked: ");
        //assign first card clicked to the html DOM element that was clicked
    } else if (first_card_clicked != null && second_card_clicked != null) {
        //do nothing
        console.log('do nothing');
    } else if(first_card_clicked === elem){
              //do nothing
        console.log('do nada, clicked the same card');
              }
    else if (first_card_clicked != null && second_card_clicked === null) {

        //second card
        $(elem).addClass('flipped');
        second_card_clicked = elem;
        console.log("second card clicked");
        attempts++;
        console.log("Attempts: " + attempts);

        //clean this up
        if ($(first_card_clicked).find('.front img').attr('src') == $(second_card_clicked).find('.front img').attr('src')) {
            //cards matched
            setTimeout(matched, 2000);

            if (match_counter == total_possible_matches) {
                //game is over
                console.log('game is won!');
                games_played++;
                display_stats;
            }


        } else {
            //pop up text here
            //pick again
            setTimeout(pick_again, 2000);
        }
    }

    

}

function pick_again() {
    console.log('pick again');
    $('.card.flipped').removeClass('flipped');
    first_card_clicked = null;
    second_card_clicked = null;
    console.log('first card: ' + first_card_clicked);
    display_stats();
}

function matched() {
    match_counter++;
    matches++;
    console.log("Matches: " + matches);
    first_card_clicked = null;
    second_card_clicked = null;
    $('.card.flipped').addClass('matched');
    display_stats();
}
