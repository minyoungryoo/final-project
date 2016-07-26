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
	var theChart;

	function visualize_data(response, num_id){
		console.log(response);
		console.log(response.length);
		console.log(num_id);

		

        // var num = document.getElementsByClassName("searchType");
        // console.log(num);

        response_label.push(response[num_id]);
    
	    data_arr.push(Math.round(Math.random() * response_label.length));


   //      if (document.getElementsByClassName('searchType').checked) {
			// var num = document.getElementsByClassName("searchType")[0].value;
   //          response_label.push(response[num]);
   //      }; 
		// for (var i=0; i<response_label.length; i++) {
		//     data_arr.push(Math.round(Math.random() * response_label.length))
		// }

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
			            // backgroundColor: [
			            //     'rgba(255, 99, 132, 0.2)',
			            //     'rgba(54, 162, 235, 0.2)',
			            //     'rgba(255, 206, 86, 0.2)',
			            //     'rgba(75, 192, 192, 0.2)',
			            //     'rgba(153, 102, 255, 0.2)',
			            //     'rgba(255, 159, 64, 0.2)'
			            // ],
			            // borderColor: [
			            //     'rgba(255,99,132,1)',
			            //     'rgba(54, 162, 235, 1)',
			            //     'rgba(255, 206, 86, 1)',
			            //     'rgba(75, 192, 192, 1)',
			            //     'rgba(153, 102, 255, 1)',
			            //     'rgba(255, 159, 64, 1)'
			            // ],
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


