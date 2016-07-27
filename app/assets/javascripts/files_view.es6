// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on("turbolinks:load", function() {

	if ($('#myChart').length > 0) {

		var file_id = $("#myChart").data("id");

		$.ajax({
			type: "GET",
			url: `/api/files/${file_id}`,
			success: initialize_data
		});

		function initialize_data(response){
			console.log(response);
		var content = "";

		for(var i=0; i<response.length; i++){
			content += `<input type="checkbox" class="searchType" name=${response[i]} data-id=${i}>${response[i]}`;
		};

		$('.check_list').html(content)

		$('.searchType').click(function(event) {
			var file_id = $("#myChart").data("id");
			var num_id = $(event.currentTarget).data("id");
			$.ajax({
				type: "GET",
				url: `/api/files/${file_id}`,
				success: function(response){
					visualize_data(response, num_id); 
				}
			});
		 });
	
		}	


	}
	

	var data_arr = [];
	var response_label = [];
	var color_arr = [];
	var theChart;

	function visualize_data(response, num_id){
		console.log(response);
		console.log(response.length);
		console.log(num_id);

        response_label.push(response[num_id]);
    
	    data_arr.push(Math.round(Math.random() * response_label.length));

	    color_arr.push('rgba(255, 99, 132, 0.2)');


		console.log(data_arr);
		console.log(response_label);

		updateChart();
	}


	function updateChart () {
		if (theChart) {
			theChart.update();
		}

		else {
			var ctx = document.getElementById("myChart");
			theChart = new Chart(ctx, {
			    type: 'bar',
			    data: {
			        labels: response_label,
			        datasets: [{
			            label: '# of Occurances',
			            data: data_arr,
			            backgroundColor: color_arr,
			            borderColor: color_arr,
			            borderWidth: 1
			        }]
			    },
			    options: {
			        scales: {
			            yAxes: [{
			                ticks: {
			                    beginAtZero:true
			                }
			            }]
			        }
			    }
			});
		}
	}
});


