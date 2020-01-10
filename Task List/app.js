// Defining UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));

        // create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // append the link to li
        li.appendChild(link);
        //append the li to ul
        taskList.appendChild(li);
    });
}

// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert ('Please add a task!')
    }

    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // append the link to li
    li.appendChild(link);
    //append the li to ul
    taskList.appendChild(li);

    // store in LS
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store Task

function storeTaskInLocalStorage(task){
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm ('Remove this task?')) {
            //from page
            e.target.parentElement.parentElement.remove();
            //from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
    // taskList.innerHTML = '';
    // jsperf.com/innerhtml-vs-removechild
    // faster way below
    while (taskList.firstChild){
        taskList.removeChild(taskList.firstChild); 
    }

    // clear task from ls
    clearTasksFromLocalStorage();
}

// Clear Tasks From LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}