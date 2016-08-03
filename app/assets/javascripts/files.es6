// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$(document).on("turbolinks:load", function() {
		var attr_arr = [];
		var index_arr = [];
		var diag_desc = [];

		// var file_id = $(".js-chart-container").data("id");
		var file_id = 3;


		var user_id = $();
		
		$('.js-form-control').on('change', function(event) {
			event.preventDefault(); 
			var patient_id = $("select option:selected").data("id");

		   $.ajax({
                    url: `/users/${user_id}/patient_profile/${patient_id}`,
                    type: 'GET',
                    data: {select_patient_id: patient_id}
                });


		});
		$('.js-option').on('click', function(event) {
			event.preventDefault(); 
			var val = $(event.currentTarget).data("value");
			var attr = $(event.currentTarget).data("attr-name");
			var index = $(event.currentTarget).data("index");
			var desc_val = $(event.currentTarget).data("diag-desc");
			var patient_id = $(".selectpicker option:selected").data("id");

			attr_arr[parseInt(index)] = attr;
			index_arr[parseInt(index)] = val;
			diag_desc[parseInt(index)] = desc_val;

            $.ajax({
                    url: `/api/files/${file_id}`,
                    type: 'POST',
                    data: { basic_attr: attr_arr,
                     basic_index: index_arr,
                     basic_diag_desc: diag_desc,
                     basic_patient_id: patient_id
                 	}
                });

		});

	$(".dropdown-content a").click(function(){
	  $(this).parents(".dropdown").find('.dropbtn').html($(this).text() + ' <span class="caret"></span>');
	  $(this).parents(".dropdown").find('.dropbtn').css("background-color","#88B847");
	});


});

