
function changeBioreactorType() {
    // change diagram
    // also change full name of bioreactor type
    var dropdown = document.getElementById("bioreactorType");
    var selectedValue = dropdown.options[dropdown.selectedIndex].value;
    
    var flowDiagram = document.getElementById("flowDiagram");
    
    if (selectedValue === "1") {
        bioreactorName = "42,000 L Stirred Tank Bioreactor"
        flowDiagram.src = "static/40K_STR.png";
    } else if (selectedValue === "2") {
        bioreactorName = "211,000 L Stirred Tank Bioreactor"
        flowDiagram.src = "static/210K_STR.png";
    } else if (selectedValue === "3") {
        bioreactorName = "262,000 L Airlift Bioreactor"
        flowDiagram.src = "static/260K_ALR.png";
    }
    
    var bioreactorLabel = document.getElementById("bioreactorLabel");
    bioreactorLabel.innerHTML = "Flow Diagram: " + bioreactorName;	
}