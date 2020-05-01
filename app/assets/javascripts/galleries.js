$(document).ready(function() {
    let galleryImage = document.querySelectorAll(".picture-modal-whole");
    if (galleryImage) {
        galleryImage.forEach(function(img) {
            $(img).closest(".img.modal-body").css("max-width", img.width);
        })
    }
})