//ALL IMOPTRED JAVASCRIPT FILES
//----------------------------------------------------------------
//EXPORTED FUNCTIONS FROM THE LIBRARY
import { setAllBooks,returnH2AllBookElement,showAllBooks } from "./library.js";
//----------------------------------------------------------------
//ALL FUNCTIONS
//----------------------------------------------------------------
//FUNCTION THAT SETS ALLBooks
showAllBooks();

//FUNCTION SETS ALLBooks WHEN YOU CLICK ON THE ELEMENT H2 ALLBooks
returnH2AllBookElement().addEventListener("click",() =>{
  showAllBooks();

});









