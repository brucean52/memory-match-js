var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

function display_stats(){
    $('.games-played .value').text(games_played);
    $('.accuracy .value').text(accuracy);
    $('.attempts .value').text(attempts);
}

function reset_stats(){
    accuracy = 0;
    attempts = 0;
    matches = 0;
    display_stats();
    //reset all cards to back face showing
}

function onLoad(){
    games_played = 0;
}

$(document).ready(initializeApp);

function initializeApp() {
    $('.card').on('click', card_clicked);
}

function card_clicked() {
    console.log("clicked card");

    if (first_card_clicked === null) {
        $(this).addClass('flipped');
        first_card_clicked = this;
        console.log("first card clicked: ");
        //assign first card clicked to the html DOM element that was clicked
    } else {
        //second card
        $(this).addClass('flipped');
        second_card_clicked = this;
        console.log("second card clicked");
        attempts++;
        console.log("Attempts: "+attempts);

        //clean this up
        if ($(first_card_clicked).find('.front img').attr('src') == $(second_card_clicked).find('.front img').attr('src')) {
            //cards matched
            setTimeout(matched, 2000);

            if (match_counter == total_possible_matches) {
                //game is over
                console.log('game is won!');
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
    console.log('first card: ' + first_card_clicked);
}

function matched() {
    match_counter++;
    matches++;
    console.log("Matches: " +matches);
    first_card_clicked = null;
    $('.card.flipped').addClass('matched');

}
