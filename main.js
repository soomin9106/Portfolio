'use strict'

//Make navbar transparent when it is on the top
const navbar=document.querySelector('#navbar');
const navbarHeight=navbar.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{
    if(window.scrollY>navbarHeight){
        navbar.classList.add('navbar--dark');
    } else{
        navbar.classList.remove('navbar--dark');
    }
});

//Handle scrolling when tapping on the navbar menu
const navbarMenu=document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click',(event)=>{
    const target=event.target;
    const link=target.dataset.link;
    if(link==null){
        return;
    }

   scrollIntoView(link);
});


//Handle scrolling when tapping 'Contact Me' button on home
const homeContact=document.querySelector('.home__contact');
homeContact.addEventListener('click',()=>{
    scrollIntoView('#contact');
});


//Make home slowly fade to transparent as the window scrolls down.home__contact
const home=document.querySelector('.home__container');
const homeHeight=home.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{
    home.style.opacity=1-window.scrollY/homeHeight;
});


//methods
function scrollIntoView(selector){
    const scrollToContact=document.querySelector(selector);
    scrollToContact.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}
