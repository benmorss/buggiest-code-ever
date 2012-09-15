<?php

$TWITTER_API_URL = 'http://api.twitter.com/1/statuses/user_timeline.json';

if (!($user = $_GET['screen_name'])) {
    echo "Hey, buddy.  Pass me a screen name!";
    exit(1);
}

foreach ($_GET as $key => $val) {
    $params[] = "$key=$val";
}

$paramsString = implode('&', $params);
echo file_get_contents("$TWITTER_API_URL?$paramsString");

?>