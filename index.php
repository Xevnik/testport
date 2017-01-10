<?php
/**
 * Created by PhpStorm.
 * User: kevin
 * Date: 1/10/17
 * Time: 12:35 PM
 */
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>See Kevin code</title>
    <meta name="author" content="Kevin Chau">
    <meta name="description" content="Wecome to Kevin Chau's portfolio where you can see what I am all about and some of the work I have worked on.">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <style>
        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
    </style>
    <script>
        var browserWidth, browserHeight = null;
        function jqUpdateSize(){
            // Get the dimensions of the viewport
            browserWidth = $(window).width();
            browserHeight = $(window).height();

//            $('#jqWidth').html(width);      // Display the width
//            $('#jqHeight').html(height);    // Display the height
        }

        $(document).ready(jqUpdateSize);    // When the page first loads
        $(window).resize(jqUpdateSize);     // When the browser changes size
    </script>
</head>
<body>
    <div id="landing"></div>
</body>
</html>
