const toggle = document.querySelector('.toggle')

toggle.addEventListener('click', () => {
    console.log(toggle.nextElementSibling);
    toggle.nextElementSibling.classList.toggle('is-open')
})