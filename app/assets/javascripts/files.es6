// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$(document).on("turbolinks:load", function() {
		var attr_arr = [];
		var index_arr = [];
		var file_id = $(".js-chart-container").data("id");
		
		$('.js-form-control').on('change', function(event) {
			event.preventDefault(); 
			var patient_id = $("select option:selected").data("id");
            $.ajax({
                    url: `/api/files/${file_id}`,
                    type: 'POST',
                    data: {basic_patient_id: patient_id}
                });

		});
		$('.js-option').on('click', function(event) {
			event.preventDefault(); 
			var val = $(event.currentTarget).data("value");
			var attr = $(event.currentTarget).data("attr-name");
			var index = $(event.currentTarget).data("index");

			attr_arr[parseInt(index)] = attr;
			index_arr[parseInt(index)] = val;

            $.ajax({
                    url: `/api/files/${file_id}`,
                    type: 'POST',
                    data: { basic_attr: attr_arr,
                     basic_index: index_arr}
                });
		});
});

