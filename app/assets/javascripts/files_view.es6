// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$(document).on("turbolinks:load", function() {

	if ($('#myPieChart').length > 0) {
				var data = {
		    labels: [
		        "Red",
		        "Blue",
		        "Yellow"
		    ],
		    datasets: [
		        {
		            data: [300, 50, 100],
		            backgroundColor: [
		                "#FF6384",
		                "#36A2EB",
		                "#FFCE56"
		            ],
		            hoverBackgroundColor: [
		                "#FF6384",
		                "#36A2EB",
		                "#FFCE56"
		            ]
		        }]
		};

		var ctx = document.getElementById("myPieChart");
		var myDoughnutChart = new Chart(ctx, {
		    type: 'doughnut',
		    data: data
		    // options: options
		});
	};

	if ($('#myChart').length > 0) {

		var file_id = $("#myChart").data("id");

		$.ajax({
			type: "GET",
			url: `/api/files/${file_id}`,
			success: initialize_data
		});

		function initialize_data(response){
		var content = "";

		for(var i=0; i<response.length; i++){
			content += `<input type="checkbox" class="searchType" name=${response[i]} data-id=${i}>${response[i]}`;
		};

		$('.check_list').html(content)

		var num_id_col = [];
		$('.searchType').click(function(event) {
			var file_id = $("#myChart").data("id");
			var num_id = $(event.currentTarget).data("id");
			num_id_col.push(num_id);
			$.ajax({
				type: "GET",
				data: {num_id: num_id_col},
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
	var error_arr = [];

	function visualize_data(response, num_id){

        response_label.push(response[num_id]);
        var rand_num = Math.round(Math.random() * response_label.length);
	    data_arr.push(rand_num);
	    color_arr.push('rgba(255, 99, 132, 0.2)');
	    error_arr.push(rand_num*0.1);

	    console.log(error_arr);
	    console.log(data_arr);

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
			            error: error_arr,
			            errorDir : "both",
			            errorStrokeWidth : 1,
			            errorCapWidth : 0.75,
			            // errorColor: "rgba(220, 220, 220, 1)",
			            backgroundColor: color_arr,
			            borderColor: color_arr,
			            borderWidth: 1
			        }]
			    },
			    options: {
			    	        title: {
				            display: true,
				            text: 'Title of this graph'
					        },
			        scales: {
			            yAxes: [{
			                ticks: {
			                    beginAtZero:true
			                }
			            }]
			        },
					onClick: handleClick
			    }
			});
		}
		
		function handleClick(evt)
		{
		    var activeElement = theChart.getElementAtEvent(evt);
		    console.log(activeElement);
		}
	}
});



