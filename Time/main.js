import dayjs from './node_modules/dayjs'
const _ = dayjs()

function updateTime() {
    const hours = String(_.hour()).padStart(2, '0');
    const minutes = String(_.minute()).padStart(2, '0');
    const seconds = String(_.second()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('time').textContent = timeString;
}

updateTime(); // Update time immediately

// Update time every second
setInterval(updateTime, 1000);


