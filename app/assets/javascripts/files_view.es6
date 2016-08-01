// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$(document).on("turbolinks:load", function() {


		var data_arr = [];
		var response_label = [];
		var color_arr = [];
		var hovor_color_arr = [];

		// function financial_data(response, num_id){
		var content_label = ["Varying Dosages of Hep/Asp", "Heparin", "Aspirin", "Followup to treatment", "Subcutaneous Heparin", "Antiplatelet Drug", "Intravenous Heparin", "Other Anticoagulants", "Calcium Antagonists", "Glycerol or manitol", "Steroids", "Haemodilution", "Carotid Surgery", "Thrombolysis", "Medication Taken at 6-months Followup"];
		// var finan_data_arr = ["$500","$640", "$383", "$200", "$780", "$320", "$107", "$372", "$6000", "$3000", "$10", "$68", "$15000", "$55", "$200"];
		var finan_data_arr = ["500","640", "383", "200", "780", "320", "107", "372", "6000", "3000", "10", "68", "15000", "55", "200"];

		var sample_color = ["#BC41EF", "#BB61F3", "#802D7C", "#ECF38B", "#D676D1", "#2F1081", "#AA208A", "#FF6384", "#36A2EB", "#FFCE56", "#BC41EF", "red", "#AA208A", "#AA208A", "#AA208A"];

		response_label.push(content_label[2]);
		data_arr.push(finan_data_arr[2]);
		color_arr.push(sample_color[2]);

		console.log(content_label.length);
		console.log(finan_data_arr.length);
		console.log(sample_color.length);


	if ($('#myPieChart').length > 0) {
				var data = {
		    // labels: response_label,
		    // datasets: [
		    //     {
		    //         data: data_arr,
		    //         backgroundColor: color_arr,
		    //         hoverBackgroundColor: color_arr
		    //     }]
	    	    labels: content_label,
		    datasets: [
		        {
		            data: finan_data_arr,
		            backgroundColor: sample_color,
		            hoverBackgroundColor: sample_color
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
		var patient_id = $(".js-chart-container").data("patient-id");

		$.ajax({
			type: "GET",
			url: `/api/files/${file_id}`,
			data: {patient_id: patient_id},
			success: initialize_data
		});

		function initialize_data(response){
		var content = "";
		var content_label = ["Varying Dosages of Hep/Asp", "Heparin", "Aspirin", "Followup to treatment", "Subcutaneous Heparin", 
		"Antiplatelet Drug", "Intravenous Heparin", "Other Anticoagulants", "Calcium Antagonists", "Glycerol or manitol", "Steroids", 
		"Haemodilution", "Carotid Surgery", "Thrombolysis", "Medication Taken at 6-months Followup"];

// 16-18, 38-49

		for(var i=0; i<=14; i++){
			if (i<=2){
			content += `<input type="checkbox" data-patient-id=${patient_id} class="searchType" name=${content_label[i]} data-id=${i+16}>${content_label[i]}`;
			}else{
			content += `<input type="checkbox" data-patient-id=${patient_id} class="searchType" name=${content_label[i]} data-id=${i+35}>${content_label[i]}`;
			};
		};

		$('.check_list').html(content)

		var num_id_col = [];
		$('.searchType').click(function(event) {
			var file_id = $(".js-chart-container").data("id");
			var num_id = $(event.currentTarget).data("id");
			num_id_col.push(num_id);
			var patient_id = $(event.currentTarget).data("patient-id");
			$.ajax({
				type: "GET",
				data: {num_id: num_id_col,
					patient_id: patient_id},
				url: `/api/files/${file_id}`,
				success: function(response){
					visualize_data(response, num_id); 
				}
			});
		 });
	
		}	


	}
	

	// var data_arr = [];
	// var response_label = [];
	// var color_arr = [];
	// var error_arr = [];

	function visualize_data(response, num_id){

		// var data_array = response[1];
		// var error_array = response[2];
		// var arr_length = data_array.length;

     //    response_label.push(response[num_id]);
     //    var rand_num = Math.round(Math.random() * response_label.length);
	    // data_arr.push(rand_num);
	    // color_arr.push('rgba(255, 99, 132, 0.2)');
	    // error_arr.push(rand_num*0.1);

		// updateChart();
		medical_data(response);
	}


	// function updateChart () {
	// 	// Recreate the entire chart because BarError sucks and doesn't update
	// 	var id = $('.js-chart-container').data("id");
	// 	$('.js-chart-container').html(`<canvas id="myChart" data-id="${id}" width="100" height="100"></canvas>`);

	// 	var ctx = document.getElementById("myChart");

	// 	theChart = new Chart(ctx, {
 //            type: 'barError',
	// 	    data: {
	// 	        labels: response_label,
	// 	        datasets: [{
	// 	            label: '# of Occurances',
	// 	            data: data_arr,
	// 	            error: error_arr,
	// 	            errorDir : "both",
	// 	            errorStrokeWidth : 1,
	// 	            errorCapWidth : 0.75,
	// 	            errorColor: "black",
	// 	            backgroundColor: color_arr,
	// 	            borderColor: color_arr,
	// 	            borderWidth: 1
	// 	        }]
	// 	    },
	// 	    options: {
	// 	    	        title: {
	// 		            display: true,
	// 	            	maintainAspectRatio: false,
	// 		    	 	responsive: true,
	// 		            text: 'Title of this graph'
	// 			        },
	// 	        scales: {
	// 	            yAxes: [{
	// 	                ticks: {
	// 	                    beginAtZero:true,
 //                            max: 7,
	// 	                    min: 0,
	// 	                    stepSize: 0.5
	// 	                }
	// 	            }]
	// 	        },
	// 			onClick: handleClick
	// 	    }
	// 	});	
	// }


	function medical_data(response) {
		var theChart;
		var data_array = response[1];
		var error_array = response[2];
		var arr_length = data_array.length;

		// var data_array = [1,2,3];
		var data_label = ["Major Non-cerebral Hemorrhage", "Other Side Effect", "Recurrent Ischemic Stroke", "Recurrent hemorrhagic Stroke", "Recurrent unknown Stroke", "Pulmonary embolism", "Death", "Indicator for hemorrhagic stroke", "Indicator for ischemic stroke","Indicator for indeterminate stroke","Indicator for hemorrhagic transform","Indicator for pulmonary embolism","Indicator for deep vein thrombosis","Indicator for major non-cerebral bleed","Indicator for any stroke"];
		// 19-37 NOT THIS
		// 19-25, 30-37
		// var data_label = ["Side Effect A", "Side Effect B", "Most likely result" ]
		// var color_array = ['rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)','rgba(255, 99, 132, 0.2)'];
		// var error_array = [0.1, 0.2, 0.3];
		var color_array = Array(arr_length).fill('rgba(255, 99, 132, 0.2)')


		var id = $('.js-med-chart-container').data("id");
		$('.js-med-chart-container').html(`<canvas id="myMedChart" data-id="${id}" width="300" height="200"></canvas>`);

		var ctx = document.getElementById("myMedChart");

		theChart = new Chart(ctx, {
            type: 'barError',
		    data: {
		        labels: data_label,
		        datasets: [
			        {
			            label: '# of Occurances',
			            data: data_array,
			            error: error_array,
			            errorDir : "both",
			            errorStrokeWidth : 1,
			            errorCapWidth : 0.75,
			            errorColor: "black",
			            backgroundColor: color_array,
			            borderColor: color_array,
			            borderWidth: 1
			        },
			        {
			            label: '# of Occurances',
			            data: data_array,
			            error: error_array,
			            errorDir : "both",
			            errorStrokeWidth : 1,
			            errorCapWidth : 0.75,
			            errorColor: "black",
			            backgroundColor: color_array,
			            borderColor: color_array,
			            borderWidth: 1
			        }
		        ]
		    },
		    options: {
		    	        title: {
			            display: true,
			            text: 'Title of this graph'
				        },
		        scales: {
	        	     xAxes: [
				                {
				                    // stacked: true
				                }
				            ],
		            yAxes: [{
		            	// stacked: true,
		                ticks: {
		                    beginAtZero:true,
                            max: 5,
		                    min: 0,
		                    stepSize: 0.5
		                }
		            }]
		        },
				onClick: handleClick
		    }
		});	




	}

		function handleClick(evt){
	    var activeElement = theChart.getElementAtEvent(evt);
	    console.log(activeElement[0]._index);
	    // <button type="button" data-toggle="modal" data-target="#myModal"></button>
		}



});



