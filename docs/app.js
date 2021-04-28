const toggle = document.querySelector('.toggle')
const overlay = document.querySelector('.overlay')

let countToggle = 0;
toggle.addEventListener('click', () => {
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
})