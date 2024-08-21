const liksToServers = {
    "LeafCity": "https://leafcity.ru/",
    "LeafCityHasMap": true,
    "LeafCityMap": "https://leafcity.ru/backend/survival?nocache=1723984503762#minecraft_overworld;flat;",
};
let containers = document.getElementsByClassName("screen__info");

let onContainersBtns = document.getElementsByClassName("screen__info-icon");

let elems = document.getElementsByClassName("info__generate-cords"); //координаты
let links = document.getElementsByClassName("info__server"); //ссылки на сервера
let shaders = document.getElementsByClassName("info__shaders"); //шейдеры

let elemMobile = document.getElementById("infoGenerateCordsForMobile");
let linkMobile = document.getElementById("infoServerForMobile");
let shaderMobile = document.getElementById("infoShaderForMobile");

function copyToClipBoard(elemText, subText){
    if (subText != undefined){
        elemText = subText + elemText;
    }
    navigator.clipboard.writeText(elemText)
    .then(() => console.log("Done!"))
    .catch(err => console.error(err))
}

function setLinks(){
    for(i=0;i<containers.length;i++){
        let elem = elems[i];
        let link = links[i];
        let shader = shaders[i];
    
        if (window.innerWidth > 560){
            elem = elemMobile;
            link = linkMobile;
            shader = shaderMobile;
        }
    
        if (liksToServers.hasOwnProperty(link.innerHTML)){
            if (liksToServers[link.innerHTML + "HasMap"]){
                elem.innerHTML == "неизвестно" ? elem.classList.remove("can-copy") : elem.href = liksToServers[link.innerHTML + "Map"] + elem.innerHTML
                link.href = liksToServers[link.innerHTML];
            }
            else{
                elem.addEventListener("click", () => copyToClipBoard(elem.innerHTML));
                link.addEventListener("click", () => copyToClipBoard(link.innerHTML));
            }
        }
        else if(link.innerHTML == "нет"){
            containers.querySelectorAll("p")[1].style.display = 'none';
        }
        shader.addEventListener("click", () => copyToClipBoard(shader.innerHTML, "шейдеры "));
    }
}

function subFuncForBtns(num){
    if (window.innerWidth > 560){
        containers[num].style.right = slideWidth + "px";
    }
    containers[num].style.display = "block";
}
for(i=0;i<onContainersBtns.length;i++){
    let a = i;
    onContainersBtns[i].addEventListener("mouseenter", ()=>subFuncForBtns(a));
}

function setText_forMobile(){
    elemMobile.textContent = elems[slideIndex].innerHTML;
    linkMobile.textContent = links[slideIndex].innerHTML;
    shaderMobile.textContent = shaders[slideIndex].innerHTML;
    setLinks();
}
function checkSlideIndex(isSmallWindow){
    if (slideIndex != prevSlideIndex){
        containers[prevSlideIndex].style.display = "none";
        if(isSmallWindow){
            setText_forMobile();
        }
    }
}
setLinks();

if (window.innerWidth > 560){
    document.addEventListener("mousedown", ()=>checkSlideIndex(false));
    document.addEventListener("touchstart",()=>checkSlideIndex(false));
}
else{
    document.addEventListener("touchend", ()=>checkSlideIndex(true));
    document.addEventListener("mouseup", ()=>checkSlideIndex(true));
}