var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() 
{
    // prevent the default page behavior of reloading the page on each submission
    event.preventDefault();
    // create a new list item (a task in this case)
    var listItemEl = document.createElement("li");
    // give the new list item style by assigning a class that CSS will use to style it
    listItemEl.className = "task-item";
    // add the text to the new list item
    listItemEl.textContent = "This is a new task.";
    // add this new list item "element" to the existing list
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", createTaskHandler);