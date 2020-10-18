// Element to refer to the task form
// we will use this to reference the fields within the form
var formEl = document.querySelector("#task-form");

// Element to hold tasks in the "to do" status
var tasksToDoEl = document.querySelector("#tasks-to-do");
// Element to hold tasks in the "in progress" status
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
// Element to hold tasks in the "completed" status
var tasksCompletedEl = document.querySelector("#tasks-completed");

// make a variable that will be each tasks's unique identifier
var taskIdCounter = 0;

// add an element for the <main> element.  
// we will later listen to this element for button clicks and dropdown changes 
// on all children elements
var pageContentEl = document.querySelector("#page-content");

// create an array to store tasks as objects for local storage
var tasks = [];



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

    // determine if the form element is new or being edited by the presence of a task ID
    // if it has a task id already, it's an edit of an existing task, not a new task
    var isEdit = formEl.hasAttribute("data-task-id");
    
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) 
    {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 

    // no data attribute, so create object as normal and pass to createTaskEl function
    else 
    {
        var taskDataObj = 
        {
            name: taskNameInput,
            type: taskTypeInput, 
            status: "to do"
        };

        createTaskEl(taskDataObj);
    }
}

var completeEditTask = function(taskName, taskType, taskId)
{
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) 
    {
        if (tasks[i].id === parseInt(taskId)) 
        {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

};

var createTaskEl = function(taskDataObj)
{
    // create list item of class "task-item" in the virtual HTML (DOM)
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    listItemEl.setAttribute("draggable", "true");

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

    // add the unique identifier to the taskDataObj
    taskDataObj.id = taskIdCounter;

    // add the task object to the tasks array
    tasks.push(taskDataObj);

    // increment the tak item counter for next unique id
    taskIdCounter++;

    console.log(taskDataObj);
    console.log(taskDataObj.status);
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

var deleteTask = function(taskId)
{
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) 
    {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) 
        {
            updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
};

var editTask = function(taskId) 
{
    console.log("editing task #" + taskId);
  
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    // load the task name and type into the form
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    // change the form button to say "save task"
    document.querySelector("#save-task").textContent = "Save Task";

    // save this task's unique identifier
    formEl.setAttribute("data-task-id", taskId);

};

// function to handle button clicks for each task 
var taskButtonHandler = function(event) 
{
    // get target element from event
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) 
    {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    } 

    // delete button was clicked
    if (event.target.matches(".delete-btn"))
    {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var taskStatusChangeHandler = function(event) 
{
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") 
    {
        tasksToDoEl.appendChild(taskSelected);
    } 
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // update task's in tasks array
    for (var i = 0; i < tasks.length; i++) 
    {
        if (tasks[i].id === parseInt(taskId)) 
        {
            tasks[i].status = statusValue;
        }
    }
    console.log(tasks);
};

var dragTaskHandler = function(event) 
{
    var taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);

    var getId = event.dataTransfer.getData("text/plain");
    console.log("getId:", getId, typeof getId);
} 

// restrict the drop zones to only the task lists and when this is the case, 
// prevent the default behavior of snapping back to the original task list
var dropZoneDragHandler = function(event) 
{
    // returns "true" if the target of the drag over is or is a descendant of an element
    // in the "task-list" class
    var taskListEl = event.target.closest(".task-list");
    // if the element dragged over is of the "task-list" class
    if (taskListEl) 
    {
        // prevent the default behavior of snapping back to the original task list
        event.preventDefault();
        taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
    }
};

var dropTaskHandler = function(event) 
{
    // retrieve the unique identifier for the task being dragged and dropped
    var id = event.dataTransfer.getData("text/plain");
    // select the element being dragged by its identifier
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    // define the drop zone as the closest task list dragged over
    var dropZoneEl = event.target.closest(".task-list");

    var statusType = dropZoneEl.id;
    // set status of task based on dropZone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    
    if (statusType === "tasks-to-do") 
    {
        statusSelectEl.selectedIndex = 0;
    } 
    else if (statusType === "tasks-in-progress") 
    {
        statusSelectEl.selectedIndex = 1;
    } 
    else if (statusType === "tasks-completed") 
    {
        statusSelectEl.selectedIndex = 2;
    }

    // put the dragged task element in the drop zone
    dropZoneEl.appendChild(draggableElement);

    // remove the styling that highlights eligible drop zones
    dropZoneEl.removeAttribute("style");

    // loop through tasks array to find and update the updated task's status
    for (var i = 0; i < tasks.length; i++) 
    {
        if (tasks[i].id === parseInt(id)) 
        {
            tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }

    console.log(tasks);
};

var dragLeaveHandler = function(event) 
{
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) 
    {
        taskListEl.removeAttribute("style");
    }
}


///////////////// EVENT LISTENERS ///////////////////

// use an event listener to listen for clicks then call the taskButtonHandler function
pageContentEl.addEventListener("click", taskButtonHandler);

// add an event listener for when a new task is submitted
formEl.addEventListener("submit", taskFormHandler);

// add an event listener to sense changes to the task status dropdown menu
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// add an event listener for the dragstart event.  Add to the <main> element
pageContentEl.addEventListener("dragstart", dragTaskHandler);

// add an event listener that will detect a dragover to the <main> element that holds the 3 status lists
pageContentEl.addEventListener("dragover", dropZoneDragHandler);

// add the event listener for the drop event
pageContentEl.addEventListener("drop", dropTaskHandler);

// add an event listener to detect when a dragover is no longer over an element
pageContentEl.addEventListener("dragleave", dragLeaveHandler);
