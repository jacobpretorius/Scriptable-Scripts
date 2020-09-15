// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: user-md;

// Toggl time tracking for reading
const togglProjectId = 123456789; // the project you use to track your reading (or whatever you want the widget to show)

// Runs using this Azure Function -> https://github.com/jacobpretorius/Azure-Functions/blob/master/src/TogglProjectTrackedCheck/index.js
// Get the deployed URL from your Azure functions portal and modify below by adding &projectId=${togglProjectId} to the end
const url = `https://something.azurewebsites.net/api/TogglProjectTrackedCheck?code=SECRET&projectId=${togglProjectId}`;

const req = new Request(url);
const result = await req.loadJSON();
const readMinutes = Math.round(result.trackedDurationInMs / 60);


// Todoist tasks
// Runs using this Azure Function -> https://github.com/jacobpretorius/Azure-Functions/blob/master/src/TodoistGetItemsToday/index.js
// Get the deployed URL from your Azure functions portal and paste it below
const urlTodos = 'https://something.azurewebsites.net/api/TodoistGetItemsToday?code=SECRET';
const reqTodos = new Request(urlTodos);
const resultTodos = await reqTodos.loadJSON();

if (config.runsInWidget) {
  // create and show widget
  let colour = readMinutes >= 30 ? '#41cb86' : '#33C6FF'; // the 30 here is my reading goal in minutes
  let dueNote = resultTodos.Count > 0
    ? resultTodos.Count.toString()
    : 'None ✌️';
  let widget = createWidget("Read", `${readMinutes} m`, "Tasks due", dueNote, colour);
  Script.setWidget(widget);
  Script.complete();
} else {
  if (config.runsWithSiri){
    Speech.speak(`Today you have ${resultTodos.Count} tasks and you've read ${readMinutes} minutes.`);
  } else {
    let alert = new Alert();
    alert.title = 'Today';
    alert.message = `${resultTodos.Count} tasks due and read ${readMinutes} Minutes.`;
    alert.presentAlert();
  }
}
function createWidget(preRead, read, preTodo, todos, color) {
  let widget = new ListWidget();
  widget.backgroundColor = new Color(color);

  let today = widget.addText("Today");
  today.textColor = Color.white();
  today.textOpacity = 0.8;
  today.textSize = 18;
  
  let spacer1 = widget.addSpacer();
  
  let preTodoTxt = widget.addText(preTodo);
  preTodoTxt.textColor = Color.white();
  preTodoTxt.textOpacity = 0.8;
  preTodoTxt.textSize = 14;
  
  let titleTxtTodo = widget.addText(todos);
  titleTxtTodo.textColor = Color.white();
  titleTxtTodo.textSize = 23;
  
  let spacer = widget.addSpacer();
  
  let preReadTxt = widget.addText(preRead);
  preReadTxt.textColor = Color.white();
  preReadTxt.textOpacity = 0.8;
  preReadTxt.textSize = 14;
  
  let readTxt = widget.addText(read);
  readTxt.textColor = Color.white();
  readTxt.textSize = 23;
  
  return widget;
}
