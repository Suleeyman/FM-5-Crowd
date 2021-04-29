const toggle = document.querySelector('.toggle')
const overlay = document.querySelector('.overlay')
const selectCards = document.querySelectorAll('.select-content > .bg-cyan:not(.disabled)')

toggle.addEventListener('click', toggleNavbar)
overlay.addEventListener('click', toggleNavbar)

selectCards.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault()
        console.log(btn.dataset);
    })
})

document.addEventListener('keyup', (e) => {
    console.log(e.key);
    if(e.key === 'Escape' && (countToggle % 2) === 1) {
        toggleNavbar()
    }
})


let countToggle = 0;

function toggleNavbar() {
    countToggle++;
    toggle.nextElementSibling.classList.toggle('is-open')
    if ((countToggle % 2) === 1) {
        toggle.src = "./images/icon-close-menu.svg"
        document.body.style.overflowY = "hidden"
        overlay.classList.add('active')
        toggle.closest('nav').style.zIndex = "2"
    } else {
        toggle.src = "./images/icon-hamburger.svg"
        document.body.style.overflowY = "auto"
        overlay.classList.remove('active')
        toggle.closest('nav').style.zIndex = "0"
    }
}