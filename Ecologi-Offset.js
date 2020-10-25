// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: user-md;

// Sign up to Ecologi if you haven't already -> https://ecologi.com/jacob?r=5f06306809bb2c0017d8e912

// Runs using this Azure Function -> https://github.com/jacobpretorius/Azure-Functions/blob/master/src/EcologiStats/index.js
// Get the deployed URL from your Azure functions portal and replace below
const url = 'https://something.azurewebsites.net/api/EcologiStats?code=123==';

const req = new Request(url);
const result = await req.loadJSON();

if (config.runsInWidget) {
  // create and show widget
  let colour = '#41cb86';
  
  let widget = createWidget('Trees planted', result.TreesPlanted.toString(), 'CO2 Offset', `${result.CarbonOffset}t`, colour);
  Script.setWidget(widget);
  Script.complete();
} else {
  if (config.runsWithSiri){
    Speech.speak(`You have planted ${result.TreesPlanted} trees and offset ${result.CarbonOffset} tonnes of carbon. `);
  } else {
    let alert = new Alert();
    alert.title = 'Ecologi Stats';
    alert.message = `${result.TreesPlanted} Trees planted and ${result.CarbonOffset} tonnes of CO2 offset`;
    alert.presentAlert();
  }
}

function createWidget(prePlanted, planted, preOffset, offset, color) {
  let widget = new ListWidget();
  widget.backgroundColor = new Color(color);

  let trees = widget.addText("🌳🌳🌳");
  // trees.textColor = Color.white();
  trees.textOpacity = 0.8;
  trees.textSize = 18;
  
  let spacer1 = widget.addSpacer();
  
  let prePlantedTxt = widget.addText(prePlanted);
  prePlantedTxt.textColor = Color.white();
  prePlantedTxt.textOpacity = 0.8;
  prePlantedTxt.textSize = 14;
  
  let plantedTxt = widget.addText(planted);
  plantedTxt.textColor = Color.white();
  plantedTxt.textSize = 23;
  
  let spacer = widget.addSpacer();
  
  let preOffsetTxt = widget.addText(preOffset);
  preOffsetTxt.textColor = Color.white();
  preOffsetTxt.textOpacity = 0.8;
  preOffsetTxt.textSize = 14;

  let offsetTxt = widget.addText(offset);
  offsetTxt.textColor = Color.white();
  offsetTxt.textSize = 23;
  
  return widget;
}
