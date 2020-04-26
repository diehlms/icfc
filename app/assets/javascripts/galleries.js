$(document).ready(function() {
    let galleryImage = document.querySelector(".picture-modal-whole");
    if (galleryImage) {
        $(galleryImage).closest(".img.modal-body").css("max-width", galleryImage.width);
    }
})