
const contactbtn=document.querySelector(".contact-btn");
contactbtn?.addEventListener("click",()=>{
    const contact=document.getElementById("contact")
    contact.scrollIntoView({behavior: "smooth"});
})