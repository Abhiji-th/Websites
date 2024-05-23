import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone';

import MicroModal from 'micromodal';

dayjs.extend(timezone)
const d = new dayjs()

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsOfYear = [
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
    "December"
];

function updateTime() {

    const d = new dayjs()
    const hours = String(d.hour()).padStart(2, '0');
    const minutes = String(d.minute()).padStart(2, '0');
    const seconds = String(d.second()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    const userTimezone = dayjs.tz.guess();

    const dayNumber = d.day();
    const day = daysOfWeek[dayNumber];
    const date = d.date();
    const monthNumber = d.month();
    const month = monthsOfYear[monthNumber];
    const year = d.year()
    const dateString = `${day}, ${date} ${month}, ${year}`;

    document.getElementById('time').textContent = timeString;
    document.getElementById('timezone').textContent = userTimezone;
    document.getElementById('date').textContent = dateString;
    
}

// Update time immediately
updateTime(); 
// Update time every second
setInterval(updateTime, 1000);









