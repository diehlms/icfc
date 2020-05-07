$(document).ready(function() {
    let galleryImage = document.querySelectorAll(".picture-modal-whole");
    if (galleryImage) {
        galleryImage.forEach(function(img) {
            const imageModalBody = $(img).closest(".img.modal-body");
            $(imageModalBody).css("maxWidth", img.width);
        })
    }
})