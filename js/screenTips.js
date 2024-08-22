// const liksToServers = {
//     "LeafCity": "https://leafcity.ru/",
//     // "LeafCityHasMap": true,
//     "LeafCityMap": "https://leafcity.ru/backend/survival?nocache=1723984503762#minecraft_overworld;flat;",
// };
// let containers = document.getElementsByClassName("screen__info");

// let onContainersBtns = document.getElementsByClassName("screen__info-icon");

// let elems = document.getElementsByClassName("info__generate-cords"); //координаты
// let links = document.getElementsByClassName("info__server"); //ссылки на сервера
// let shaders = document.getElementsByClassName("info__shaders"); //шейдеры
// let seeds = document.getElementsByClassName("info__seed");

// let elemMobile = document.getElementById("infoGenerateCordsForMobile");
// let linkMobile = document.getElementById("infoServerForMobile");
// let shaderMobile = document.getElementById("infoShaderForMobile");


// function copyToClipBoard(elemText, subText){
//     if (subText != undefined){
//         elemText = subText + elemText;
//     }
//     navigator.clipboard.writeText(elemText)
//     .then(() => console.log("Done!"))
//     .catch(err => console.error(err))
// }

// for(i=0;i<containers.length;i++){
//     let elem = elems[i];
//     let link = links[i];
//     let shader = shaders[i];

//     if (window.innerWidth > 560){
//         elem = elemMobile;
//         link = linkMobile;
//         shader = shaderMobile;
//     }

//     // if (liksToServers.hasOwnProperty(link.innerHTML)){
//     //     elem.innerHTML == "неизвестно" ? elem.classList.remove("can-copy") : elem.href = liksToServers[link.innerHTML + "Map"] + elem.innerHTML;
//     //     link.href = liksToServers[link.innerHTML];
//     // }
//     elem.href = liksToServers[link.innerHTML + "Map"] + elem.innerHTML;
//     link.href = liksToServers[link.innerHTML];
//     console.log(link.innerHTML);
//     // if (liksToServers.hasOwnProperty(link.innerHTML)){
//     //     link.href = liksToServers[link.innerHTML];
//     // }
//     if(link.innerHTML === "Одиночный мир"){
//         containers[i].querySelectorAll("p")[2].style.display = 'none';
//         containers[i].querySelectorAll("p")[0].style.display = 'block';
//         console.log("Это одиночный мир");
//     }
//     else{
//         console.log("это сервер");
//         containers[i].querySelectorAll("p")[0].style.display = 'none';
//         containers[i].querySelectorAll("p")[2].style.display = 'block';
//     }
//     // let elem = document.getElementsByClassName("info__generate-cords")[i];
//     // let link = document.getElementsByClassName("info__server")[i];
//     // let shaders = document.getElementsByClassName("info__shaders")[i];
//     // if (liksToServers.hasOwnProperty(link.innerHTML)){
//     //     if (liksToServers[link.innerHTML + "HasMap"]){
//     //         elem.href = liksToServers[link.innerHTML + "Map"] + elem.innerHTML;
//     //         link.href = liksToServers[link.innerHTML];
//     //     }
//     //     else{
//     //         elem.addEventListener("click", () => copyToClipBoard(elem.innerHTML));
//     //         link.addEventListener("click", () => copyToClipBoard(link.innerHTML));
//     //     }
//     // }
//     // else if(link.innerHTML == "нет"){
//     //     containers.querySelectorAll("p")[1].style.display = 'none';
//     // }
//     // shaders.addEventListener("click", () => copyToClipBoard(shaders.innerHTML, "шейдеры "));
// }
// function setLinks(){}
// //     console.log("-----");
// //     for(i=0;i<containers.length;i++){
// //         let elem = elems[i];
// //         let link = links[i];
// //         let shader = shaders[i];
    
// //         if (window.innerWidth > 560){
// //             elem = elemMobile;
// //             link = linkMobile;
// //             shader = shaderMobile;
// //         }
    
