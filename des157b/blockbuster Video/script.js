
(function() {
    'use strict';
    console.log('reading');
    const myVideo = document.querySelector('#myVideo');
    const fs = document.querySelector('.fa-expand');
    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');
    const line4 = document.querySelector('#line4');
    const line5 = document.querySelector('#line5');
    const line6 = document.querySelector('#line6');
    const line7 = document.querySelector('#line7');
    const line8 = document.querySelector('#line8');
    const poem = {
        start: [0, 1.2, 5, 10, 12, 20.8, 25.5, 28],
        stop: [3, 4, 9, 11, 19, 24, 27.4, 31],
        line: [line1, line2, line3, line4, line5, line6, line7, line8]
    }

    const intervalID = setInterval(checkTime, 1000);
    
    function checkTime() {
        for (let i = 0; i < poem.start.length; i++) {
            if (poem.start[i] < myVideo.currentTime && myVideo.currentTime < poem.stop[i]) {
                poem.line[i].className = "showing";
            } else {
                poem.line[i].className = "hidden";
            }
        }
    }

    fs.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();

        }
    })
})()