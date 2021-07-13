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
    navbarMenu.classList.remove('open');
    scrollInto(link);
    //selectNavItem(target);
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

// 1. 모든 섹션 요소들r과 메뉴 아이템들을 가지고 온다.
// 2. IntersectionObserver 를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다. 

const sectionIds = ['#home','#about','#skills','#work','#testimonials','#contact'];
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
const sections = sectionIds.map(id => document.querySelector(id));

let selectedNavIndex;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
    selectedNavItem.classList.remove('active'); //이전에 활성화 된 id 지워주기 
    selectedNavItem=selected;
    selectedNavItem.classList.add('active'); //활성화 하기
}

//methods
function scrollInto(selector){
    const scrollTo=document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const options ={
    root : null,
    rootMargin: '0px',
    threshold : 0.3,
};

const callback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            //스크롤링이 아래로 되어서 페이지가 올라가는 경우
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index + 1;
            } else { //스크롤링이 위로 올라가서 페이지 내려가는 경우
                selectedNavIndex =index - 1;
            } 
            
            selectNavItem(navItems[selectedNavIndex]);
        }
    });
};

const observer = new IntersectionObserver(callback,options);
sections.forEach(section => observer.observe(section));

window.addEventListener('scroll', () => {
    if(window.scrollY === 0 ){
        selectedNavIndex=0;
    } else if(Math.round(window.scrollY+window.innerHeight)>=document.body.clientHeight){
        selectedNavIndex= navItems.length-1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});
