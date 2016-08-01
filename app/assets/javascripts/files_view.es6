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
		// var finan_data_arr = ["$500","$640", "$383", "$200", "$780", "$320", "$107", "$372", "$6000", "$3000", "$10", "$68", "$15000", "$55", "$200"];
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
		// if(type == "A"){
			console.log(response);
			var data_array = response[1];
			var error_array = response[2];
			var arr_length = data_array.length;
			var color_array = Array(arr_length).fill('rgba(255, 99, 132, 0.2)');
		// }else{
		// 	var data_arrayB = response[1];
		// 	var error_arrayB = response[2];
		// 	console.log(data_arrayB.length);
		// 	var arr_length = data_arrayB.length;
		// 	var color_arrayB = Array(arr_length).fill('blue');
		// }

		var data_label = ["Major Non-cerebral Hemorrhage", "Other Side Effect", "Recurrent Ischemic Stroke", "Recurrent hemorrhagic Stroke", "Recurrent unknown Stroke", "Pulmonary embolism", "Death", "Indicator for hemorrhagic stroke", "Indicator for ischemic stroke","Indicator for indeterminate stroke","Indicator for hemorrhagic transform","Indicator for pulmonary embolism","Indicator for deep vein thrombosis","Indicator for major non-cerebral bleed","Indicator for any stroke"];
		// 19-25, 30-37

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



