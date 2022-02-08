const scrollable = document.querySelector('.scrollable')
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: " + (e.pageY - 6) + "px; left: " + (e.pageX - 6) + "px;");
});

let current = 0;
let target =0;
let ease = 0.075;

function lerp(start, end, time){
    return start * (1 - time) + end * time;  
}

function init(){
    document.body.style.height = `${scrollable.getBoundingClientRect().height}px`;
}

function smoothScroll(){
    target = window.scrollY;
    current = lerp(current, target, ease);
    scrollable.style.transform = `translate3d(0,${-current}px, 0)`;
    requestAnimationFrame(smoothScroll)
}

$(function(){
    var shrinkHeader = 200;
     $(window).scroll(function() {
       var scroll = getCurrentScroll();
         if ( scroll >= shrinkHeader ) {
              $('.header').addClass('shrink');
           }
           else {
               $('.header').removeClass('shrink');
           }
     });
   function getCurrentScroll() {
       return window.pageYOffset || document.documentElement.scrollTop;
       }
});

AOS.init({
    duration: 1400,
})

init()
smoothScroll()


