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

		for(var i=0; i<response[1].length; i++){
			content += `<input type="checkbox" class="searchType" name=${response[1][i]} value=${i}>${response[1][i]}`;
		};

		$('.check_list').html(content)
	}	

		$('.searchType').click(function() {
			console.log("lalala")
			var file_id = $("#myChart").data("id");

			$.ajax({
				type: "GET",
				url: `/api/files/${file_id}`,
				success: visualize_data
			});
		 });

	}
	

	function visualize_data(response){
		console.log("Lalala")
		console.log(response[1])
		console.log(response[1].length)

		function checkbox_check() {
			var response_label = [];
	        if (document.getElementsByClassName('check_list').checked) {
				var num = document.getElementsByClassName("check_list")[0].value;
	            response_label.push(response[1][num]);
	        }; 
	    }


		var data_arr = [];
		for (var i=0; i<response_label.length; i++) {
		    data_arr.push(Math.round(Math.random() * response_label.length))
		}



		var ctx = document.getElementById("myChart");
		var myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        labels: response_label,
		        datasets: [{
		            label: '# of Votes',
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
});