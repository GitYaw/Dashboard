from flask import Flask, render_template

app = Flask(__name__)


def get_data():

    parameters = [
        {
            "id": "mediaCost",
            "label": "Media Cost",
            "default": 1.4,
            "unit1": "$",
            "unit2": " / L",
            "description": "The base case cost is $1.4/L"
        },
        {
            "id": "electricityCost",
            "label": "Electricity Cost",
            "default": 0.1,
            "unit1": "$",
            "unit2": " / kW-h",
            "description": "The base case cost is $0.1/kW-h"
        },
        {
            "id": "steamCost",
            "label": "Steam Cost",
            "default": 12,
            "unit1": "$",
            "unit2": " / MT",
            "description": "The base case cost is $12/MT"
        },
        {
            "id": "coolingWaterCost",
            "label": "Cost of Cooling Water",
            "default": 0.05,
            "unit1": "$",
            "unit2": " / MT",
            "description": "The base case cost is $0.05/MT"
        },
        {
            "id": "chilledWaterCost",
            "label": "Cost of Chilled Water",
            "default": 0.4,
            "unit1": "$",
            "unit2": " / MT",
            "description": "The base case cost is $0.4/MT"
        },
        {
            "id": "laborCost",
            "label": "Change in Labor Cost",
            "default": 0,
            "unit2": "%",
            "description": "Labor cost as a percent difference from base labor cost"
        }
    ]

    breakdowns = [
        {
            "id": "annualProduction",
            "label": "Annual Production",
            "unit": "kg/yr"
        },
        {
            "id": "operatingExpenses",
            "label": "Operating Expenses",
            "unit": "million USD/yr"
        },
        # other breakdowns...
    ]

    labor_breakdown = [
        {
            "percentChange": -2,
            "upstream": "",
            "downstream": "",
            "midstream": "",
            "totalCost": ""
        },
        # other rows...
    ]

    return {
        # "bioreactors": bioreactors,
        "parameters": parameters,
        "breakdowns": breakdowns,
        "laborBreakdown": labor_breakdown,
    }


@app.route('/')
def hello_world():
    data = get_data()
    return render_template('landing.html', **data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
