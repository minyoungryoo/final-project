// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$(document).on("turbolinks:load", function() {

		var data_arr = [];
		var response_label = [];
		var final_price = 0;
		var color_arr = [];

		var data_arr2 = [];
		var response_label2 = [];
		var final_price2 = 0;
		var color_arr2 = [];

		var hovor_color_arr = [];
		var data_cache = [
			[0,0,0],
			[0,0,0]
		];

		var typeToIndex = {
			A: 0,
			B: 1
		}

	function financial_data(num_index, type, check){
		var content_label = ["Varying Dosages of Hep/Asp", "Heparin", "Aspirin", "Followup to treatment", "Subcutaneous Heparin", "Antiplatelet Drug", "Intravenous Heparin", "Other Anticoagulants", "Calcium Antagonists", "Glycerol or manitol", "Steroids", "Haemodilution", "Carotid Surgery", "Thrombolysis", "Medication Taken at 6-months Followup"];
		var finan_data_arr = [500, 640, 383, 200, 780, 320, 107, 372, 6000, 3000, 10, 68, 15000, 55, 200];
		var sample_color = ["#BC41EF", "#BB61F3", "#802D7C", "#ECF38B", "#D676D1", "#2F1081", "#AA208A", "#FF6384", "#36A2EB", "#FFCE56", "#BC41EF", "#FA8072", "#B0C627", "#27AEC6", "#C6A727"];
		var i;

		if (type === "A") {
			if(check == 1){
		response_label.push(content_label[num_index]);
		data_arr.push(finan_data_arr[num_index]);
		color_arr.push(sample_color[num_index]);
		final_price += finan_data_arr[num_index];
			} else {
		i = response_label.indexOf(content_label[num_index]);
		response_label.splice(i, 1);
		data_arr.splice(i, 1);
		color_arr.splice(i, 1);
		final_price -= finan_data_arr[num_index];			
			}

			var dataA = {
		    labels: response_label,
		    datasets: [
		        {
		            data: data_arr,
		            backgroundColor: color_arr,
		            hoverBackgroundColor: color_arr
		        }]
			};


		$('.js-doughnut-container').html(`<canvas id="myPieChart" width="300" height="300"></canvas>`);
		var ctx = document.getElementById("myPieChart");
		var myPiechart = new Chart(ctx, {
		    type: 'doughnut',
		    data: dataA,
		    options: {
		    	title: {
                       display: true,
                       text: 'Action A'
                           },
		    	maintainAspectRatio: false,
		    	 	responsive: true,
			    legend: {
			      display: true
			      // ,
		// 		  onClick: function(e, legendItem) {
		// 	// console.log(myPiechart.getDatasetAtEvent(e));
		// 	var index = legendItem.datasetIndex;
		// 	var ci = this.chart;
		// 	var meta = ci.getDatasetMeta(index);

		// 	// See controller.isDatasetVisible comment
		// 	meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;

		// 	// We hid a dataset ... rerender the chart
		// 	ci.update();
		// }
			    },
		    }
		});

		// function changeTotal (event, legendItem) { 
		// 	// final_price += finan_data_arr[num_index];
		// 		// console.log(event);
		// 		// console.log(legendItem);
		// 	    };
		
		Chart.pluginService.register({
		  beforeDraw: function(chart) {
			if(chart.chart.canvas.id == "myPieChart"){
			    var width = chart.chart.width,
			        height = chart.chart.height,
			        ctx = chart.chart.ctx;

			    ctx.restore();
			    var fontSize = (height / 200).toFixed(2);
			    ctx.font = fontSize + "em sans-serif";
			    ctx.textBaseline = "top";

			    var text = `$${final_price}.00`,
			        textX = Math.round((width - ctx.measureText(text).width) / 2),
			        textY = height / 2;

			    ctx.fillText(text, textX, textY);
			    ctx.save();
			}
		  }
		});

	}else if(type === "B"){
			if(check == 1){
		response_label2.push(content_label[num_index]);
		data_arr2.push(finan_data_arr[num_index]);
		color_arr2.push(sample_color[num_index]);
		final_price2 += finan_data_arr[num_index];
			} else {
		i = response_label2.indexOf(content_label[num_index]);
		response_label2.splice(i, 1);
		data_arr2.splice(i, 1);
		color_arr2.splice(i, 1);
		final_price2 -= finan_data_arr[num_index];			
			}

			var data = {
		    labels: response_label2,
		    datasets: [
		        {
		            data: data_arr2,
		            backgroundColor: color_arr2,
		            hoverBackgroundColor: color_arr2
		        }]
			};


		$('.js-doughnut-container2').html(`<canvas id="myPieChart2" width="300" height="300"></canvas>`);
		var ctx = document.getElementById("myPieChart2");
		var myPiechart2 = new Chart(ctx, {
		    type: 'doughnut',
		    data: data,
		    options: {
		    	title: {
                      display: true,
                      text: 'Action B'
                         },
		    	maintainAspectRatio: false,
		    	 	responsive: true,
			    legend: {
			      display: true
			    }
		    }
		});

		
		Chart.pluginService.register({
		  beforeDraw: function(chart) {
			if(chart.chart.canvas.id == "myPieChart2"){
			    var width = chart.chart.width,
			        height = chart.chart.height,
			        ctx = chart.chart.ctx;

			    ctx.restore();
			    var fontSize = (height / 200).toFixed(2);
			    ctx.font = fontSize + "em sans-serif";
			    ctx.textBaseline = "top";

			    var text = `$${final_price2}.00`,
			        textX = Math.round((width - ctx.measureText(text).width) / 2),
			        textY = height / 2;

			    ctx.fillText(text, textX, textY);
			    ctx.save();
			}
		  }
		});

		}


	};


	if ($('.js-chart-container').length > 0) {

		var file_id = $(".js-chart-container").data("id");
		var patient_id = $(".js-chart-container").data("patient-id");
		console.log(patient_id);

		$.ajax({
			type: "GET",
			url: `/api/files/${file_id}`,
			data: {patient_id: patient_id},
			success: initialize_data
		});

		function initialize_data(response){
// 16-18, 38-49
			var num_id_colA = [];
			var num_id_colB = [];
		$('.searchType').click(function(event) {
			var file_id = $(".js-chart-container").data("id");
			var num_id = $(event.currentTarget).data("id");
			var num_index = $(event.currentTarget).data("index");
			var type = $(event.currentTarget).data("searchtype");
			var patient_id = $(event.currentTarget).data("patient-id");
			var index;
			var check = 0;

			var data = { patient_id: patient_id };
			if ($(this).is(':checked')) {
				if(type == "A"){
					num_id_colA.push(num_id);
					data.num_idA = num_id_colA;
					console.log(num_id_colA);
				}else if(type == "B"){
					num_id_colB.push(num_id);
					data.num_idB = num_id_colB;
				}

				check = 1;

				} else {
					if(type == "A"){
						index = num_id_colA.indexOf(num_id);
						num_id_colA.splice(index, 1);
						data.num_idA = num_id_colA;
					}else if(type == "B"){
						index = num_id_colB.indexOf(num_id);
						num_id_colB.splice(index, 1);
						data.num_idB = num_id_colB;
					}
				check = 0;
				}

				$.ajax({
					type: "GET",
					data: data,
					url: `/api/files/${file_id}`,
					success: function(response){

						var index = typeToIndex[type];
						data_cache[index] = response;

						visualize_data(data_cache); 
						financial_data(num_index, type, check);

					}
				});
			 });
		}

	}
	

	function visualize_data(response){
		medical_data(response);
	}

	function medical_data(response) {
		var theChart;
			var data_arrayA = response[0][1];
			var error_arrayA = response[0][2];
				if(data_arrayA != 0){
					data_arrayA = data_arrayA.map(function(x) { return x * 100; });
					error_arrayA = error_arrayA.map(function(x) { return x * 100; });
				}
			var arr_lengthA = data_arrayA.length;
			var color_arrayA = Array(arr_lengthA).fill('rgba(255, 99, 132, 0.2)');
			if(arr_lengthA > 0){
				color_arrayA[arr_lengthA-1] = "#FF0000";
				data_arrayA[arr_lengthA-1] = data_arrayA[arr_lengthA-1]/4;
				error_arrayA[arr_lengthA-1] = error_arrayA[arr_lengthA-1]/4;
			}

			var data_arrayB = response[1][1];
			var error_arrayB = response[1][2];
				if(data_arrayB != 0){
					data_arrayB = data_arrayB.map(function(x) { return x * 100; });
					error_arrayB = error_arrayB.map(function(x) { return x * 100; });
				}
			var arr_lengthB = data_arrayB.length;
			var color_arrayB = Array(arr_lengthB).fill('#AFEEEE');
			if(arr_lengthB > 0){
				color_arrayB[arr_lengthB-1] = "#0000FF";
				data_arrayB[arr_lengthB-1] = data_arrayB[arr_lengthB-1]/4;
				error_arrayB[arr_lengthB-1] = error_arrayB[arr_lengthB-1]/4;
			}

		var data_label = ["Major Non-cerebral Hemorrhage", "Other Side Effect", "Recurrent Ischemic Stroke", "Recurrent hemorrhagic Stroke", "Recurrent unknown Stroke", "Pulmonary embolism", "Death", "Indicator for hemorrhagic stroke", "Indicator for ischemic stroke","Indicator for indeterminate stroke","Indicator for hemorrhagic transform","Indicator for pulmonary embolism","Indicator for deep vein thrombosis","Indicator for major non-cerebral bleed","Indicator for any stroke", "Final Condition"];
		// 19-25, 30-37

		var id = $('.js-med-chart-container').data("id");
		$('.js-med-chart-container').html(`<canvas id="myMedChart" data-id="${id}" style="width: 300px; height: 200px;"></canvas>`);

		var ctx = document.getElementById("myMedChart");

		if(data_arrayA != 0){
			var maxA = Math.max.apply(Math, data_arrayA);
		}
		if(data_arrayB != 0){
			var maxB = Math.max.apply(Math, data_arrayB);
		}
		if(maxA && maxB){
			var loc_max_arr = [maxA, maxB];
			var max_val = Math.max.apply(Math, loc_max_arr);
		}else if(maxA){
			var max_val = maxA;
		}else if(maxB){
			var max_val = maxB;
		}else{
			var max_val = 4;
		}

		theChart = new Chart(ctx, {
            type: 'barError',
		    data: {
		        labels: data_label,
		        datasets: [
			        {
			            label: 'Action A',
			            data: data_arrayA,
			            error: error_arrayA,
			            errorDir : "both",
			            errorStrokeWidth : 1,
			            errorCapWidth : 0.75,
			            errorColor: "black",
			            backgroundColor: color_arrayA,
			            borderColor: color_arrayA,
			            borderWidth: 1
			        },
			        {
			            label: 'Action B',
			            data: data_arrayB,
			            error: error_arrayB,
			            errorDir : "both",
			            errorStrokeWidth : 1,
			            errorCapWidth : 0.75,
			            errorColor: "black",
			            backgroundColor: color_arrayB,
			            borderColor: color_arrayB,
			            borderWidth: 1
			        }
		        ]
		    },
		    options: {
		    	        title: {
			            display: true,
			            text: 'Side Effects vs. Final Condition'
				        },
		        scales: {
	        	     xAxes: [
				                {
				                    // stacked: true,
	           //                scaleLabel: {
						      //   display: true,
						      //   labelString: 'probability'
						      // }
				                }
				            ],
		            yAxes: [{
		            	// stacked: true,
	            	      scaleLabel: {
						        display: true,
						        labelString: 'Probability of Occurrence (%)'
						      },
		                ticks: {
		                    beginAtZero:true,
                            max: max_val*1.2,
		                    min: 0,
		                    stepSize: 20
		                }
		            }]
		        },
				onClick: handleClick
		    }
		});	



	}

		function handleClick(evt, activeElement){
	    var i = activeElement[0]._index;
	    var disease_name = activeElement[0]._xScale.ticks[i];
		$.ajax({
			type: "GET",
			url: `/files/2`,
			data: {disease_name: disease_name}
		});
	    $('#myModal').modal('show');
		}



});



