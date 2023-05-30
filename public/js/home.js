const navEl=document.querySelector(".navbar");
const blogEl=document.querySelector(".blog-section");
const scrollEl=document.getElementById("scroll-btn");

window.addEventListener("scroll",()=>{
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop === 0) {
        // User is at the top of the page, remove blur class
        navEl.classList.remove('blur');
    } else {
        // User has scrolled, add blur class
        navEl.classList.add('blur');
    }
    
    if(window.scrollY>blogEl.offsetTop-navEl.offsetHeight){
        navEl.classList.add("active");
    }else{
        navEl.classList.remove("active");
    }
});

scrollEl?.addEventListener("click",()=>{
    const blogs=document.getElementById("blog")
    blogs.scrollIntoView({behavior: "smooth"});
})

const blogSection=document.querySelector(".blog-section");

db.collection("blogs").get().then((blogs)=>{
    blogs.forEach(blog => {
        createBlog(blog);
    });
})

const createBlog= (blog)=>{
    let data=blog.data();
    blogSection.innerHTML+=`
        <div class="blog-card" onclick="navigateToPage('/${blog.id}')">
            <img src="${data.bannerImage}" alt="thumbnail" class="blog-image">
            <h1 class="blog-title">${data.title?.substring(0,110)+".."}</h1>
            <p class="blog-tagline">${data.content?.substring(0,150)+"..."}</p>
        </div>
    `;
}

function navigateToPage(url){
    window.location.href=url;
}

// Scroll Reveal Animation
const sr=ScrollReveal({
    delay: 200,       // Delay before the animation starts
    duration: 1000,  // Animation duration
    distance: '20px', // Distance the element moves during the animation
    origin: 'bottom', // Starting point of the animation (top, bottom, left, right)
    easing: 'ease-in-out', // Easing effect
    opacity: 0,      // Starting opacity
    interval: 200    // Delay between each element's animation
});

sr.reveal(".content");
