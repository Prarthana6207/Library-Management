showNotes();

class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

class Display {

  
  // add(book) {
  //   console.log("Adding to UI");
  //   let tableBody = document.getElementById("tableBody");
  //   let uiString = `<tr>
  //                       <td>${book.name}</td>
  //                       <td>${book.author}</td>
  //                       <td>${book.type}</td>
  //                   </tr>`;
  //   tableBody.innerHTML += uiString;
  // }
  clear() {
    console.log("clear");
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }
  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }
  show(type, displayMessage) {
    let message = document.getElementById("message");
    let boldText;
    if (type === "success") {
      boldText = "Success";
    } else {
      boldText = "Error!";
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>${boldText}:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
    setTimeout(function () {
      message.innerHTML = "";
    }, 5000);
  }
}

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  console.log("YOu have submitted library form");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;
  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();

  if (display.validate(book)) {
    showNotes();
    display.clear();
    display.show("success", "Your book has been successfully added");
  } else {
    // Show error to the user
    display.show("danger", "Sorry you cannot add this book");
  }

  e.preventDefault();
}




//storing in local storage

let addBtn=document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
  let name = document.getElementById("bookName");
  let author = document.getElementById("author");
  let type;
  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");

  if (fiction.checked) {
    type = fiction;
  } else if (programming.checked) {
    type = programming;
  } else if (cooking.checked) {
    type = cooking;
  }

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  
  
  let myObj = {
    
    name: name.value,
    author: author.value,
    type: type.value,
  };
  if(myObj.name.length>0 || myObj.author.length>0){
    noteObj.push(myObj);
  }
//  else{
//   let display = new Display();
//   display.show("danger", "Sorry you cannot add this book");
//    alert("Please fill the name and author field");
//  }
  localStorage.setItem("notes", JSON.stringify(noteObj));

  console.log(noteObj);
  // showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  let html = "";
  noteObj.forEach(function (element,index) {
    html += `<tr>
    <td>${element.name}</td>
    <td>${element.author}</td>
    <td>${element.type}</td>
    <td><button type="submit" id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete</button></td>
 
</tr>`;
  });

  
  let tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = html;
}

function deleteNotes(index){
  let notes = localStorage.getItem("notes");
  if(notes== null){
      noteObj =[];
  }
  else{
      noteObj =JSON.parse(notes);
  }
  noteObj.splice(index,1);
  localStorage.setItem("notes",JSON.stringify(noteObj));
  showNotes();
}