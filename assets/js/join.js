import {
    ref,
    set,
    onValue,
    get,
    push
  } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
  import { db } from "./firebase.js";
  var joinUs = document.querySelector(".join-us");
  var userIcon = document.querySelector(".user-icon");
  var popUp = document.querySelector("#popup");
  var closePopUp = function () {
    popUp.classList.remove("popup");
    popUp.classList.add("close-popup");
  }
  var openPopUp = function () {
    popUp.classList.remove("close-popup");
    popUp.classList.add("popup");
  }
  joinUs.addEventListener("click", function() {
     return openPopUp();
  });
  var closePopup = document.querySelector("#popup img");
  closePopup.addEventListener("click", function(){
     return closePopUp();
  });
  userIcon.addEventListener("click", function() {
      return openPopUp();
  });
  
  const register = document.querySelector(".register");
  const form = document.querySelector(".register form");
  const h2 = document.querySelector(".register h2");
  const submit = document.querySelector(".submit");
  const errorP = document.createElement("p");
  form.append(errorP);
  const joinUsBtn = document.querySelector(".user-icon")
  var registerForm = {
    userName: "",
  password: "",
  validateInputs: function(x, y) {
    if (!x.value.trim()) {
    errorP.innerHTML = "Please fill in all fields!";
    errorP.classList.add("error-text");
    x.classList.add("error-input");
    console.log("sehv");
    } else if (!y.value.trim()) {
      errorP.innerHTML = "Please fill in all fields!";
      errorP.classList.add("error-text");
      x.classList.remove("error-input");
      y.classList.add("error-input");
      console.log(y);
      } else if (x.value.split(" ").length==1) {
    errorP.innerHTML = "Please write your full name(name & surname)";
    y.classList.remove("error-input");
    errorP.classList.add("error-text");
    x.classList.add("error-input");
    }
     else {
    form.innerText = "";
    register.classList.add("success-register");
    h2.innerText = "Thank you for joining us!";
    h2.classList.add("success-join");
    x.classList.remove("error-input");
    y.classList.remove("error-input");
    setTimeout(closePopUp, 3000);
    this.userName = x.value;
    this.email = y.value;
    const userData = {
      userName: this.userName.toLowerCase(),
      email: this.email
      };
    
    //  checking joining
    var found = false;
     get(ref(db, '/userData')).then(snapshot=> {
      const datas = snapshot.val();
      console.log(datas);
      for (let [key, user] of Object.entries(datas)) {
        console.log(user);
        if(user.userName === this.userName && user.email ===this.email) {
          found = true;
          window.localStorage.setItem("userName", this.userName);
          window.localStorage.setItem("email", this.email);
          break;
        }}
      })
      console.log(window.localStorage.getItem("userName"));
      console.log(userData.userName);
       if(window.localStorage.getItem("userName")!==userData.userName) {
        const snapshotKey = push(ref(db, "/userData")).key;
        set(ref(db, "/userData/" + snapshotKey), userData);
        joinUs.innerHTML = this.userName;
        const joinBtn = document.querySelector(".hamburger.user-icon");
        joinBtn.innerHTML = "";
        joinBtn.innerText = this.userName;
      }
      else{
        joinUs.innerHTML = this.userName;
       
        const joinBtn = document.querySelector(".hamburger.user-icon");
        joinBtn.innerHTML = "";
        joinBtn.innerText = this.userName;
      }
     }
  }}
  form.addEventListener("submit", function(e){
    e.preventDefault();
    var f = e.target;
   registerForm.validateInputs(f.fname, f.email );
  })