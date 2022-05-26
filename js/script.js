"use strict";
window.addEventListener('DOMContentLoaded',() =>{
    //Tabs implemetation 
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) =>{
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    //Tabs implemetation  end 

    //Timer implementation

    const deadLine = '2022-06-01';

    function getTimeRemaining(endTime){
        let days, hours, minutes, seconds;
        const t = Date.parse(endTime) - Date.parse(new Date());

        if(t<=0){
            days=0;
            hours=0;
            minutes=0;
            seconds=0;
        }else{
            days = Math.floor( (t / (1000*60*60*24)) );
            hours = Math.floor( (t / (1000*60*60)%24) );  
            minutes = Math.floor( t / (1000*60)%60);   
            seconds = Math.floor( (t / 1000) % 60 );  
        }    
        return {
            'time': t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds 
        };
    }

    function correctNum(num){
        if(num>=0 && num <10){
            return `0${num}`;
        }else{
            return num;
        }

    }
    function clockRefresh(selector , endTime){
        const timeWrapper = document.querySelector(selector),
                daysSel = timeWrapper.querySelector('#days'),
                hoursSel = timeWrapper.querySelector('#hours'),
                minutesSel = timeWrapper.querySelector('#minutes'),
                secondsSel = timeWrapper.querySelector('#seconds'),
                timeInterval = setInterval(updateClock,1000);
        updateClock();

        function updateClock(){
            const remainingTotalTime = getTimeRemaining(endTime);

            daysSel.innerHTML=correctNum(remainingTotalTime.days);
            hoursSel.innerHTML=correctNum(remainingTotalTime.hours);
            minutesSel.innerHTML=correctNum(remainingTotalTime.minutes);
            secondsSel.innerHTML=correctNum(remainingTotalTime.seconds);
    
            if(remainingTotalTime.t<=0){
                clearInterval(timeInterval);
            }
        }


    }
    clockRefresh('.timer', deadLine);
    //Timer implementation end

    //Modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalClose = document.querySelector('[data-close]');
    
    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach((item) => {
        item.addEventListener('click', openModal);
    });

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if(e.target===modal){
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    //Modal window end

    //Use classes for cards

    class MenuCard{
        constructor(src, alt, title, description, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description= description;
            this.price=price;
            this.classes = classes ;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToGRN();
        }

        changeToGRN(){
            this.price = this.price * this.transfer;
        }

        render (){
            const element = document.createElement('div');
            if(this.classes.length==0){
                element.classList.add('menu__item');
            }else{
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML= `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parent.append(element);
        }
    }
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        10,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        '.menu .container',
        'menu__item'
    ).render();

    
    //Use classes for cards end
});


 