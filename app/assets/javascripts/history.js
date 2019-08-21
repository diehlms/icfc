$(document).ready(function() {
    let coll = document.getElementsByClassName("collapsible");

    coll.forEach(col => {
        col.addEventListener('click', function() {
            let content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block"
            }
        })
    })
});