// //         // if (liksToServers.hasOwnProperty(link.innerHTML)){
// //         //     elem.innerHTML == "неизвестно" ? elem.classList.remove("can-copy") : elem.href = liksToServers[link.innerHTML + "Map"] + elem.innerHTML;
// //         //     link.href = liksToServers[link.innerHTML];
// //         // }
// //         elem.href = liksToServers[link.innerHTML + "Map"] + elem.innerHTML;
// //         console.log(link.innerHTML);
// //         if (liksToServers.hasOwnProperty(link.innerHTML)){
// //             link.href = liksToServers[link.innerHTML];
// //         }
// //         if(link.innerHTML === "Одиночный мир"){
// //             link.href = null;
// //             containers[i].querySelectorAll("p")[2].style.display = 'none';
// //             containers[i].querySelectorAll("p")[0].style.display = 'block';
// //             console.log("Это одиночный мир");
// //         }
// //         else{
// //             console.log("это сервер");
// //             containers[i].querySelectorAll("p")[0].style.display = 'none';
// //             containers[i].querySelectorAll("p")[2].style.display = 'block';
// //         }
// //     }
// //     console.log("-----");
// // }

// function subFuncForBtns(num){
//     if (window.innerWidth > 560){
//         containers[num].style.right = slideWidth + "px";
//     }
//     containers[num].style.display = "block";
// }
// for(i=0;i<onContainersBtns.length;i++){
//     let a = i;
//     elems[i].addEventListener("click", () => copyToClipBoard(elems[a].innerHTML));
//     shaders[i].addEventListener("click", () => copyToClipBoard(shaders[a].innerHTML, "шейдеры "));
//     seeds[i].addEventListener("click", () => copyToClipBoard(seeds[a].innerHTML));
//     onContainersBtns[i].addEventListener("mouseenter", ()=>subFuncForBtns(a));
// }

// function setText_forMobile(){
//     // elemMobile.textContent = elems[slideIndex].innerHTML;
//     // linkMobile.textContent = links[slideIndex].innerHTML;
//     // shaderMobile.textContent = shaders[slideIndex].innerHTML;
//     // setLinks();
// }
// function checkSlideIndex(isSmallWindow){
//     if (slideIndex != prevSlideIndex){
//         containers[prevSlideIndex].style.display = "none";
//         if(isSmallWindow){
//             setText_forMobile();
//         }
//     }
// }
// setLinks();

// if (window.innerWidth > 560){
//     document.addEventListener("mousedown", ()=>checkSlideIndex(false));
//     document.addEventListener("touchstart",()=>checkSlideIndex(false));
// }
// else{
//     document.addEventListener("touchend", ()=>checkSlideIndex(true));
//     document.addEventListener("mouseup", ()=>checkSlideIndex(true));
// }
const liksToServers = {
    "LeafCity": "https://leafcity.ru/",
    "LeafCityHasMap": true,
    "LeafCityMap": "https://leafcity.ru/backend/survival?nocache=1723984503762#minecraft_overworld;flat;",
    "Одиночный мир":null,
    "Одиночный мирHasMap":false,
};
let containers = document.getElementsByClassName("screen__info");

let onContainersBtns = document.getElementsByClassName("screen__info-icon");

let windowWidthMaxForMobile = 560;

let seedHaveEventListener = false;

function copyToClipBoard(elemText, subText){
    if (window.innerWidth < windowWidthMaxForMobile){
        seedHaveEventListener = true;
    }
    if (subText != undefined){
        elemText = subText + elemText;
    }
    navigator.clipboard.writeText(elemText)
    .then(() => console.log("Done!"))
    // .catch(err => console.error(err))
}

