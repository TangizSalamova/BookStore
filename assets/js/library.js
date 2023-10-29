//EXPORTED FUNCTIONS FROM FIREBASE
import {
    ref,
    set,
    onValue,
    get,
    push,
  } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
  import { db } from "./firebase.js";
//----------------------------------------------------------------
//Variables
let swiperWrapper = document.querySelector(".swiper-wrapper");
let allBookElement = document.querySelector("#h2-all-books");

//----------------------------------------------------------------
// Functions
//----------------------------------------------------------------
//Set all books Live from the library
export function setAllBooks(snapshot) {
  const arr = snapshot.val();
  for (let index in arr) {
    let bookObj = arr[index];
    console.log(bookObj);

    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `<div class="card" style="width: 18rem">
     <img
       class="card-img-top"
       src="${bookObj.imgUrl}"
       alt="Card image cap"
     />
     <div class="card-body">
       <h5 class="card-title">${bookObj.name}</h5>
       <p class="card-text">${bookObj.author}</p>
       <a href="#" class="btn btn-primary" id ="${index}">READ MORE</a>
     </div>`;
    swiperWrapper.append(div);
  }
}
// SHOWS ALL BOOKS ON THE ALL BOOKS SECTION 
export function showAllBooks() {
  return onValue(ref(db, "/Catalog"), (snapshot) => {
    setAllBooks(snapshot);
  });
}
 // RETURN H2 ELEMENT ALLBOOKS 
export function returnH2AllBookElement() {
  return allBookElement;
}
