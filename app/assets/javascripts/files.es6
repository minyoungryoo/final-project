// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$(document).on("turbolinks:load", function() {
		// var basic_num_id_col = [];
		$('.js-option').on('click', function(event) {
			event.preventDefault(); 
			var val = $(event.currentTarget).data("value");
			var attr = $(event.currentTarget).data("attr-name");
			var index = $(event.currentTarget).data("index");
			console.log( val);
			console.log( attr);
			console.log( index);
			// basic_num_id_col.push(response_info);
   //          $.ajax({
   //                  url: '/users/:id/patient_profile/:patient_id',
   //                  type: 'GET',
   //                  data: { basic_num_id: basic_num_id_col },
   //                  success: function () {

   //                  }
   //              });
		});
});

