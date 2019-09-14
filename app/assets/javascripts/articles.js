$(document).ready(function() {
    let x = $('.article-card-body')
    if (!x.has('.article-image')) {
        console.log(123)
        $('.article-card-body').css('grid-template-columns', '100%');
    }
})