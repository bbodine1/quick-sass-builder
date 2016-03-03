$( document ).ready(function() {
    console.log( "ready!" );

    $('.go').on('click', function(){
    	event.preventDefault();

		    var string = "The Denver Broncos are an American football team based in Denver, Colorado. The Broncos compete in the National Football League as a member club of the league's American Football Conference West division. The Broncos began play in 1960 as a charter member of the American Football League and joined the NFL as part of the merger in 1970. The Broncos are owned by the Pat Bowlen trust. The Broncos have played at Sports Authority Field at Mile High since 2001, after previously playing at Mile High Stadium from 1960 to 2000.";
		    var q = jQuery.map(string.split(' '), function (word) {
		        return $('<span>' + ' ' + word + ' ' + '</span>');
		    });

		    var dest = $('.word');

		    var c = 0;
		    var i = setInterval(function () {
		        q[c].appendTo(dest).hide().fadeIn(200);
		        q[c].appendTo(dest).show().fadeOut(150);
		        c += 1;
		        if (c >= q.length) clearInterval(i);
		    }, 500);

	});


});