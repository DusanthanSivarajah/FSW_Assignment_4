const inputBox1 = document.getElementById("input-box1"); 
const inputBox2 = document.getElementById("input-box2"); 
const inputBox3 = document.getElementById("input-box3"); 


const rollInput = document.getElementById("other"); 



const listContainer = document.getElementById("list-container");
const form = document.getElementById("form");



function addTask(event) {
    event.preventDefault();
    if (inputBox1.value !== "" && inputBox2.value !== "" && inputBox3.value !== "") { 
        let li = document.createElement("li");
        li.innerHTML = `Task: ${inputBox1.value}<br>Due Date: ${inputBox2.value}<br>Must be completed by ${inputBox3.value}<br>Assigned to: ${rollInput.value}`;
        
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "\u00d7";
        deleteBtn.classList.add("del-btn");
        li.appendChild(deleteBtn);

        listContainer.appendChild(li);
        checkStatus(li, inputBox2.value, inputBox3.value);    
        inputBox1.value = "";
        inputBox2.value = "";
        inputBox3.value = "";
        rollInput.value = "";
        
        saveData(); 
    }
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();        
    } else if (e.target.classList.contains("del-btn")) {
        e.target.parentElement.remove();
        saveData();
    }
});

function checkStatus(li, date, time) {
    const today = new Date();
    const taskDate = new Date(date);
    const [hours, minutes] = time.split(":");
    taskDate.setHours(hours, minutes);

    if (taskDate < today) {
        li.style.color = "red";
    }
    
}



function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    
}

showTask();


