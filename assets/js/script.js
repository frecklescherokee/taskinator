var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) 
{
    // prevent the default page behavior of reloading the page on each submission
    event.preventDefault();

    // get the contents of the input element that the user typed
    var taskNameInput = document.querySelector("input[name='task-name']").value;

    // get the contents of the selector (drop down)
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput)
    {
        alert( "You need to fill out the task form!");
        return false;
    }
    
    // reset the form so a user can enter the next task without having to delete the last task
    formEl.reset();
    
    // package up data as an object
    var taskDataObj = 
    {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send data object containing task name and type to the createTaskEl function
    createTaskEl(taskDataObj);
    
}

var createTaskEl = function(taskDataObj)
{
    // create list item of class "task-item" in the virtual HTML (DOM)
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create DOM div to hold task info 
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add task hame and type that user entered into the DOM div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // add task item div to the list item element
    listItemEl.appendChild(taskInfoEl);
    
    // add list item element to the list to be displayed on the page
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);