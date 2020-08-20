import { getDataSet } from "./dataset.js";


export default function previewData() {
    let dataSet = getDataSet(false);
    dataSet.rows = 10;

    fetch(window.origin + "/api/createdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSet),
    })
    .then((response) => response.text())
    .then((data) => {
        displayPreviewData(JSON.parse(data));
    })
    ;

}

function displayPreviewData(data) {
    const headerRows = document.querySelector('#head-row');
    const tableBody = document.querySelector('tbody');

    headerRows.innerHTML = '';
    tableBody.innerHTML = "";


    let dataHeaders = Object.keys(data[0])

    // Add table headers
    for (let header of dataHeaders){
        let tableHeadingElem = document.createElement('th');
        tableHeadingElem.textContent = header;
        headerRows.appendChild(tableHeadingElem);
    }

    // Add table values
    for (const i of data){
        let tableRow = document.createElement('tr');
    
        for (const value of Object.values(i)) {
            let tableCell = document.createElement('td');
            tableCell.textContent = value;

            tableRow.appendChild(tableCell);
        }
        
        tableBody.appendChild(tableRow);
    
    }

}