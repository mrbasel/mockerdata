
export default class FieldsHandler {
    fieldContainer = document.querySelector(".data-fields");
  
  AddField() {
    let index = this.fieldContainer.childElementCount;
    
    if (index >= 5){
      alert("Sorry, the maximum number of fields is 5");
      return;
    } 
    
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
                        <option value="personal-age">Age</option>
                    </optgroup>
                    <optgroup label="numerical">
                        <option value="numerical-id">ID</option>
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
                    <optgroup label="phone numbers">
                        <option value="phone_numbers-country_calling_code">Country calling code</option>
                        <option value="phone_numbers-phone_number">Phone number</option>
                    </optgroup>
                    <optgroup label="internet">
                        <option value="internet-username">Username</option>
                        <option value="internet-email">Email</option>
                        <option value="internet-company_email">Company email</option>
                        <option value="internet-password">Password</option>
                        <option value="internet-domain_name">Domain name</option>
                        <option value="internet-url">Url</option>
                        <option value="internet-image_url">Image url</option>
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



