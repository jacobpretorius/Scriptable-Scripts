// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: user-md;
const togglProjectId = 123456789;

// Runs using this Azure Function -> https://github.com/jacobpretorius/Azure-Functions/blob/master/src/TogglProjectTrackedCheck/index.js
const azureFuncCode = "SECRET";
const url = `https://something.azurewebsites.net/api/TogglProjectTrackedCheck?code=${azureFuncCode}==&projectId=${togglProjectId}`;

const req = new Request(url);
const result = await req.loadJSON();
const readMinutes = Math.round(result.trackedDurationInMs / 60);

if (config.runsInWidget) {
  // create and show widget
  let widget = createWidget("Read today", `${readMinutes} m`, "#41cb86");
  Script.setWidget(widget);
  Script.complete();
} else {
  if (config.runsWithSiri){
    Speech.speak(`Today you've read ${readMinutes} minutes.`);
  } else {
    let alert = new Alert();
    alert.title = 'Reading';
    alert.message = `${readMinutes} Minutes.`;
    alert.presentAlert();
  }
}

function createWidget(pretitle, title, color) {
  let widget = new ListWidget();
  widget.backgroundColor = new Color(color);
  widget.centerAlignContent();
  
  let preTxt = widget.addText(pretitle);
  preTxt.textColor = Color.white();
  preTxt.textOpacity = 0.8;
  preTxt.textSize = 16;
  
  let titleTxt = widget.addText(title);
  titleTxt.textColor = Color.white();
  titleTxt.textSize = 23;
  
  return widget;
}