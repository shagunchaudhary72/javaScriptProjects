let searchBtn = document.getElementById("searchBtn");
let title = document.getElementById("title");
let description = document.getElementById("description");
let addBtn = document.getElementById("add");
let saveBtn = document.getElementById("save");
let deleteAllBtn = document.getElementById("deleteAll");
let editBtn = document.getElementById("edit");
let deleteNoteBtn = document.getElementById("deleteNote");

let noteBody = document.getElementById("noteBody");

addBtn.addEventListener("click", () => {
  let notesObj = [];
  let notes = localStorage.getItem("notes");
  if ((title.value && description.value) != 0) {
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.push([title.value, description.value]);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    //console.log(notesObj);
    showNote();
  } else {
    window.alert("title and description are required");
  }
});

const showNote = () => {
  let notesObj = [];
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach((item, index) => {
    html += `
      
        <div class="my-2 mx-2 card bg-success notesCard" style="width: 18rem;">
          <div class="card-body">
            <h4 class="card-title text-center text-dark">${item[0]}</h4>
            <p class="card-text text-white">${item[1]}</p>
            <button type="button" class="btn btn-primary" id="edit">Edit Note</button>
            <button type="button" class="btn btn-danger" id="deleteNote" onClick="deletingNote(${index})">Delete Note</button>  
          </div>
        </div>
      `;
    // console.log(index);
    //console.log(item);
  });
  if (notesObj.length != 0) {
    noteBody.innerHTML = html;
  } else {
    noteBody.innerHTML = `<h2 class="text-center">Nothing To Show !!!</h2>`;
  }
  title.value = "";
  description.value = "";
  console.log(notesObj);
};
showNote();

const deletingNote = (index) => {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
;
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  // console.log(notes);
  showNote();
};

deleteAllBtn.addEventListener("click", () => {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
 
  if (notesObj.length == 0) {
    window.alert("Nothing to Delete");
  } else {
    notesObj.splice(0, notesObj.length);
    localStorage.setItem("notes", JSON.stringify(notesObj));
  }
  showNote();
});

let searchBox = document.getElementById("searchText");

searchBox.addEventListener("input", () => {
  let searchedValue = searchBox.value;
  let notesText = document.getElementsByClassName("notesCard");
  Array.from(notesText).forEach((items) => {
    let titleText = items.getElementsByTagName("h4")[0].innerText;
    if (titleText.includes(searchedValue)) {
      items.style.display = "block";
    } else {
      items.style.display = "none";
    }
  });
});
/* 

let searchBox=document.getElementById("searchBox");
searchBox.addEventListener("input",()=>{
    let list=document.querySelectorAll("tr");
    Array.from(list).forEach((item)=>{
        let searchedText=item.getElementsByTagName("td")[0].innerText;
        let searchBoxValue=searchBox.value;
        let re =new RegExp(searchBoxValue,"gi");
        if(searchedText.match(re)){
            item.style.display="table";
        }else{
            item.style.display="none";
        }
    })
})

 */
