"use strict"

const toggle = document.querySelector('.toggle')
const overlay = document.querySelector('.overlay')
const selectCards = document.querySelectorAll('.select-content > .bg-cyan:not(.disabled)')
const modal = document.querySelector('.modal')
const labelCards = document.querySelectorAll('label[class="card"]')
const form = document.forms[0]
const support = document.querySelector('.support')
const backers = document.querySelector('.information--backers')

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
        html = `
        <div class="submit--content">
            <p>Enter your pledge</p>
            <div class="submit--content_pledge">
                <label class="pledge-label" for="form-value">
                    <input type="text" id="form-value" maxlength="4" ${card.htmlFor === "no-reward" ? 'value="0" disabled' : ''} required>
                </label>
                <button type="submit" class="bg-cyan">Continue</button>
            </div>
        </div>
        `
        labelCards.forEach(lCard => {
            if(+lCard.dataset.spam === 0) {
                console.log(lCard.dataset.spam);
                lCard.removeChild(lCard.lastElementChild)
                lCard.dataset.spam = "1"
            }
        })
        card.insertAdjacentHTML('beforeend', html);
        card.dataset.spam = "0"
    }
})

let money = 0;

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const mainInput = Array.from(form.elements).find(input => input.id === "form-value")
    const valueInput = mainInput.value
    if (valueInput.length >= 2 && Number.isInteger(+valueInput) && +valueInput >= 25 || mainInput.disabled) {
        money = +valueInput
        modal.classList.remove('active')
        support.classList.add('active')
        support.addEventListener('click', (e) => {
            if(e.target.classList.contains('bg-cyan')) {
                support.classList.remove('active')
                removeOverlay()
            }
        })
        addBackers(money)
        mainInput.closest('.card').children[0].children[0].checked = false
        mainInput.closest('.card').dataset.spam = "1"
        mainInput.closest('.submit--content').remove()
        return true
    }
    return false
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

let moneyBacker = 89914

function addBackers(x) {
    moneyBacker += x
    backers.textContent = "$"+new Intl.NumberFormat('en-GB').format(moneyBacker)
}