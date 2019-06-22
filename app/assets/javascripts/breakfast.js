document.addEventListener('DOMContentLoaded', function() {
    const card = document.getElementById('breakfast-card-text');
    let p = document.createElement('p');
    let d = new Date();
    let n = d.getDay();
    console.log(card);
    switch(n) {
        case (n = 2) || (n = 4) || (n = 6):
            p.innerHTML = 'Egg Day';
            card.appendChild(p);
            break;
        case (n = 1) || (n = 5):
            p.innerHTML = 'Pancake Day';
            card.appendChild(p);
            break;
        case (n = 3):
            p.innerHTML = 'French Toast Day';
            card.appendChild(p);
            break;
        case (n = 0):
            p.innerHTML = 'Sunday Brunch. Special times apply.';
            card.appendChild(p);
            break;
    };
    console.log(p);
});