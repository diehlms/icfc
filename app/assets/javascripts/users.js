// const hideBtn = document.querySelector('.hideBtn');
// const userinfo = document.querySelectorAll('.userinfo');

// hideBtn.addEventListener('click', hide);

// function hide() {
//     userinfo.style.display = "none";
// }

$(document).ready(function() {
    $('.hideBtn').click(function(){
        $('.userinfo').hide();
    })
});