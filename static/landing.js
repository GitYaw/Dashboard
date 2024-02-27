
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
        chilledWaterUsage: 110527,
        capitalExpense: 0, // missing capital expense
        depreciation: 1.2
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
        chilledWaterUsage: 89448,
        capitalExpense: 1172900000,
        depreciation: 9.76
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
        chilledWaterUsage: 89448,
        capitalExpense: 437200000, 
        depreciation: 5.14
    },
};
var bioreactor;

function onPageLoad() {

    selectBioreactor();

    updateCosts();

    calculateExpenses();
    
    createChart();
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

function selectBioreactor() {
    
    var dropdown = document.getElementById("bioreactorType");
    var bioreactorType = dropdown.options[dropdown.selectedIndex].value;
    bioreactor = bioreactors[bioreactorType];

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
    productionCosts.media = parseFloat(document.getElementById('mediaCost').value);
    productionCosts.laborScale = parseFloat(document.getElementById('laborCost').value);
    productionCosts.power = parseFloat(document.getElementById('powerCost').value);
    productionCosts.steam = parseFloat(document.getElementById('steamCost').value);
    productionCosts.coolingWater = parseFloat(document.getElementById('coolingWaterCost').value);
    productionCosts.chilledWater = parseFloat(document.getElementById('chilledWaterCost').value);
}

function calculateExpenses() {
    console.log(bioreactor)
    
    // Cost of Utilities
    var power = productionCosts.power * bioreactor.powerUsage;
    var steam = productionCosts.steam * bioreactor.steamUsage;
    var coolingWater = productionCosts.coolingWater * bioreactor.coolingWaterUsage;
    var chilledWater = productionCosts.chilledWater * bioreactor.chilledWaterUsage;
    var utilities = power + steam + coolingWater + chilledWater;

    // Operating Expenses
    var media = productionCosts.media * bioreactor.mediaVolume;
    var otherMaterials = bioreactor.otherMaterialsCost;
    var labor = (1 + productionCosts.laborScale) * bioreactor.baseLaborCost;
    var waste = bioreactor.wasteTreatmentCost;
    var facility = bioreactor.facilityCosts;
    var consumables = bioreactor.consumableCosts;
    operatingExpenses = media + otherMaterials + labor + waste + facility + consumables + utilities;
    
    // Capital Expense
    capitalExpense = bioreactor.capitalExpense;

    // Costs of Goods Sold
    var salesCost = operatingExpenses / bioreactor.annualProduction;

    // Costs of Goods Sold (without depreciation)
    var adjustedSalesCost = salesCost - bioreactor.depreciation;

    console.log("CAPEX: ", (capitalExpense / 1000000).toFixed(1), "(mil $)")
    console.log("OPEX: ", (operatingExpenses / 1000000).toFixed(1), "(mil $/yr)")
    console.log("COGS: ", salesCost.toFixed(2), "($/kg) (with Depreciaton)")
    console.log("COGS: ", adjustedSalesCost.toFixed(2), "($/kg) (without Depreciation)")
}