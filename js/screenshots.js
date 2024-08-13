let imgWidth = 1200; //ширина картинок
let imgBorderWidth = 10; //ширина border'а у картинок
let imgMargin = 20; //отступ у картинок (по бокам, чтобы не занимали всю страницу)
let imgMarginleft = 3; //марджин слева, чтобы центрировать картинки
let userWidth = document.documentElement.clientWidth; //ширина окна браузера у пользователя (с вычитом overflow-y)

let mobileMod = false; //версия для телефона

//адаптация
if (userWidth < imgWidth) {
    imgWidth = userWidth - imgMargin; //если устройство уже 1200px, высчитываем ширину картинки
}
if (userWidth < 800){
    imgBorderWidth = 5;
    imgMarginleft = 8;
}
if (userWidth < 561){
    imgBorderWidth = 0;
    imgMarginleft = 13;
    imgMargin = 0;
    mobileMod = true;
}

console.log("ширина окна пользователя = "+window.innerHeight);

let width = imgWidth + (imgBorderWidth * 2); //вычисляем длину картинки с учетом border'а с двух сторон картинки (+5 чтобы картинки вставали ровно)
let count = 1;// видимое количество изображений

let list = document.getElementById("need");

let closingOthers = document.getElementById("closingOthers");

let author = document.getElementById("authorContainerForMobile");

let mainHeader = document.getElementById("main-header");

let authorName={ //что то типо БД
    ini_ga:{
        "text": "Ini_ga", //имя автора, которое будет отображаться
        // "link": "leafcity.ru/head/ini_ga", //ссылка на его голову (от скина)
        "link": "other-img/player-heads/ini_ga.webp", //ссылка на его голову (от скина)
        "screens_num": [0,1,2], //номера скринов, сделанных этим игроком
    },
    noname:{
        "text": "noname",
        "link": "",
        "screens_num": [],
    }
};
let numOfScreenshot = 0;
let authorNameResult = { //уже полученные данные
    pl_text:null,
    hd_link:null,
};

document.documentElement.style.setProperty('--img-width', imgWidth + "px"); //ставим ширину картинки
// document.documentElement.style.setProperty('--img-border-width', imgBorderWidth + "px"); //ставим ширину border'а для картинки
// let numOfBtn = 0;

let position = 0; // положение ленты прокрутки

closingOthers.style.height = window.innerHeight + "px";
closingOthers.style.display = "none";

// function getInfoAbPackage(fileName){
//     import { authorName } from ("BDForSite/" + fileName + ".js");
// }

