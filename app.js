'use strict'
/*************
**TOGGLE NAV*
*************/
const toggle = document.querySelector('#toggle')
const menu = document.querySelector('.menu')

toggle.addEventListener('click', () => {
    menu.classList.toggle('visible')
    if(toggle.src.match(/hamburger/g) == null) {
        toggle.src = "images/icon-hamburger.svg"
    } else {
        toggle.src = "images/icon-close-menu.svg"
    }
})

/*******
BOOKMARK 
********/

const bookmarked = document.querySelector('#bookmark')
const circle = document.querySelector('circle')
const path = document.querySelector('path')

bookmarked.addEventListener('click', () => {
    if(bookmarked.children[1].className == "bookmark") {
        bookmarked.children[1].textContent = 'Bookmark'
    } else {
        bookmarked.children[1].textContent = 'Bookmarked'
    }
    bookmarked.children[1].classList.toggle('bookmark')
    circle.classList.toggle('bookmark')
    path.classList.toggle('bookmark')
})

/****VALIDATE A RADIO INPUT IN CLICKING THE CARD ****/

const modal_cards = document.querySelectorAll('.modal-cards')

modal_cards.forEach(modal => {
    modal.addEventListener('click', radioInput)
})

let booleanValue = true

function radioInput() {
    this.children[0].children[0].checked = true
   
}

/******OPEN THE MODAL****** */

const buttonDisplay = document.querySelectorAll('.open-modal')
const modal = document.querySelector('.modal-start')
const overlay = document.querySelector('.overlay')

buttonDisplay.forEach(btn => {
    btn.addEventListener('click', displ_Ay)
})

overlay.addEventListener('click', overflowAuto)

function displ_Ay() {
    modal.classList.add('opened-modal')
    document.querySelector('body').style.overflowY = "hidden";
    overlay.classList.add('opened-overlay')
    document.addEventListener('keyup', (e) => {
        if(e.key === 'Escape') {
            overflowAuto()
        }
    })
}

function overflowAuto() {
    modal.classList.remove('opened-modal')
    document.querySelector('body').style.overflowY = "auto";
    overlay.classList.remove('opened-overlay')
}

//CLOSE MODAL
document.getElementById('modal-close').addEventListener('click', () => {
    modal.classList.remove('opened-modal');
})

/****PLEDGE MONEY *****/

const inputNum = document.querySelector('input[type="text"]')
const btnPledge = document.querySelector('button[type="submit"')

btnPledge.addEventListener('click', (e) => {
    if(inputNum.value === '0' || inputNum.value.match(/[0-9]/g) === null || inputNum.value.match(/[0-9]/g).length !== inputNum.value.length) {
        e.preventDefault()
        alert('Empty value, or wrong value')
    } else {
        addMoney(Number(inputNum.value))
        addBackers()
        /* then close the modal */
        overflowAuto()
    }
})

const money = document.getElementById('money')
const backers = document.getElementById('backers')

function addBackers() {
    let backersFinal = Number(backers.textContent.match(/\d/g).join(''))
    backers.textContent = split_comma((backersFinal + 1).toString(), backersFinal.toString().length - 3)
}

function addMoney(x) {
    let moneyFinal = Number(money.textContent.match(/\d/g).join('')) + x
    money.textContent = '$' + split_comma(moneyFinal.toString(), moneyFinal.toString().length - 3)
}

function split_comma(value, index)
{
    return value.substring(0, index) + "," + value.substring(index);
}