const liksToServers = {
    "LeafCity": "https://leafcity.ru/",
    "LeafCityHasMap": true,
    "LeafCityMap": "https://leafcity.ru/backend/survival?nocache=1723984503762#minecraft_overworld;flat;",
};
let containers = document.getElementsByClassName("screen__info");

let onContainersBtns = document.getElementsByClassName("screen__info-icon");

function copyToClipBoard(elemText, subText){
    if (subText != undefined){
        elemText = subText + elemText;
    }
    navigator.clipboard.writeText(elemText)
    .then(() => console.log("Done!"))
    .catch(err => console.error(err))
}

for(i=0;i<containers.length;i++){
    let elem = document.getElementsByClassName("info__generate-cords")[i];
    let link = document.getElementsByClassName("info__server")[i];
    let shaders = document.getElementsByClassName("info__shaders")[i];
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
    shaders.addEventListener("click", () => copyToClipBoard(shaders.innerHTML, "шейдеры "));
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

document.addEventListener("touchend",()=>{
    if (prevSlideIndex != slideIndex){
        containers[prevSlideIndex].style.display = "none";
    }
});
document.addEventListener("mousedown", ()=>{
    if (prevSlideIndex != slideIndex){
        containers[prevSlideIndex].style.display = "none";
    }
});