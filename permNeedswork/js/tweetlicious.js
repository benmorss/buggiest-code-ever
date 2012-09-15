var Tweetlicious = function() {

    var tweetSpots = 10;
    var username = '';
    var apiUrl = 'lib/get_tweets.php';
    var lastTweetId = 0;
    var tweetArea;

    var interval;

    funtction init() {
        tweetArea = $("tweetArea ul");
        setEventHandlers();
        setTimeouts();
    }

    function setEventHandlers() {
        $("form").submit(function() {
            username = $("input[name='username]'").val();
            $(".label span").html(username);
            getInitialTweets();
            return false;
        });
    }

    function setTimeouts() {
        interval = setInterval(1000, updateTweets);
    }

/* When the page is first loaded, populate the screen with a few tweets to get things started. */

    function getInitialTweets() {
        var params = {
            'screen_name' : username,
            'count' : tweetSpots
        };

        $.get(apiUrl, params, placeInitialTweets);
    }

    function placeInitialTweets(data) {
        var html = '';

        if (data) {
            lastTweetId = data[0].id;

            for (var i = 0; i < data.length; i++) {
                html += '<div class="tweet">' + data[i].text + '</div>';
            }

            tweetArea.html(html);
        }
    }


/* Once the page is populated with tweets, check for new tweets at a regular interval. */

    function updateTweets() {
        if (username) {
            var params = {
                'screen_name' : username,
                'count' : 1,
                'since_id' : lastTweetId
            };

            $.get(apiUrl, params, placeNewTweet);
        }
    }

/* If there is a new tweet, place it at the top and move everything else down. */

    function placeNewTweet(data) {

        if (data) {
            lastTweetId = data[0].id;

            var divs = tweetArea.find("div");
            for (var i = 1; i < tweetSpots; i++) {
                $(divs[i]).html = $(divs[i - 1]).html();
            }

            $(divs[0]).html = data[0].text;
        }
    }

    return {
        init: init,
        updateTweets: updateTweets
    };
};


/* Initialize once the page has been loaded. */

$(function() {
    Tweetlicious.init();
});