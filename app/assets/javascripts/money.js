document.addEventListener('DOMContentLoaded', function() {
    let topDiv = document.querySelector(".exchange");
    let p = document.createElement("p");

    endpoint = 'latest',
    access_key = '83fa4250c7a0af9c3c165ec915ad4602';
    from = 'EUR';
    to = 'GBP';
    amount = '1';

    if(topDiv) {
        // $.ajax({
        //     url: 'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key +'&from=' + from + '&to=' + to + '&amount=' + amount,
        //     dataType: 'jsonp',
        //     success: function(json) {
        //         console.log(json.result)
        //     }
        // });
        p.textContent = "We\'re working on an API fix"
    } else {
        p.textContent = 'An error has occurred. Please check back later';
    }

    topDiv.appendChild(p);
})



