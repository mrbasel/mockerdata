
export default class FieldsHandler {
    fieldContainer = document.querySelector(".data-fields");
  
  AddField() {
    let index = this.fieldContainer.childElementCount;
    let newField = this.createField(index + 1);
  
    this.fieldContainer.appendChild(newField);
  
    let removeButton = Array.from(
      document.querySelectorAll(".removeFieldButton")
    ).slice(-1)[0];

    // Add an event listener to newly added remove button
    removeButton.addEventListener("click", () => {
      this.removeField(newField);
    });
  }
  
  createField() {
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
  
    return elem;
  }
  
  removeField(field) {
    this.fieldContainer.removeChild(field);
  }

}


