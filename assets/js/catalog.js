import { ref, set, onValue, get, push } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { db } from "./firebase.js";
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs'



let swiper = new Swiper(".slide_content", {
  slidesPerView: 4,
  spaceBetween: 25,
  centerSlide: true, // Remove quotes around true
  fade: true,        // Remove quotes around true
  grabCursor: true,  // Remove quotes around true
  pagination: {
      el: ".swiper-pagination",
      clickable: true
  },
  breakpoints: {
      0: {
          slidesPerView: 1,
      },
      500: {
          slidesPerView: 2,
      },
      992: {
          slidesPerView: 3,
      }
  },
  observe:true,
  freeMode: true,
  mousewheel: true,
  loop: false,
  observer: true,
  observeParents: true,
});

function showBestseller(bookList){
  let trueBooks =bookList.filter(x=>x.averageRating>=3);
  for (let i in trueBooks) {
    document.getElementById("bestseller").insertAdjacentHTML('beforeend',
    `<div class="card swiper-slide">
    <div class="img">
      <img src="${trueBooks[i].imgUrl}" alt="img" />
    </div>
    <div class="content">
      <h3>${trueBooks[i].name}</h3>
      <p>${trueBooks[i].author}</p>
      <button>Read more</button>
    </div>
  </div>`)
  }
}

function showNewRelasie(bookList){
  let trueBooks =[];


  for (let i in bookList) {
    if(bookList[i].publishedDate.split('').splice(0,4).join('')>2015){
      trueBooks.push(bookList[i]);
    }
  }

 

  for (let i in trueBooks) {
    document.getElementById("newRel").insertAdjacentHTML('beforeend',
    `<div class="card swiper-slide">
    <div class="img">
      <img src="${trueBooks[i].imgUrl}" alt="img" />
    </div>
    <div class="content">
      <h3>${trueBooks[i].name}</h3>
      <p>${trueBooks[i].author}</p>
      <button>Read more</button>
    </div>
    <span>New</span>
  </div>`)
  }
}

function showCategories(cats) {
  // const parent = document.getElementById("categories");

  // const trueCategories = [];
  // for (const i of cats) {
  //   if(!trueCategories.includes(i.category)){
  //     trueCategories.push(i);
  //   }
  // }

  // for (let i in trueCategories) {
  //     parent.insertAdjacentHTML("beforeend",
  //         `<span id="myId-${trueCategories[i]}">${trueCategories[i]}</span>`)
  // }
  // addEventListenersToCategory(trueCategories)

  const parent = document.getElementById("categories");

  const trueCats = [];
  for(let i in cats){
    if(!trueCats.includes(cats[i].category)){
      trueCats.push(cats[i].category);
    }
  }

  for(let i in trueCats){
    parent.insertAdjacentHTML('beforeend', 
  `<span style="cursor:pointer;" id="catId-${trueCats[i]}">${trueCats[i]}</span>`)
  }

  addEventListenersToCategory(trueCats)
}

function addEventListenersToCategory(cats) {
  for (let i in cats) {
      document.getElementById(`catId-${cats[i]}`).addEventListener("click",()=>{
          changeSliders(cats[i])
      })
  }
}

function addEventListenersToReadMore(books) {
  for (let i in books) {
      document.getElementById(`rM-${i}`).addEventListener("click", ()=>{
          let myId = encodeURIComponent(books[i].id);
          window.location.href ="" +
              "book-page.html?book=" + myId;
      })
  }
}

function changeSliders(category) {
  get(ref(db, '/Catalog')).then(snapshot=>{
      const books = snapshot.val();
      let trueBooks =  books.filter(x=>x.category === category);
      const parentDiv = document.getElementById("cat");

      while (parentDiv.firstChild) {
          parentDiv.removeChild(parentDiv.lastChild);
      }
      showBooks(trueBooks, );
  });
}

function showBooks(books, ) {
  for (let i in books) {
      document.getElementById("cat").insertAdjacentHTML('beforeend',`<div class="card swiper-slide" >
            <div class="img">
              <img src="${books[i].imgUrl}" alt="${books[i].name}" />
            </div>
            <div class="content">
              <h3>${books[i].name}</h3>
              <p>${books[i].author}</p>
              <button id="rM-${i}" style="cursor: pointer">Read more</button>
            </div>
          </div>`)
  }
  addEventListenersToReadMore(books)
}

window.addEventListener("load", ()=>{
  let urlI = new URLSearchParams(window.location.search);
  let data = urlI.get('Catalog');
  get(ref(db, '/Catalog')).then(snapshot=>{
      showCategories(snapshot.val());
  });

  get(ref(db, '/Catalog')).then(snapshot=>{
      if(data!==null){
          showBooks(snapshot.val().filter(x=>x.category===data));
          showBestseller(snapshot.val());
      showNewRelasie(snapshot.val());
          return;
      }
      showBooks(snapshot.val());
      showBestseller(snapshot.val());
      showNewRelasie(snapshot.val());

  });

  
});









