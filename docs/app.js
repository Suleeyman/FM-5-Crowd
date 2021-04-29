"use strict"

const toggle = document.querySelector('.toggle')
const overlay = document.querySelector('.overlay')
const selectCards = document.querySelectorAll('.select-content > .bg-cyan:not(.disabled)')
const modal = document.querySelector('.modal')
const labelCards = document.querySelectorAll('label[class="card"]')
const form = document.forms[0]
const support = document.querySelector('.support')

toggle.addEventListener('click', toggleNavbar)

selectCards.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault()
        modal.classList.add('active')
        addOverlay()
    })
})

document.addEventListener('keyup', (e) => {
    if(e.key === 'Escape' && (countToggle % 2) === 1) {
        toggleNavbar()
    }
})

let html; // HTML Element

modal.addEventListener('click', (e) => {

    if(e.target.closest('svg')) {
        modal.classList.remove('active')
        removeOverlay()
    }

    if(e.target.closest('.card') && +e.target.closest('.card').dataset.spam) {
        const card = e.target.closest('.card')
        card.dataset.spam = "0"
        if(card.htmlFor === "no-reward") {
            html = `
            <div class="submit--content">
                <p>Enter your pledge</p>
                <div class="submit--content_pledge">
                    <label class="pledge-label" for="bamboo-pledge">
                        <input type="text" id="bamboo-pledge" maxlength="4" disabled>
                    </label>
                    <button type="submit" class="bg-cyan">Continue</button>
                </div>
            </div>
            `
        } else {
            html = `
            <div class="submit--content">
                <p>Enter your pledge</p>
                <div class="submit--content_pledge">
                    <label class="pledge-label" for="bamboo-pledge">
                        <input type="text" id="bamboo-pledge" maxlength="4">
                    </label>
                    <button type="submit" class="bg-cyan">Continue</button>
                </div>
            </div>
            `
        }
        card.insertAdjacentHTML('beforeend', html);
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    modal.classList.remove('active')
    support.classList.add('active')
    support.addEventListener('click', (e) => {
        if(e.target.classList.contains('bg-cyan')) {
            support.classList.remove('active')
            removeOverlay()
        }
    })
})

let countToggle = 0;

function toggleNavbar() {
    countToggle++;
    toggle.nextElementSibling.classList.toggle('is-open')
    if ((countToggle % 2) === 1) {
        toggle.src = "./images/icon-close-menu.svg"
        toggle.closest('nav').style.zIndex = "2"
        addOverlay()
    } else {
        toggle.src = "./images/icon-hamburger.svg"
        toggle.closest('nav').style.zIndex = "0"
        removeOverlay()
    }
}

function addOverlay() {
    overlay.classList.add('active')
    document.body.style.overflowY = "hidden"
}

function removeOverlay() {
    overlay.classList.remove('active')
    document.body.style.overflowY = "auto"
}