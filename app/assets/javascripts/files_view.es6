// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$(document).on("turbolinks:load", function() {

		var data_arr = [];
		var response_label = [];
		var color_arr = [];
		var hovor_color_arr = [];
		var final_price = 0;
		var myPiechart;

	function financial_data(num_index){

		var content_label = ["Varying Dosages of Hep/Asp", "Heparin", "Aspirin", "Followup to treatment", "Subcutaneous Heparin", "Antiplatelet Drug", "Intravenous Heparin", "Other Anticoagulants", "Calcium Antagonists", "Glycerol or manitol", "Steroids", "Haemodilution", "Carotid Surgery", "Thrombolysis", "Medication Taken at 6-months Followup"];
		var finan_data_arr = [500, 640, 383, 200, 780, 320, 107, 372, 6000, 3000, 10, 68, 15000, 55, 200];
		var sample_color = ["#BC41EF", "#BB61F3", "#802D7C", "#ECF38B", "#D676D1", "#2F1081", "#AA208A", "#FF6384", "#36A2EB", "#FFCE56", "#BC41EF", "red", "#AA208A", "#AA208A", "#AA208A"];

		response_label.push(content_label[num_index]);
		data_arr.push(finan_data_arr[num_index]);
		color_arr.push(sample_color[num_index]);
		final_price += finan_data_arr[num_index];


	if ($('#myPieChart').length > 0) {
			var data = {
		    labels: response_label,
		    datasets: [
		        {
		            data: data_arr,
		            backgroundColor: color_arr,
		            hoverBackgroundColor: color_arr
		        }]
			};


	if(myPiechart){
		console.log("This is printing")
		myPiechart.update();
	}else{
		var ctx = document.getElementById("myPieChart");
		myPiechart = new Chart(ctx, {
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
		//
	}
		
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

			    var text = `$ ${final_price}.00`,
			        textX = Math.round((width - ctx.measureText(text).width) / 2),
			        textY = height / 2;

			    ctx.fillText(text, textX, textY);
			    ctx.save();
			}
		  }
		});
};


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
		var contentA = "";
		var content_label = ["Varying Dosages of Hep/Asp", "Heparin", "Aspirin", "Followup to treatment", "Subcutaneous Heparin", 
		"Antiplatelet Drug", "Intravenous Heparin", "Other Anticoagulants", "Calcium Antagonists", "Glycerol or manitol", "Steroids", 
		"Haemodilution", "Carotid Surgery", "Thrombolysis", "Medication Taken at 6-months Followup"];

// 16-18, 38-49

		for(var i=0; i<=14; i++){
			if (i<=2){
			contentA += `<input type="checkbox" data-patient-id=${patient_id} class="searchType" data-searchtype="A" name=${content_label[i]} data-index=${i} data-id=${i+16}>${content_label[i]}`;
			}else{
			contentA += `<input type="checkbox" data-patient-id=${patient_id} class="searchType" data-searchtype="A" name=${content_label[i]} data-index=${i} data-id=${i+35}>${content_label[i]}`;
			};
		};

		$('.check_listA').html(contentA)

		var contentB = "";
		for(var i=0; i<=14; i++){
			if (i<=2){
			contentB += `<input type="checkbox" data-patient-id=${patient_id} class="searchType" data-searchtype="B" name=${content_label[i]} data-index=${i} data-id=${i+16}>${content_label[i]}`;
			}else{
			contentB += `<input type="checkbox" data-patient-id=${patient_id} class="searchType" data-searchtype="B" name=${content_label[i]} data-index=${i} data-id=${i+35}>${content_label[i]}`;
			};
		};

		$('.check_listB').html(contentB)

		var num_id_colA = [];
		var num_id_colB = [];
		$('.searchType').click(function(event) {
			var file_id = $(".js-chart-container").data("id");
			var num_id = $(event.currentTarget).data("id");
			var num_index = $(event.currentTarget).data("index");
			var type = $(event.currentTarget).data("searchtype");
			console.log(type);
			if(type == "A"){
			num_id_colA.push(num_id);
			}else if(type == "B"){
			num_id_colB.push(num_id);
			}
			var patient_id = $(event.currentTarget).data("patient-id");
			$.ajax({
				type: "GET",
				data: {num_idA: num_id_colA,
					num_idB: num_id_colB,
					patient_id: patient_id},
				url: `/api/files/${file_id}`,
				success: function(response){
					visualize_data(response); 
					financial_data(num_index);
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
			var arr_lengthA = data_arrayA.length;
			var color_arrayA = Array(arr_lengthA).fill('rgba(255, 99, 132, 0.2)');
			if(arr_lengthA > 0){
				color_arrayA[arr_lengthA-1] = "#FF0000";
			}

			var data_arrayB = response[1][1];
			var error_arrayB = response[1][2];
			var arr_lengthB = data_arrayB.length;
			var color_arrayB = Array(arr_lengthB).fill('#AFEEEE');
			if(arr_lengthB > 0){
				color_arrayB[arr_lengthB-1] = "#0000FF";
			}


		var data_label = ["Major Non-cerebral Hemorrhage", "Other Side Effect", "Recurrent Ischemic Stroke", "Recurrent hemorrhagic Stroke", "Recurrent unknown Stroke", "Pulmonary embolism", "Death", "Indicator for hemorrhagic stroke", "Indicator for ischemic stroke","Indicator for indeterminate stroke","Indicator for hemorrhagic transform","Indicator for pulmonary embolism","Indicator for deep vein thrombosis","Indicator for major non-cerebral bleed","Indicator for any stroke", "Final Condition"];
		// 19-25, 30-37

		var id = $('.js-med-chart-container').data("id");
		$('.js-med-chart-container').html(`<canvas id="myMedChart" data-id="${id}" width="300" height="200"></canvas>`);

		var ctx = document.getElementById("myMedChart");

		// console.log(data_arrayA);
		// console.log(data_arrayB != 0);
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
		// var max_val = 4;


		// console.log(maxA);
		// console.log(maxB);
		// console.log(loc_max_arr);
		// console.log(max_val);

		theChart = new Chart(ctx, {
            type: 'barError',
		    data: {
		        labels: data_label,
		        datasets: [
			        {
			            label: '# of Occurances',
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
			            label: '# of Occurances',
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
                            max: max_val*1.2,
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



