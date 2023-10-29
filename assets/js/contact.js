import {
    ref,
    set,
    onValue,
    get,
    push
  } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
  import { db } from "./firebase.js";
  
 const name = document.querySelector("#fname");
 console.log(name.value);
 const email = document.querySelector("#email");
 const phoneNumber = document.querySelector("#number");
 const address = document.querySelector("#address");
 const note = document.querySelector("note");
 const btn = document.querySelector(".btn")
 const error = document.createElement("p");
  const nameErr = document.createElement("p");
  const numberErr = document.createElement("p");
  const contactForm = document.querySelector(".contact-form .form");
  contactForm.append(error);
 name.append(nameErr);
 phoneNumber.append(numberErr);

  
  function validateEmptyInput() {
    console.log("salam");
    if (!email.value.trim() || !address.value.trim()) {
        if(!email.value.trim() && !address.value.trim()) {
        email.classList.add("error-input");
        address.classList.add("error-input");
        } else if (!email.value.trim()) {
            email.classList.add("error-input");
            address.classList.remove("error-input");  
        } else if (!address.value.trim()) {
            address.classList.add("error-input");
            email.classList.remove("error-input");
        }
  error.innerHTML = "Please fill in all fields!";
  error.classList.add("error-text");
    } 
    else {
        error.innerHTML = "";
        error.classList.remove("error-text"); 
        address.classList.remove("error-input");
        email.classList.remove("error-input");
        return "ok"
    }
  }
 function validateName() {
  const p = /[a-zA-Z]\s/;
  if (!name.value.trim()) {
    error.innerHTML = "Please fill in all fields!";
    error.classList.add("error-text");
    name.classList.add("error-input");
  }
  else if (!p.test(name.value)) {
    error.innerHTML = "Please enter your full name (name & surname). It must contain only letters.";
    error.classList.add("error-text");
    name.classList.add("error-input");
  } 
   else {
    error.innerHTML = "";
    error.classList.remove("error-text");
    name.classList.remove("error-input");
    return "ok";
  }
 }
 function validatePhoneNumber(){
  const p1 = /[a-zA-Z]/g;
    if (!phoneNumber.value.trim()) {
        error.innerHTML = "Please fill in all fields!";
        error.classList.add("error-text");
        phoneNumber.classList.add("error-input");
    }
    else if (p1.test(phoneNumber.value)) {
        error.innerHTML ="Please enter correct phone number (it must consist max 14 digits) ";
        error.classList.add("error-text");
        phoneNumber.classList.add("error-input");
    }
    else {
        error.innerHTML ="";
        error.classList.remove("error-text");
        phoneNumber.classList.remove("error-input");
        return "ok";
    }
}
const contactData = {
  fullName: "",
  email: "",
  address: "",
  phoneNumber: "",
  note: ""
};
function sendData() {
  const snapKey = push(ref(db, "/contactDatas")).key;
  set(ref(db, "/contactDatas/" + snapKey),  contactData);
}
function clearInputs() {
  name.value = "";
   email.value = "";
   address.value = "";
   phoneNumber.value = "";
  // note.value = "";
}
  btn.addEventListener("click", function(e){
e.preventDefault();
    validateEmptyInput();
     validateName();
    validatePhoneNumber();
    
    if(validateEmptyInput()==="ok" && validateName()==="ok" && validatePhoneNumber()==="ok") {
      console.log("salam");
      console.log(contactData);
      contactData.fullName = name.value;
      console.log(contactData.fullName);
      contactData.email = email.value;
      console.log(contactData.email);
      contactData.address = address.value;
      console.log(contactData.address);
      contactData.phoneNumber = phoneNumber.value;
      console.log(contactData.phoneNumber);
      // if (note.value.trim()) {
      //   contactData.note = note.value;
      // } else {
      //   contactData.note = "";
      // }
      console.log(contactData);
   sendData();
   clearInputs();
  }
})
