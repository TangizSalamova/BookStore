import { ref, set, onValue, get, push } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { db } from "./firebase.js";



let urlI = new URLSearchParams(window.location.search);
let data = urlI.get('book');
const commentSec = document.getElementById("commentSec");

onValue(ref(db, '/Catalog'), snapshot=>{
    // while (commentSec.firstChild) {
    //     commentSec.removeChild(commentSec.lastChild);
    // }
    let books = snapshot.val();
    // let bookDate=  new Date(books[data].date);
    // let howManyDays = (date)=>{
    //     if(moment().diff(date, "days") === 0){
    //         return 1;
    //     }
    //     return moment().diff(date, "days")
    // }

    // let howManyCommentDays = (date) =>{
    //     if(moment().diff(date, "days") === 0){
    //         return moment().diff(date, "hours")
    //     }
    //     return moment().diff(date, "days");
    // }

    document.getElementById("title").innerText =
        books[data].name;
    document.getElementById("author").innerText =
        books[data].author;
    document.getElementById("desc").innerText =
        books[data].description;
    document.getElementById("myImg").setAttribute("src",
        books[data].imgUrl);
    document.getElementById("year").innerText = bookDate.getUTCDate().toString() + "."
        + Number(bookDate.getUTCMonth() + 1) + "." + bookDate.getUTCFullYear();
    document.getElementById("daysAgo").innerText = howManyDays(bookDate) + " days ago added"  + bookDate.getHours();


    for (let i in books[data].comments) {
        let commentDate = new Date(books[data].comments[i].date);
        commentSec.insertAdjacentHTML("beforeend",
            `<div class="comment">
            <div class="head">
              <h3>Anonim</h3>
              <h4>${howManyDays(commentDate)} days ago</h4>
            </div>
            <p>${books[data].comments[i].comment}</p>
          </div>`)
    }
})

document.getElementById("commentAdd").addEventListener("submit", e=>{
    e.preventDefault();
    const commentText = document.getElementById("commentInput");
    let oldComments = [];

    get(ref(db, `/books/${data}/comments`)).then(snapshot=>{
        oldComments = snapshot.val();

        let newComment = {
            date: Date.now(),
            comment: commentText.value
        }
        oldComments.push(newComment);

        set(ref(db, `/books/${data}/comments`), oldComments);

        commentText.value = '';
    })

})