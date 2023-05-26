const navEl=document.querySelector(".navbar");
const blogEl=document.querySelector(".blog-section");

window.addEventListener("scroll",()=>{
    if(window.scrollY>blogEl.offsetTop-navEl.offsetHeight){
        navEl.classList.add("active");
    }else{
        navEl.classList.remove("active");
    }
});