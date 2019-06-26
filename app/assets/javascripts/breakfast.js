document.addEventListener('DOMContentLoaded', function() {
    var card = document.querySelector('#breakfast-card-text');
    var p = document.createElement('p');
    var d = new Date();
    var n = d.getDay();
    switch(n) {
        case (n = 2) || (n = 4) || (n = 6):
            p.innerHTML = 'Egg Day';
            break;
        case (n = 1) || (n = 5):
            p.innerHTML = 'Pancake Day';
            break;
        case (n = 3):
            p.innerHTML = 'French Toast Day';
            break;
        case (n = 0):
            p.innerHTML = 'Sunday Brunch. Special times apply.';
            break;
    };
    card.appendChild(p);
});