import { validateDataType, validateDataFields } from "./validators.js";
import FieldsHandler from "./fields_handler.js";
import { sendDataSet } from "./dataset.js";
import { showPreviewModal, hidePreviewModal } from "./modals.js";
import previewData from "./preview.js";


const addFieldButton = document.querySelector("#addFieldButton");
const removeFieldButtons = document.querySelectorAll(".removeFieldButton");
const downloadButton = document.querySelector("#download-btn");

const previewModal = document.querySelector("#preview-modal");
const previewButton = document.querySelector("#preview-btn");
const closeModalButtons = document.querySelectorAll(".close-modal");


// Adding event listeners

for (const btn of closeModalButtons) {
  btn.addEventListener('click', () => {
    hidePreviewModal();
  })
}

previewButton.addEventListener("click", () => {
  previewData();
  showPreviewModal();
});


addFieldButton.addEventListener('click', () => {
  let fieldHandler = new FieldsHandler();
  fieldHandler.AddField();
});

downloadButton.addEventListener('click', () => {
  let fielddataTypes = document.querySelectorAll(".data-type");
  let fieldNames = document.querySelectorAll(".field-name");

  if (!validateDataType(fielddataTypes)) {
    console.log("Please choose a valid data type");
    return;
  }

  if (!validateDataFields(fieldNames)) {
    console.log("Please choose a name for your field");
    return;
  }

  sendDataSet();
})


removeFieldButtons.forEach((btn) => {
  let fieldHandler = new FieldsHandler();

  btn.addEventListener('click', () => {
    let field = btn.parentElement.parentElement.parentElement;
    fieldHandler.removeField(field);
  })
})
