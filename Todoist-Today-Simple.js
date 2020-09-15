// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: user-md;

// Runs using this Azure Function -> https://github.com/jacobpretorius/Azure-Functions/blob/master/src/TodoistGetItemsToday/index.js
// Get the deployed URL from your Azure functions portal and paste it below
const url = 'https://something.azurewebsites.net/api/TodoistGetItemsToday?code=SECRET';

const req = new Request(url);
const result = await req.loadJSON();

if (config.runsInWidget) {
  // create and show widget with switching colours
  let colour = result.Count === 0 ? ‘#41cb86’ : ‘#33C6FF’;
  
  let widget = createWidget(“Tasks today”, `${result.Count}`, colour);
  Script.setWidget(widget);
  Script.complete();
} else {
  if (config.runsWithSiri){
    Speech.speak(`Today you have ${result.Count} tasks.`);
  } else {
    let alert = new Alert();
    alert.title = ‘Tasks today’;
    alert.message = `${result.Count} tasks.`;
    alert.presentAlert();
  }
}

function createWidget(pretitle, title, color) {
  let widget = new ListWidget();
  widget.backgroundColor = new Color(color);

  let preTxt = widget.addText(pretitle);
  preTxt.textColor = Color.white();
  preTxt.textOpacity = 0.8;
  preTxt.textSize = 16;

  let titleTxt = widget.addText(title);
  titleTxt.textColor = Color.white();
  titleTxt.textSize = 23;

  return widget;
}
