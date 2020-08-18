import { validateDataType, validateDataFields } from "./validators.js";


let addFieldButton = document.querySelector("#addFieldButton");
let removeFieldButtons = document.querySelectorAll(".removeFieldButton");
let downloadButton = document.querySelector("#download-btn");



addFieldButton.addEventListener('click', () => {
  AddField();
});

downloadButton.addEventListener('click', () => {
  let fielddataTypes = document.querySelectorAll(".data-type");
  let fieldNames = document.querySelectorAll(".field-name");

  if (!validateDataType(fielddataTypes)) {
    console.log("Please choose a valid data type");
    return false;
  }

  if (!validateDataFields(fieldNames)) {
    console.log("Please choose a name for your field");
    return false;
  }

  sendDataSet();
})


removeFieldButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    let field = btn.parentElement.parentElement.parentElement;
    removeField(field);
  })
})


function AddField() {
  let fieldContainer = document.querySelector(".data-fields");
  let index = fieldContainer.childElementCount;
  let newField = createField(index + 1);

  fieldContainer.appendChild(newField);

  let removeButton = Array.from(
    document.querySelectorAll(".removeFieldButton")
  ).slice(-1)[0];

  removeButton.addEventListener("click", () => {
    removeField(newField);
  });
}

function createField() {
  let elem = document.createElement("div");
  elem.classList.add("box", "data-field", "secondary-color");

  // TODO: Refactor this

  elem.innerHTML = `
    <div class="columns is-centered">
        <div class="column">
            <input type="text" class="input field-name mx-4">
        </div>
        <div class="column">
            <div class="select ml-6">
                <select class="data-type">
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
              <option value="numerical-range">Range</option>
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
          <optgroup label="finance">
              <option value="finance-currency_name">Currency name</option>
              <option value="finance-currency_code">Currency code</option>
              <option value="finance-currency_symbol">Currency sympol</option>
              <option value="finance-bban">BBAN</option>
              <option value="finance-iban">IBAN</option>
              <option value="finance-credit_card_number">Credit card number</option>
              <option value="finance-credit_card_provider">Credit card provider</option>
          </optgroup>
                </select>
            </div>
        </div>
        <div class="column has-text-centered">
            <a class="delete removeFieldButton mt-2"></a>
        </div>
    </div>
    `;

  return elem
}

function removeField(field) {
  let fieldContainer = document.querySelector(".data-fields");
  fieldContainer.removeChild(field);
}


export function getDataSet() {
  // Get the dataset the users requested

  let dataSetName = document.querySelector("#dataSetName").value;
  let dataSetFormat = document.querySelector("#dataSetFormat").value;
  let dataSetRows = document.querySelector("#rowsNum").value;

  let dataSetNameFields = Array.from(document.querySelectorAll('.field-name'));
  let dataSetDataTypeFields = Array.from(document.querySelectorAll(".data-type"));

  let dataSetFieldsValues = dataSetNameFields.map((item, index) => {
    const item2 = dataSetDataTypeFields[index];

    return {
      fieldName: item.value,
      dataType: item2.value
    }
  });

  return {
    name: dataSetName == "" ? "mock_data" : dataSetName,
    data_format: dataSetFormat,
    rows: dataSetRows == null ? 50 : dataSetRows,
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
      downloadFile(data[0], data[1], "application/json");
    }
    );
}


function downloadFile(data, fileName, type="text/plain") {
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