const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all eventlisteners
function loadEventListeners(){
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task even
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
};

loadEventListeners();
// Get tasks from local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
    
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
};

// Add task
function addTask(evt){
    evt.preventDefault();

    // Create li element
    createElement();

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';
};

function createElement(){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    // Create link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add fontawesome icon and append to li
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
};

// Store function
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Remove Task
function removeTask(evt){
    if(evt.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure')){ // need create custom confirm dialog
            evt.target.parentElement.parentElement.remove();
            
            // Remove from local storage
            removeTaskFromLocalStorage(evt.target.parentElement.parentElement);
        };
    };
};

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Clear Tasks
function clearTasks(){
    taskList.innerHTML = '';

    // while(taskList.firstChild){
    //     taskList.removeChild(taskList.firstChild);
    // };

    clearTasksFromLocalStorage();
};

function clearTasksFromLocalStorage(){
    localStorage.clear();
};

// Filter Tasks 
function filterTasks(evt){
    const text = evt.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
};
