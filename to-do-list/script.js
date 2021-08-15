let title = document.getElementById("title");
let description = document.getElementById("description");
let addBtn = document.getElementById("add");
let clearAllBtn = document.getElementById("clearAll");
let clearBtn = document.getElementById("delete");
let saveBtn = document.getElementById("save");
let saveIndex = document.getElementById("saveIndex");
let localStorageItem = localStorage.getItem("localtask");
var index1;

addBtn.addEventListener("click", () => {
  let titleValue = title.value;
  let descriptionValue = description.value;
  if ((titleValue.trim() && descriptionValue.trim()) != 0) {
    //let localStorageItem=localStorage.getItem("localtask");
    if (localStorageItem == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(localStorageItem);
    }
    taskObj.push([titleValue, descriptionValue]);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showTask();
  } else {
    window.alert("Title and Description are Required");
  }
});

const showTask = () => {
  localStorageItem = localStorage.getItem("localtask");
  if (localStorageItem == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(localStorageItem);
  }
  let html = "";
  let tableItem = document.getElementById("tableItem");
  taskObj.forEach((item, index) => {
    html += ` <tr>
        <th scope="row">${index + 1}</th>
        <td>${item[0]}</td>
        <td>${item[1]}</td>
        <td><button type="button" class="btn btn-link" onClick="editItem(${index})"><i class="fa fa-edit">Edit</i></button></td>
        <td><button type="button" class="btn btn-danger" id="delete" onClick="deleteItem(${index})">Delete Item</button></td>
      </tr>`;
  });
  tableItem.innerHTML = html;
  title.value = "";
  description.value = "";
};

showTask();

const editItem = (index) => {
  saveIndex.value = index;
  index1=index;
  //let localStorageItem=localStorage.getItem("localtask");
  let taskObj = JSON.parse(localStorageItem);
  title.value = taskObj[index][0];
  description.value = taskObj[index][1];
  addBtn.style.display = "none";
  save.style.display = "";
};

saveBtn.addEventListener("click", () => {
  //let localStorageItem=localStorage.getItem("localtask");

  let taskObj = JSON.parse(localStorageItem);
  taskObj[index1]=([title.value, description.value]);
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showTask();
  saveBtn.style.display = "none";
  addBtn.style.display = "";
});
const deleteItem = (index) => {
  let taskObj = JSON.parse(localStorageItem);
  taskObj.splice(index, 1);
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showTask();
  saveBtn.style.value = "none";
  addBtn.style.value = "none";
};

clearAllBtn.addEventListener("click", () => {
  let taskObj = JSON.parse(localStorageItem);
  if (taskObj != null) {
    taskObj.splice(0, taskObj.length);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showTask();
    saveBtn.style.display = "none";
    addBtn.style.display = "";
  }
});
