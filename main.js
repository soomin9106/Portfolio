'use strict'
//methods
function scrollInto(selector){
    const scrollTo=document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}

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
    navbarMenu.classList.remove('open');
    scrollInto(link);
});

//show menus when clicking navbar__togle-btn
const toggleBtn=document.querySelector('.navbar__toggle-btn');
toggleBtn.addEventListener('click',() => {
    navbarMenu.classList.toggle('open');
});

//Handle scrolling when tapping 'Contact Me' button on home
const homeContact=document.querySelector('.home__contact');
homeContact.addEventListener('click', () => {
    scrollInto('#contact');
});


//Make home slowly fade to transparent as the window scrolls down.home__contact
const home=document.querySelector('.home__container');
const homeHeight=home.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{
    home.style.opacity=1-window.scrollY/homeHeight;
});

//Show "arrow-up" button when scrolling down
const arrowUp=document.querySelector('.arrow-up');
document.addEventListener('scroll',()=>{
    if(window.scrollY>(homeHeight/2)){
        arrowUp.classList.add('visible');
    } else{
        arrowUp.classList.remove('visible');
    }
});

//Handle scrolling when tapping 'arrow-up' button on home
arrowUp.addEventListener('click',()=>{
    scrollInto('#home');
});

//My work filtering
const categoryBtn=document.querySelector('.work__categories');
const projectContainer= document.querySelector('.work__projects');
const projects=document.querySelectorAll('.projects');
categoryBtn.addEventListener('click',(event)=>{
    const filter=event.target.dataset.filter;
    if(filter === null){
        return ;
    } 
    
    //Remove Selection from the previous item and select the new one
    const active=document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const targets= 
    event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
    targets.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(()=>{
        projects.forEach((project) => {
            if( filter === '*' || project.dataset.type === filter){
                project.classList.remove('invisible');
            } else{
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    },300);
});


