let userScreenWidth = document.documentElement.clientWidth;
let headers_n_footer = [document.querySelectorAll('header'), document.querySelector("footer")];
let mrgnRight = 5;
if (window.innerWidth - document.documentElement.clientWidth == 0){
    mrgnRight = 0;
}
console.log("разница м/д шириной окна и шириной документа = "+ (window.innerWidth - document.documentElement.clientWidth) + ". Если 0, значит overflow-y не видно (которая на пк)");
for(i=0;i<headers_n_footer.length;i++){
    headers_n_footer[i].style.width= userScreenWidth - (userScreenWidth*0.05) - mrgnRight + "px";
    headers_n_footer[i].style.width-="2vw";
    headers_n_footer[i].style.marginLeft = userScreenWidth*0.025 + "px";
}