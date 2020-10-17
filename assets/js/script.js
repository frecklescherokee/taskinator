var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;

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

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create DOM div to hold task info 
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add task hame and type that user entered into the DOM div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // add task item div to the list item element
    listItemEl.appendChild(taskInfoEl);
    
    // call the create task actions function and assign it to the taskActionsEl variable
    var taskActionsEl = createTaskActions(taskIdCounter);
    // add the action buttons and dropdown to the listItemEl, which contains the 
    // task name and type and now the buttons and dropdown
    listItemEl.appendChild(taskActionsEl);
    
    // add list item element to the list to be displayed on the page
    tasksToDoEl.appendChild(listItemEl);

    // increment the tak item counter for next unique id
    taskIdCounter++;
}

var createTaskActions = function(taskId)
{
    // create a div to contain the buttons
    var actionContainerEl = document.createElement("div");
    // make the div's class = task-actions
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    // add button to the button div (actionContainerEl)
    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    // add button to the button div (actionContainerEl)
    actionContainerEl.appendChild(deleteButtonEl);

    // create dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    // add dropdown to the button div (actionContainerEl)
    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++)
    {
        //create option element
        var statusOptionEl = document.createElement("option");
        // assign an option to the dropdown list from the array at the current position
        statusOptionEl.textContent = statusChoices[i];
        // give that option a value of the current aray position
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append this option to the dropdown
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;

}

formEl.addEventListener("submit", taskFormHandler);