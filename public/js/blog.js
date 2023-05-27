let blogId=decodeURI(location.pathname.split("/").pop());

let docRef=db.collection("blogs").doc(blogId);

docRef.get().then((doc)=>{
    if(doc.exists){
        setUpBlog(doc.data());
    }else{
        location.replace("/");
    }
})

const setUpBlog=(data)=>{
    const banner=document.querySelector(".banner");
    const blogTitle=document.querySelector(".blog-title");
    const titleTag=document.querySelector("title");
    const publish=document.querySelector(".published");
    banner.style.backgroundImage=`url(${data.bannerImage})`
    titleTag.innerHTML+=blogTitle.innerHTML =data.title;
    publish.innerHTML+=data.publishedAt;

    const content=document.querySelector(".blog-content");
    addContent(content,data.content);
}

const addContent= (ele,data)=>{
    console.log(data);
}