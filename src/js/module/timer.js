export default function timer(deadline) {
    countDown('.timer', deadline);

    function countDown (id, endtime) {
        const clock = document.querySelector(id);
        const daysSpan = clock.querySelector('#days');
        const hoursSpan = clock.querySelector('#hours');
        const minutesSpan = clock.querySelector('#minutes');
        const secondsSpan = clock.querySelector('#seconds');
        const countDownDate = Date.parse(endtime);
        const t = setInterval(function() {
            const now = parseInt((new Date().getTime()));
            const distance = countDownDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            daysSpan.innerHTML = days;
            hoursSpan.innerHTML = ('0' + hours).slice(-2);
            minutesSpan.innerHTML = ('0' + minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + seconds).slice(-2);
            if (distance < 0) {
                document.querySelector('.promotion').style.display = 'none';
            }
        }, 1000);
    }
}