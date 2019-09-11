$(document).ready(function() {
    const card = document.querySelector('#breakfast-card-text');
    if (card && card.length >= 0) {
        let p = document.createElement('p');
        let d = new Date().getDay();
        switch(d) {
            case (d = 2) || (d = 4) || (d = 6):
                p.textContent = 'Egg Day';
                break;
            case (d = 1) || (d = 5):
                p.textContent = 'Pancake Day';
                break;
            case (d = 3):
                p.textContent = 'French Toast Day';
                break;
            case (d = 0):
                p.textContent = 'Sunday Brunch. Special times apply.';
                break;
        };
        card.appendChild(p);
    }
})
