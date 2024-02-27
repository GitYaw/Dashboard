
window.onload = onPageLoad;

let productionCosts = new Map()

const bioreactors = {
    "260K_ALR": {
        name: "262,000 L Airlift Bioreactor",
        image: "static/260K_ALR.png",
        annualProduction: 25000000,
        mediaVolume: 253758783,
        baseLaborCost: 2756*34.50 + 20353*46.00 + 261*57.50,
        otherMaterialsCost: 5464682,
        wasteTreatmentCost: 3034484,
        facilityCosts: 59461000,
        consumableCosts: 246000,
        powerUsage: 3116542,
        steamUsage: 27232,
        coolingWaterUsage: 1263320,
        chilledWaterUsage: 110527
    },
    "210K_STR": {
        name: "211,000 L Stirred Tank Bioreactor",
        image: "static/210K_STR.png",
        annualProduction: 20170140,
        mediaVolume: 205220306,
        baseLaborCost: 1443*34.50 + 20302*46.00 + 261*57.50,
        otherMaterialsCost: 4566256,
        wasteTreatmentCost: 2486000,
        facilityCosts: 205003000,
        consumableCosts: 246000,
        powerUsage: 8790694,
        steamUsage: 22166,
        coolingWaterUsage: 1944436,
        chilledWaterUsage: 89448
    },
    "40K_STR": {
        name: "42,000 L Stirred Tank Bioreactor",
        image: "static/40K_STR.png",
        annualProduction: 4003226,
        mediaVolume: 40732424,
        baseLaborCost: 722*34.50 + 24076*46.00 + 261*57.50,
        otherMaterialsCost: 2519278,
        wasteTreatmentCost: 697000,
        facilityCosts: 77202000,
        consumableCosts: 123000,
        powerUsage: 8790694,
        steamUsage: 22166,
        coolingWaterUsage: 1944436,
        chilledWaterUsage: 89448
    },
};

let bioreactor = bioreactors["40K_STR"]

function onPageLoad() {
    console.log("page loading")

    updateCosts()

    calculateExpenses()
    
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
    
    var dropdown = document.getElementById("bioreactorType");
    var bioreactorType = dropdown.options[dropdown.selectedIndex].value;
    bioreactor = bioreactors[bioreactorType]

    var flowDiagram = document.getElementById("flowDiagram");
    flowDiagram.src = bioreactors[bioreactorType].image;

    var bioreactorLabel = document.getElementById("bioreactorLabel");
    bioreactorLabel.innerHTML = "Flow Diagram: " + bioreactors[bioreactorType].name;	
}

function updateChart() {

    updateCosts()

    calculateExpenses()
    
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

function updateCosts() {
    productionCosts.mediaCost = parseFloat(document.getElementById('mediaCost').value);
    productionCosts.laborCost = parseFloat(document.getElementById('laborCost').value);
    productionCosts.powerCost = parseFloat(document.getElementById('powerCost').value);
    productionCosts.steamCost = parseFloat(document.getElementById('steamCost').value);
    productionCosts.coolingWaterCost = parseFloat(document.getElementById('coolingWaterCost').value);
    productionCosts.chilledWaterCost = parseFloat(document.getElementById('chilledWaterCost').value);
}

var annualProduction
var mediaVolume

function calculateExpenses() {
    
}