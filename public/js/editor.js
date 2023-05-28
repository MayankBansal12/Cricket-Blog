const titleField=document.querySelector(".blog-title");
const contentField=document.querySelector(".blog-content");

// Banner
const bannerImage=document.querySelector("#banner-path");
const banner=document.querySelector(".banner");
let bannerPath;

const publishBtn=document.querySelector(".publish-btn");
const uploadInput=document.querySelector("#image-upload");

const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]


// Publish the post
publishBtn.addEventListener("click",()=>{
    if(contentField.value.length && titleField.value.length){
        let chars="abcdefghijklmnopqrstuvwxyz1234567890";
        let blogTitle=titleField.value.split(" ").join("-");
        let id="";
        for(let i=0;i<4;i++){
            id+=chars[Math.floor(Math.random()*chars.length)];
        }
        // setting up doc name
        let docName=`${blogTitle}-${id}`;
        let date=new Date();
        bannerPath=bannerImage.value;

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


// Login Authentication
let ui = new firebaseui.auth.AuthUI(auth);
let login= document.querySelector(".login");

auth.onAuthStateChanged((user)=>{
    if(user){
        login.style.display="none";
    }else{
        setUpLoginButton();
    }
})

const setUpLoginButton=()=>{
    ui.start("#loginUI",{
        callbacks:{
            singInSucessWithAuthResult: function(authRes,redirectURL){
                login.style.display="none";
                return false;
            }
        },
        signInFlow: "popup",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    });
}
