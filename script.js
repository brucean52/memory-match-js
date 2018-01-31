var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

$(document).ready(initializeApp);


function onLoad() {
    games_played = 0;
    display_stats();
    randomizeCards();
}

function randomizeCards() {
    var arrSrc = ["assets/images/capamerica.svg", "assets/images/deadpool.svg", "assets/images/deathstroke.svg", "assets/images/drdoom.svg", "assets/images/flash.svg", "assets/images/redskull.svg", "assets/images/spawn.svg", "assets/images/thanos.svg", "assets/images/thing.svg", "assets/images/capamerica.svg", "assets/images/deadpool.svg", "assets/images/deathstroke.svg", "assets/images/drdoom.svg", "assets/images/flash.svg", "assets/images/redskull.svg", "assets/images/spawn.svg", "assets/images/thanos.svg", "assets/images/thing.svg"];

    var j = arrSrc.length;
    var $frontId = '';
    
    while (--j) {
        var k = Math.floor(Math.random() * (j + 1));
        var tempj = arrSrc[j];
        var tempk = arrSrc[k];
        arrSrc[j] = tempk;
        arrSrc[k] = tempj;
    }

    for (var i = 1; i < 19; i++) {
        $frontId = '.front#' + i + " img";
        $($frontId).attr('src', arrSrc[i - 1]);
    }

}

function initializeApp() {
    $('.card').on('click', function (event) {
        card_clicked(this, event);
    });

    $('#imgReset, #reset').on('click', reset_stats);
    $('.modalReset').on('click', reset_stats);
}

function card_clicked(elem, event) {

    if (first_card_clicked === null) {
        //assign first card clicked to the html DOM element that was clicked
        $(elem).addClass('flipped');
        first_card_clicked = elem;

    } else if (first_card_clicked === elem) {
        //do nothing when first card is clicked again
    } else if (first_card_clicked != null && second_card_clicked === null) {
        //second card
        $(elem).addClass('flipped');
        second_card_clicked = elem;
        attempts++;

        if ($(first_card_clicked).find('.front img').attr('src') == $(second_card_clicked).find('.front img').attr('src')) {
            //check if cards match

            matches++;
            popImg(event);
            $('.popImg').fadeOut(2000, 'swing');
            setTimeout(matched, 1500);

            if (matches == total_possible_matches) {
                //game is over
                game_finish();
                games_played++;
                display_stats;
            }

        } else {
            //pick again
            setTimeout(pick_again, 1500);
        }
    }

}

function game_finish() {
    $('#myModal').modal('show');
}

function popImg(event) {

    var mouseX = event.clientX - 150;
    var mouseY = event.clientY - 120;
    var leftPx = mouseX + 'px';
    var topPx = mouseY + 'px';
    var popArray = ["/assets/images/cool.svg", "/assets/images/bam.svg", "/assets/images/boom.svg", "/assets/images/pow.svg"];
    var popArrIndex = Math.floor((Math.random() * 4));
    $('body').append($("<img class='popImg'>").attr("src", popArray[popArrIndex]));
    $('.popImg').css('left', leftPx);
    $('.popImg').css('top', topPx);

}

function pick_again() {
    $('.card.flipped').removeClass('flipped');
    first_card_clicked = null;
    second_card_clicked = null;
    display_stats();
}

function matched() {
    console.log("Matches: " + matches);
    first_card_clicked = null;
    second_card_clicked = null;
    $('.card.flipped').addClass('matched');
    display_stats();
}


function display_stats() {
    if (attempts === 0) {
        //do not display percentage when NaN
    } else {
        accuracy = (matches / attempts) * 100;
        if (accuracy < 10 && accuracy > 0) {
            //progress bar = red
            $('.progress-bar').css('background-color', '#CC0000');
            accuracy = Math.trunc(accuracy) + '%';
            $('.progress-bar').css('width', accuracy);
            $('#accuracyVal').text(accuracy);
        } else if (accuracy >= 10) {
            //progress bar = green
            $('.progress-bar').css('background-color', '#00CC00');
            accuracy = Math.trunc(accuracy) + '%';
            $('.progress-bar').css('width', accuracy);
            $('#accuracyVal').text(accuracy);
        } else if (accuracy === 0) {
            //no progress text when 0
            $('#accuracyVal').text('');
        }

    }

    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
}

function reset_stats() {
    games_played++;
    accuracy = 0;
    attempts = 0;
    matches = 0;
    $('.progress-bar').css('width', accuracy);
    $('.progress-bar-value').text('');
    display_stats();
    randomizeCards();
    $('.card.matched').removeClass('matched');
    $('.card.flipped').removeClass('flipped');
}

