const titleField=document.querySelector(".blog-title");
const contentField=document.querySelector(".blog-content");

// Banner
const bannerImage=document.querySelector("#banner-upload");
const banner=document.querySelector(".banner");
let bannerPath;

const publishBtn=document.querySelector(".publish-btn");
const uploadInput=document.querySelector("#image-upload");

bannerImage.addEventListener("change",()=>{
    uploadImage(bannerImage,"banner");
})

uploadInput.addEventListener("change",()=>{
    uploadImage(uploadInput,"image");
})

const uploadImage=(uploadFile,uploadType)=>{
    const [file]=uploadFile.files;
    if(file && file.type.includes("image")){
        const formData=new FormData();
        formData.append("image",file);
        fetch("/upload",{
            method: "post",
            body: formData
        }).then(res=>res.json())
        .then(data=>{
            if(uploadType=="image"){
                addImage(data,file.name);
            }else{
                bannerPath= `${location.origin}/${data}`;
                banner.style.backgroundImage=`url("${bannerPath}")`
            }
        })
    }else{
        alert("Upload image only!");
    }
}

const addImage=(imagePath,alt)=>{
    let cursorPos=contentField.selectionStart;
    let textToInsert=`\r![${alt}](${imagePath})\r`;
    contentField.value=contentField.value.slice(0,cursorPos)+textToInsert+contentField.value.slice(cursorPos);
}

const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]

publishBtn.addEventListener("click",()=>{
    if(contentField.value.length && titleField.value.length){
        let letters="abcdefghijklmnopqrstuvwxyz";
        let blogTitle=titleField.value.split(" ").join("-");
        let id="";
        for(let i=0;i<4;i++){
            id+=letters[Math.floor(Math.random()*letters.length)];
        }
        // setting up doc name
        let docName=`${blogTitle}-${id}`;
        let date=new Date();

        // access firestore with database variable
        db.collection("blogs").doc(docName).set({
            title: titleField.value,
            content: contentField.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })
        .then(()=>{
            location.href="/"+docName;
        }).catch(err=>console.error(err));
    }
})