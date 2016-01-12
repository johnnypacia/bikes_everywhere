$(document).ready(function() {

 
    $('#calendar').fullCalendar({
        events: '/events',

        eventClick: function(event) {
        	$(".event-details").removeClass("hidden");
        }
    })



    var renderEvents = function(events){
    	console.log(events);
    }

   	var getEvents = function(event){
   		$.ajax({
    		url: "/events",
    		datatype: "json",
			type: "GET"
 		}).done(renderEvents);

   	}

   	getEvents();

});