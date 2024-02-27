

window.onload = onPageLoad;

var parameterValues = new Map()

function onPageLoad() {
    console.log("page loading")
    createChart()
}

function createChart() {
    
    var initialData = {
        labels: ["Labor", "Materials", "Equipment", "Other"],
        datasets: [{
            data: [10, 20, 30, 40],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        }]
    };

    var context = document.getElementById('expensesChart').getContext('2d');

    var expensesChart = new Chart(context, {
        type: 'doughnut',
        data: initialData,
        options: {
        }
    });
}

function changeBioreactorType() {
    // change diagram
    // also change full name of bioreactor type
    var dropdown = document.getElementById("bioreactorType");
    var selectedValue = dropdown.options[dropdown.selectedIndex].value;
    
    var flowDiagram = document.getElementById("flowDiagram");
    
    if (selectedValue === "1") {
        var bioreactorName = "42,000 L Stirred Tank Bioreactor"
        flowDiagram.src = "static/40K_STR.png";
    } else if (selectedValue === "2") {
        var bioreactorName = "211,000 L Stirred Tank Bioreactor"
        flowDiagram.src = "static/210K_STR.png";
    } else if (selectedValue === "3") {
        var bioreactorName = "262,000 L Airlift Bioreactor"
        flowDiagram.src = "static/260K_ALR.png";
    }
    
    var bioreactorLabel = document.getElementById("bioreactorLabel");
    bioreactorLabel.innerHTML = "Flow Diagram: " + bioreactorName;	
}

// function updateParameter(parameter, value, fromRangeInput) {
//     parameterValues.set(parameter, value)

//     if (fromRangeInput) {
//         var numberInput = document.getElementById(parameter)
//         numberInput.value = value
//     } else {
//         var rangeInput = document.getElementById(parameter + "Slider")
//         rangeInput.value = value
//     }
// }

function updateChart() {
    var updatedData = {
        labels: ["Labor", "Materials", "Equipment", "Other"],
        datasets: [{
            data: [40, 30, 20, 10],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        },{
                      data: [10, 30, 20, 40],
                      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
                  }]
    };

    var expensesChart = Chart.getChart('expensesChart');

    if (expensesChart) {
        expensesChart.data.datasets = updatedData.datasets;
        expensesChart.update();
    } else {
        createChart();
    }
}