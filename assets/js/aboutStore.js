import { ref, set, onValue, get, push } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { db } from "./firebase.js";



window.addEventListener("load", ()=>{
    get(ref(db, '/aboutUs')).then(snapshot=>{
        const about = snapshot.val();

        document.getElementById("title").innerHTML = about.title;
        document.getElementById("desc").innerHTML
        = about.description;
        document.getElementById("img").setAttribute("src", about.imgSrc)
    })
});