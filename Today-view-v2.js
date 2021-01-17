// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: user-md;

// CHANGELOG:
// V2 - Add Wago counts for todo items today in Hiragana

// The Toggl Project ID you use to track your reading (or whatever else you want the widget to show)
const togglProjectId = 123456789;

// Runs using this Azure Function -> https://github.com/jacobpretorius/Azure-Functions/blob/master/src/TodayView/index.js
// Get the deployed URL from your Azure functions portal and modify below by adding &projectId=${togglProjectId} to the end
const url = `https://something.azurewebsites.net/api/TodayView?code=SECRET&projectId=${togglProjectId}`;

const req = new Request(url);
const result = await req.loadJSON();

if (config.runsInWidget) {
  // create and show widget
  let colour = result.Toggl.MinutesTracked >= 30 ? '#41cb86' : '#33C6FF';
  let dueNote = result.Todoist.Count > 0
    ? toWago(result.Todoist.Count)
    : 'Zero :v:';

  let widget = createWidget("Read", `${result.Toggl.MinutesTracked} m`, "Tasks due", dueNote, colour);
  
  Script.setWidget(widget);
  Script.complete();
} else {
  if (config.runsWithSiri){
    Speech.speak(`Today you have ${result.Todoist.Count} tasks and you've read ${result.Toggl.MinutesTracked} minutes.`);
  } else {
    let alert = new Alert();
    alert.title = 'Today';
    alert.message = `${result.Todoist.Count} tasks due and read ${result.Toggl.MinutesTracked} Minutes.`;
    alert.presentAlert();
  }
}

function toWago(count) {
  switch(count) {
    case 0:
      return "れい";
    case 1:
      return "ひとつ";
    case 2:
      return "ふたつ";
    case 3:
      return "みっつ";
    case 4:
      return "よっつ";
    case 5:
      return "いつつ";
    case 6:
      return "むっつ";
    case 7:
      return "ななつ";
    case 8:
      return "やっつ";
    case 9:
      return "ここのつ";
    case 10:
      return "とお";
    default:
      return count.toString();
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
