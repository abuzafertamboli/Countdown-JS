const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// let futureDate = new Date(2023, 11, 29, 11, 30, 0);
let futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

const year = futureDate.getFullYear();

let month = futureDate.getMonth();
month = months[month];

const date = futureDate.getDate();

// const days = new Date(futureDate).toLocaleString('en-US', { weekday: 'long' });
let weekday = futureDate.getDay();
weekday = weekdays[weekday];

const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

giveaway.textContent = `Giveaway ends on ${weekday}, ${date} ${month} ${year}, ${hours}:${minutes}am`;

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
    const today = new Date().getTime();
    const t = futureTime - today;
    // 1s = 1000ms
    // 1m = 60s
    // 1hr = 60m
    // 1d = 24hr

    // values in ms
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    // calculate all values
    let days = t / oneDay;
    days = Math.floor(days);

    let hours = (t % oneDay) / oneHour;
    hours = Math.floor(hours);

    let minutes = (t % oneHour) / oneMinute;
    minutes = Math.floor(minutes);

    let seconds = (t % oneMinute) / 1000;
    seconds = Math.floor(seconds);

    // set values array
    const values = [days, hours, minutes, seconds];
    
    function format(item) {
        if (item < 10) {
            return `0${item}`
        }
        return item;
    }

    items.forEach((item, index) => {
        item.innerHTML = format(values[index]);
    })

    if (t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has been expired.</h4>`
    }
}

let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();