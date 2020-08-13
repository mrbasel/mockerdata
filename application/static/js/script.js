
let addFieldButton = document.querySelector("#addFieldButton");
let removeFieldButtons = document.querySelectorAll(".removeFieldButton");
let tableBody = document.querySelector("tbody");



addFieldButton.addEventListener('click', () => {
  AddField();
});


removeFieldButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    let field = btn.parentElement.parentElement;
    removeField(field);
  })
})


function AddField() {
  let tableBody = document.querySelector("tbody");
  let index = tableBody.childElementCount;
  let newField = createField(index + 1);

  tableBody.appendChild(newField)
}

function createField(index) {
  let elem = document.createElement("tr");
  elem.classList.add("text-center");

  elem.innerHTML = `
    <td><input type="text" class="form-control field-name" name="field-name" /></td>
    <td>
        <select class="form-control data-type">
          <option value="">Select data type</option>
          <optgroup label="Personal data">
              <option value="personal-firstname">Firstname</option>
              <option value="personal-lastname">Lastname</option>
              <option value="personal-username">Username</option>
              <option value="personal-email">Email</option>
              <option value="personal-age">Age</option>
              <option value="personal-password">Password</option>
          </optgroup>
          <optgroup label="numerical">
              <option value="numerical-id">ID</option>
              <option value="numerical-range">Number range</option>
          </optgroup>
          <optgroup label="geographical">
              <option value="geographical-country">country</option>
              <option value="geographical-city">city</option>
              <option value="geographical-address">address</option>
              <option value="geographical-street_address">street_address</option>
          </optgroup>
          <optgroup label="datetime">
              <!-- <option value="datetime-date_between"></option> -->
              <option value="datetime-month">Month number</option>
              <option value="datetime-month_name">Month name</option>
              <option value="datetime-time">Time (24 hour format)</option>
              <option value="datetime-timezone">Timezone</option>
              <option value="datetime-year">Year</option>
          </optgroup>
      </select>
    </td>
    `;
  // <th scope="row">${index}</th>
  // <td><button class="btn btn-dark">Remove</button></td>
  let dataCell = document.createElement('td');
  let removeButton = document.createElement("button");

  removeButton.textContent = 'Remove';
  removeButton.classList = ['btn btn-dark'];
  dataCell.appendChild(removeButton)
  elem.appendChild(dataCell)

  removeButton.addEventListener("click", () => {
    removeField(elem);
  });

  return elem
}

function removeField(field) {
  let tableBody = document.querySelector("tbody");
  // let field = tableBody.children[index];
  // console.log(field);
  tableBody.removeChild(field);
}



function getDataSet() {
  // Get the dataset the users requested

  let dataSetName = document.querySelector("#dataSetName").value;
  let dataSetFormat = document.querySelector("#dataSetFormat").value;
  let dataSetRows = document.querySelector("#rowsNum").value;

  let dataSetNameFields = Array.from(document.querySelectorAll('.field-name'));
  let dataSetDataTypeFields = Array.from(document.querySelectorAll(".data-type"));

  let dataSetFieldsValues = dataSetNameFields.map((item, index) => {
    const item2 = dataSetDataTypeFields[index];
    // return item2.value;
    return {
      field: item.value,
      dataType: item2.value
    }
  });

  // console.log(dataSetFieldsValues);
  return {
    name: dataSetName,
    data_format: dataSetFormat,
    rows: dataSetRows,
    field_values: dataSetFieldsValues,
  };
}

function sendDataSet() {
  // Sends dataset to api

  let dataSet = JSON.stringify(getDataSet());

  fetch(window.origin + "/api/createdata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: dataSet,
  })
    .then((response) => {
      let filename = response.headers.get("Content-Disposition").split("filename=")[1];
      return Promise.all([response.text(), filename]);
    })
    .then((data) => {
      // console.log(data[0]);
      // console.log(data[1]);
      downloadFile(data[0], data[1], "application/json");
    }
    );
}


function downloadFile(data, fileName, type = "text/plain") {
  // Create an invisible A element
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);

  // Set the HREF to a Blob representation of the data to be downloaded
  a.href = window.URL.createObjectURL(new Blob([data], { type }));

  // Use download attribute to set set desired file name
  a.setAttribute("download", fileName);

  // Trigger the download by simulating click
  a.click();

  // Cleanup
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}