function setLinks(mainObject,subObject){
    if(subObject != undefined){
        window.open(liksToServers[mainObject.innerHTML + "Map"] + subObject.innerHTML);
    }
    else{
        window.open(liksToServers[mainObject.innerHTML]);
    }
    elem.removeEventListener("click", ()=>setLinks(link, elem));
    link.removeEventListener("click", ()=>setLinks(link));
}
function checkCords(){
    if (liksToServers.hasOwnProperty(link.innerHTML)){
        if (liksToServers[link.innerHTML + "HasMap"]){
            elem.classList.add("isLink");
            link.classList.add("isLink");
            elem.removeEventListener("click", () =>copyToClipBoard(elem.innerHTML));
            elem.addEventListener("click", ()=>setLinks(link, elem));
            link.addEventListener("click", ()=>setLinks(link));
            seedContainer.style.display = "none";
            linkContainer.style.display = "block";
        }
        else{
            elem.removeEventListener("click", ()=>setLinks());
            link.removeEventListener("click", ()=>setLinks());
            elem.addEventListener("click", () => copyToClipBoard(elem.innerHTML));
            linkContainer.style.display = "none";
            seedContainer.style.display = "block";
        }
        if(!seedHaveEventListener){
            seed.addEventListener("click", () => copyToClipBoard(seed.innerHTML)); //у него 2 event listenerа, потому что я не разобрался как удалять их
        }
    }
    else if(link.innerHTML == "нет"){
        containers.querySelectorAll("p")[1].style.display = 'none';
    }
}
let containersLenght = containers.length;
if (window.innerWidth < windowWidthMaxForMobile){
    containersLenght = 1;
}
for(i=0;i<containersLenght;i++){
    var elem = document.getElementsByClassName("info__generate-cords")[i];
    var link = document.getElementsByClassName("info__server")[i];
    var linkContainer = containers[i].querySelectorAll("p")[2];
    var shaders = document.getElementsByClassName("info__shaders")[i];
    var seedContainer = containers[i].querySelector("p");
    var seed = document.getElementsByClassName("info__seed")[i];
    if(window.innerWidth < windowWidthMaxForMobile){
        elem = document.getElementById("infoGenerateCordsForMobile");
        link = document.getElementById("infoServerForMobile");
        shaders = document.getElementById("infoShaderForMobile");
        linkContainer = document.getElementById("screenInfoForMobile").querySelectorAll("p")[2];
        seedContainer = document.getElementById("screenInfoForMobile").querySelector("p");
        seed = document.getElementById("infoSeedForMobile");
    }
    checkCords();
    shaders.addEventListener("click", () => copyToClipBoard(shaders.innerHTML, "шейдеры "));
}
function subFuncForBtns(num){
    if (window.innerWidth > windowWidthMaxForMobile){
        containers[num].style.right = slideWidth + "px";
    }
    containers[num].style.display = "block";
}
for(i=0;i<onContainersBtns.length;i++){
    let a = i;
    onContainersBtns[i].addEventListener("mouseenter", ()=>subFuncForBtns(a));
}
function setText_forMobile(){
    elem.textContent = document.getElementsByClassName("info__generate-cords")[slideIndex].innerHTML;
    link.textContent = document.getElementsByClassName("info__server")[slideIndex].innerHTML;
    shaders.textContent = document.getElementsByClassName("info__shaders")[slideIndex].innerHTML;
    checkCords();
}
let worksOnlyNow = true;
function checkSlideIndex(isSmallWindow){
    if (slideIndex != prevSlideIndex || worksOnlyNow){
        worksOnlyNow = false;
        containers[prevSlideIndex].style.display = "none";
        if(isSmallWindow){
            setText_forMobile();
        }
    }
}

if (window.innerWidth > windowWidthMaxForMobile){
    document.addEventListener("mousedown", ()=>checkSlideIndex(false));
    document.addEventListener("touchstart",()=>checkSlideIndex(false));
}
else{
    document.addEventListener("touchend", ()=>checkSlideIndex(true));
    document.addEventListener("mouseup", ()=>checkSlideIndex(true));
}