function setBtnPos(){ //ставит кнопки для прокрутки в нужное положение
    let image = document.getElementsByClassName("screenshot");
    let btnMargin = 20;
    let btnMarginTopForMobile = 30;
    
    leftBtn.style.left = leftBtn.offsetWidth/1.65 +"px";
    rightBtn.style.left = image[0].offsetWidth - (rightBtn.offsetWidth/1.35) +"px";

    if (userWidth >= 561){
        leftBtn.style.top = image[0].offsetHeight/2 + "px";
        rightBtn.style.top = image[0].offsetHeight/2 + "px";
    }
    else{
        author.style.bottom =  -btnMarginTopForMobile - btnMargin - (btnMargin/2)  + "px";
        author.style.left = image[0].offsetWidth/1.5 - author.offsetWidth + "px";
    }
}
//из интернета
let slider = document.getElementById("screenshotsBody"),
    sliderList = document.getElementById("screenshots"),
    sliderTrack = document.getElementById("need");
    slides = document.getElementsByClassName("screensh-container");
    sliderTrack.style.width = slides.length * width + "px";
    prev = document.getElementById("leftBtn");
    next = document.getElementById("rightBtn");
    slideWidth = slides[0].offsetWidth,
    slideIndex = 0,
    posInit = 0,
    posX1 = 0,
    posX2 = 0,
    posY1 = 0,
    posY2 = 0,
    posFinal = 0,
    isSwipe = false,
    isScroll = false,
    allowSwipe = true,
    transition = true,
    nextTrf = 0,
    prevTrf = 0,
    lastTrf = --slides.length * slideWidth,
    posThreshold = slides[0].offsetWidth * 0.35,
    trfRegExp = /([-0-9.]+(?=px))/,
    dontTouch = false, //не изменять slideIndex
    
    getEvent = function() {
        return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    },
    slide = function() {
        if (transition) {
            sliderTrack.style.transition = 'transform .5s';
        }
        sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

        setValues();

        prev.classList.toggle('disabled', slideIndex === 0);
        next.classList.toggle('disabled', slideIndex === --slides.length);
    },
    swipeStart = function() {
        let evt = getEvent();

        if (allowSwipe) {

            transition = true;

            nextTrf = (slideIndex + 1) * -slideWidth;
            prevTrf = (slideIndex - 1) * -slideWidth;

            posInit = posX1 = evt.clientX;
            posY1 = evt.clientY;

            sliderTrack.style.transition = '';

            document.addEventListener('touchmove', swipeAction);
            document.addEventListener('mousemove', swipeAction);
            document.addEventListener('touchend', swipeEnd);
            document.addEventListener('mouseup', swipeEnd);

            sliderList.classList.remove('grab');
            sliderList.classList.add('grabbing');
        }
    },
    swipeAction = function() {
        let evt = getEvent(),
            style = sliderTrack.style.transform,
            transform = +style.match(trfRegExp)[0];

            posX2 = posX1 - evt.clientX;
            posX1 = evt.clientX;

            posY2 = posY1 - evt.clientY;
            posY1 = evt.clientY;

        // определение действия свайп или скролл
        if (!isSwipe && !isScroll) {
            let posY = Math.abs(posY2);
            if (posY > 7 || posX2 === 0) {
                isScroll = true;
                allowSwipe = false;
            } else if (posY < 7) {
                isSwipe = true;
            }
        }

        if (isSwipe) {
            // запрет ухода влево на первом слайде
            if (slideIndex === 0) {
                if (posInit < posX1) {
                    slideIndex = slides.length - 1;
                    setTransform(transform, slideIndex * width);
                    dontTouch = true; //чтобы не как не изменялась slideIndex
                    return;
                }
                allowSwipe = true;
            }

            // запрет ухода вправо на последнем слайде
            if (slideIndex === --slides.length) {
                if (posInit > posX1) {
                    slideIndex = 0;
                    setTransform(transform, -width);
                    dontTouch = true; //чтобы не как не изменялась slideIndex
                    return;
                }
               allowSwipe = true;
            }

            // запрет протаскивания дальше одного слайда
            if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
                reachEdge();
                return;
            }
            // двигаем слайд
            sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
        }

    },
    swipeEnd = function() {
        posFinal = posInit - posX1;

        isScroll = false;
        isSwipe = false;

        document.removeEventListener('touchmove', swipeAction);
        document.removeEventListener('mousemove', swipeAction);
        document.removeEventListener('touchend', swipeEnd);
        document.removeEventListener('mouseup', swipeEnd);

        sliderList.classList.add('grab');
        sliderList.classList.remove('grabbing');

        if (allowSwipe) {
            if (Math.abs(posFinal) > posThreshold && !dontTouch) {
                if (posInit < posX1) {
                    slideIndex--;
                } else if (posInit > posX1) {
                    slideIndex++;
                }
            }
            dontTouch=false;

            if (posInit !== posX1) {
                allowSwipe = false;
                slide();
            } else {
                allowSwipe = true;
            }

        } else {
            allowSwipe = true;
        }

    },
    setTransform = function(transform, comapreTransform) {
        if (transform >= comapreTransform) {
            if (transform > comapreTransform) {
                sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
            }
        }
        allowSwipe = false;
    },
    reachEdge = function() {
        transition = false;
        swipeEnd();
        allowSwipe = true;
    };

function checkScreenshotAuthor(numOfScreenshot){ //достаем из authorName инфу для скриншотов
    const NAME = "text";
    const LINK = "link";
    const SCREENS_NUM = "screens_num";

    // let text = null;
    // let link = null;
    // let screens_num = null;

    const getInfo = data => {
        for( let name in data ){
            let info = data[ name ];

            let text = info[ NAME ];
            let link = info[ LINK ];
            let screens_num = info[ SCREENS_NUM ];
            for(i=0;i < slides.length;i++){
                if(screens_num[i] == numOfScreenshot){
                    authorNameResult = {
                        pl_text: text,
                        hd_link: link,
                    };
                    break;
                }
            }
        }
    }
    getInfo( authorName );
}

function setValues(){
    checkScreenshotAuthor(slideIndex);
    if(mobileMod){ //если экран меньше 561px
        document.getElementById("authorNameForMobile").innerHTML= authorNameResult.pl_text;
        document.getElementById("authorHeadForMobile").src = authorNameResult.hd_link;
    }
    else{
        document.getElementsByClassName("screen__author-name")[slideIndex].innerHTML= authorNameResult.pl_text;
        document.getElementsByClassName("screen__author-head")[slideIndex].src = authorNameResult.hd_link;
    }
} 

document.addEventListener("DOMContentLoaded",setBtnPos);
setValues();
sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);

prev.addEventListener("click", () => {
    if(slideIndex != 0){
        slideIndex--; 
    }
    else{
        slideIndex = slides.length - 1;
    }
    slide()
});
next.addEventListener("click", () => {
    if (slideIndex < slides.length - 1){
        slideIndex++;
    }
    else{
        slideIndex = 0;
    }
    slide()
});

document.addEventListener("keydown", function(event){ //управление клавиатурой
    if (event.key == "ArrowLeft"){
        if (slideIndex != 0){
            slideIndex--;
        }
        else{
            slideIndex = slides.length - 1;
        }
        slide();
    }
    if (event.key == "ArrowRight"){
        if (slideIndex < slides.length - 1){
            slideIndex++;
        }
        else{
            slideIndex = 0;
        }
        slide();
    }
    if (event.key == "Escape" || event.key == "Backspace"){
        
    }
});
