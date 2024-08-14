let width = 1200; //длина картинки
if (width > document.documentElement.clientWidth){
    width = document.documentElement.clientWidth;
}
document.documentElement.style.setProperty('--img-width', width + "px"); //ставим ширину картинки


let authorName={ //что то типо БД
    ini_ga:{
        "text": "Ini_ga", //имя автора, которое будет отображаться
        // "link": "leafcity.ru/head/ini_ga", //ссылка на его голову (от скина)
        "link": "other-img/ini_ga.webp", //ссылка на его голову (от скина)
        "screens_num": [0,1,2], //номера скринов, сделанных этим игроком
    },
    noname:{
        "text": "noname",
        "link": "",
        "screens_num": [],
    }
};
let authorNameResult = { //уже полученные данные
    pl_text:null,
    hd_link:null,
};
// document.documentElement.style.setProperty('--img-border-width', imgBorderWidth + "px"); //ставим ширину border'а для картинки
// let numOfBtn = 0;

// function getInfoAbPackage(fileName){
//     import { authorName } from ("BDForSite/" + fileName + ".js");
// }

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
    swipeRatio = 0.2, //множитель, отвечающий за то, насколько далеко нужно провести пальцем или курсором вбок, чтобы перелестнуть 
    posThreshold = slides[0].offsetWidth * swipeRatio,
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

        // prev.classList.toggle('disabled', slideIndex === 0);
        // next.classList.toggle('disabled', slideIndex === --slides.length);
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
    if(window.innerWidth < 561){ //если экран меньше 561px
        document.getElementById("authorNameForMobile").innerHTML= authorNameResult.pl_text;
        document.getElementById("authorHeadForMobile").src = authorNameResult.hd_link;
    }
    else{
        document.getElementsByClassName("screen__author-name")[slideIndex].innerHTML= authorNameResult.pl_text;
        document.getElementsByClassName("screen__author-head")[slideIndex].src = authorNameResult.hd_link;
    }
} 
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
    // if (event.key == "Escape" || event.key == "Backspace"){
        
    // }
});
