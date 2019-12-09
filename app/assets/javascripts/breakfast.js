$(document).ready(function() {
    const card = document.querySelector('#breakfast-card-text');
    if (card) {
        let p = document.createElement('p');
        let d = new Date().getDay();
        if (d === 2 || d === 5) {
            p.innerHTML = 'Egg Day'
        } else if (d === 1 || d === 6) {
            p.innerHTML = 'Pancake Day'
        } else if (d === 3) {
            p.innerHTML = 'French Toast Day'
        } else if (d === 0) {
            p.innerHTML = 'Sunday Brunch. Special times apply.'
        }
        card.appendChild(p);
    }
})
