let blogId=decodeURI(location.pathname.split("/").pop());

let docRef=db.collection("blogs").doc(blogId);

docRef.get().then((doc)=>{
    if(doc.exists){
        setUpBlog(doc.data());
    }else{
        location.replace("/");
    }
});

const setUpBlog=(data)=>{
    const banner=document.querySelector(".banner");
    const blogTitle=document.querySelector(".blog-title");
    const titleTag=document.querySelector("title");
    const publish=document.querySelector(".published");
    banner.style.backgroundImage=`url("${data.bannerImage}")`;
    titleTag.innerHTML+=blogTitle.innerHTML =data.title;
    publish.innerHTML+=data.publishedAt;

    const content=document.querySelector(".blog-content");
    addContent(content,data.content);
}

const addContent= (ele,data)=>{
    data=data.split("\n").filter(item=>item.length);
    // console.log(data);

    data.forEach(item => {
        // check for heading
        if(item[0]=="#"){
            let count=0;
            let hCount=0;
            while(item[count]=="#"){
                count++;
                hCount++;
            }
            let tag=`h${hCount}`;
            ele.innerHTML+=`<${tag}>${item.slice(hCount,item.length)}</${tag}>`
        }
        else if(item[0]=="!" && item [1]=="["){
            let seperator;

            for(let i=0;i<=item.length;i++){
                if(item[i]=="]" &&  item[i+1]=="(" && item[item.length-1]==")"){
                    seperator=i;
                }
            }
            let alt=item.slice(2,seperator);
            let src=item.slice(seperator+2,item.length-1);
            ele.innerHTML+=`<img src="${src}" alt="${alt}" class="content-image"/>`
        }
        else{
            ele.innerHTML+=`<p>${item}</p>`
        }
    });
}