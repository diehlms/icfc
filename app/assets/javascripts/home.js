$(document).ready(function() {
    $('.colorButton').click(function(e) {
        e.preventDefault();
        console.log('123');
    })
})

objectFitImages();

/* init Jarallax */
jarallax(document.querySelectorAll('.jarallax'));

jarallax(document.querySelectorAll('.jarallax-keep-img'), {
    keepImg: true,
});