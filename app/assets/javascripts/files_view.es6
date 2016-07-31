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
		var myPiechart = new Chart(ctx, {
		    type: 'doughnut',
		    data: data,
		    options: {
		    	maintainAspectRatio: false,
		    	 	responsive: true,
			    legend: {
			      display: false
			    }
		    }
		});

		Chart.pluginService.register({
		  beforeDraw: function(chart) {
			if(chart.chart.canvas.id == "myPieChart"){
			    var width = chart.chart.width,
			        height = chart.chart.height,
			        ctx = chart.chart.ctx;

			    ctx.restore();
			    var fontSize = (height / 114).toFixed(2);
			    ctx.font = fontSize + "em sans-serif";
			    ctx.textBaseline = "middle";

			    var text = "75%",
			        textX = Math.round((width - ctx.measureText(text).width) / 2),
			        textY = height / 2;

			    ctx.fillText(text, textX, textY);
			    ctx.save();
			}
		  }
		});

	};

	if ($('.js-chart-container').length > 0) {

		var file_id = $(".js-chart-container").data("id");

		$.ajax({
			type: "GET",
			url: `/api/files/${file_id}`,
			success: initialize_data
		});

		function initialize_data(response){
		var content = "";
		var content_label = ["Varying Dosages of Hep/Asp", "Heparin", "Aspirin", "Followup to treatment", "Subcutaneous Heparin", 
		"Antiplatelet Drug", "Intravenous Heparin", "Other Anticoagulants", "Calcium Antagonists", "Glycerol or manitol", "Steroids", 
		"Haemodilution", "Carotid Surgery", "Thrombolysis", "Medication Taken at 6-months Followup"];

// 16-18, 38-49
		console.log(content_label[1]);

		for(var i=0; i<=14; i++){
			if (i<=2){
			content += `<input type="checkbox" class="searchType" name=${content_label[i]} data-id=${i+16}>${content_label[i]}`;
			}else{
			content += `<input type="checkbox" class="searchType" name=${content_label[i]} data-id=${i+35}>${content_label[i]}`;
			};
		};

		$('.check_list').html(content)

		var num_id_col = [];
		$('.searchType').click(function(event) {
			var file_id = $(".js-chart-container").data("id");
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

		updateChart();
		medical_data();
	}


	function updateChart () {
		// Recreate the entire chart because BarError sucks and doesn't update
		var id = $('.js-chart-container').data("id");
		$('.js-chart-container').html(`<canvas id="myChart" data-id="${id}" width="300" height="200"></canvas>`);

		var ctx = document.getElementById("myChart");

		var randomScalingFactor = function() {
		    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
		};


		theChart = new Chart(ctx, {
            type: 'barError',
		    data: {
		        labels: response_label,
		        datasets: [{
		            label: '# of Occurances',
		            data: data_arr,
		            error: error_arr,
		            errorDir : "both",
		            errorStrokeWidth : 1,
		            errorCapWidth : 0.75,
		            errorColor: "black",
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
		                    beginAtZero:true,
                            max: 7,
		                    min: 0,
		                    stepSize: 0.5
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
	    console.log(activeElement[0]._index);

	    // <button type="button" data-toggle="modal" data-target="#myModal"></button>
	}

	function medical_data() {
		var id = $('.js-med-chart-container').data("id");
		$('.js-med-chart-container').html(`<canvas id="myMedChart" data-id="${id}" width="300" height="200"></canvas>`);

		var ctx = document.getElementById("myMedChart");

		// var randomScalingFactor = function() {
		//     return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
		// };


		theChart = new Chart(ctx, {
            type: 'barError',
		    data: {
		        labels: response_label,
		        datasets: [{
		            label: '# of Occurances',
		            data: data_arr,
		            error: error_arr,
		            errorDir : "both",
		            errorStrokeWidth : 1,
		            errorCapWidth : 0.75,
		            errorColor: "black",
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
		                    beginAtZero:true,
                            max: 7,
		                    min: 0,
		                    stepSize: 0.5
		                }
		            }]
		        },
				onClick: handleClick
		    }
		});	




	}
});



