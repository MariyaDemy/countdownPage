//countdown to December, 31 2022 from today
let finishDate = new Date(("Dec 30, 2022 24:00:00")).getTime();
let emailInput = document.querySelector('.footer__email');
let emailForm = document.querySelector('.footer__form');
let error = document.querySelector('.error');
let emailBtn = document.querySelector('.footer__btn');
let popupClose = document.querySelector('.popup__close');
let popupBtn = document.querySelector('.popup__btn');
let popup = document.querySelector('.popup');
let popupTitle = document.querySelector('.popup__title');
let popupText = document.querySelector('.popup__text');



const tick = () => {
    let now = new Date().getTime();
    let t = finishDate - now;
    if (t > 0) {
        let days = Math.floor(t / (1000 * 60 * 60 * 24));
        if (days < 10) {
            days = "0" + days
        };
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        if (hours < 10) {
            hours = "0" + hours
        }
        let mins = Math.floor((t / 1000 / 60) % 60);
        if (mins < 10) {
            mins = "0" + mins
        }
        let secs = Math.floor((t / 1000) % 60);
        if (secs < 10) {
            secs = "0" + secs
        }

        let time = `${days} : ${hours} : ${mins} : ${secs}`;

        document.querySelector(".countdown__nums").innerHTML = time;
    }
}

let timer = setInterval(tick, 1000);

let mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validate = () => {
    if (emailInput.value === "") {
        error.style.visibility = 'hidden';
    } else if (!emailInput.value.match(mailRegex)) {
        error.style.visibility = 'visible';
    } else {
        error.style.visibility = 'hidden';
    }
}

emailInput.addEventListener('input', validate);

const showPopUp = () => {
    popup.classList.add('active');
}

const hidePopUp = () => {
    popup.classList.remove('active')
}

popupBtn.addEventListener('click', hidePopUp)
popupClose.addEventListener('click', hidePopUp)

emailForm.onsubmit = async (e) => {
    e.preventDefault();
    let response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: new FormData(document.querySelector('.footer__form'))
    }).then(function (response) {
        if (emailInput.value !== "") {
            showPopUp();
        }
    }).catch(function (error) {
        showPopUp();
        popupTitle.innerHTML = `Something went wrong!`;
        popupText.innerHTML = `We're working hard on it. You may refresh the page or try again later`

    })
};