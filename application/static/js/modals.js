const previewModal = document.querySelector("#preview-modal");
const previewButton = document.querySelector("#preview-btn");
const closeModalButtons = document.querySelectorAll(".close-modal");


export function showPreviewModal() {
    const previewModal = document.querySelector("#preview-modal");
    previewModal.classList.add("is-active");
}

export function hidePreviewModal() {
    const previewModal = document.querySelector("#preview-modal");
    previewModal.classList.remove("is-active");
}
