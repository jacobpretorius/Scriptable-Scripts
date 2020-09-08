// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: user-md;
const url = 'https://startpage.service.webproject.za.net/api'
const req = new Request(url)
const result = await req.loadJSON()

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const [date, month, year] = yesterday.toLocaleDateString().split("/");
const yesterdayFormatted = `${year}-${month}-${date}`;
let yesterdayRead = result.goalChartData.substr(result.goalChartData.indexOf(yesterdayFormatted) + 14, 2);
if (yesterdayRead.includes(',')){
  yesterdayRead = yesterdayRead/substr(0, 1);
}

if (config.runsInWidget) {
  // create and show widget
  let widget = createWidget("Read yesterday", `${yesterdayRead} m`, "#41cb86")
  Script.setWidget(widget)
  Script.complete()
} else {
  if (config.runsWithSiri){
    Speech.speak(`Today you've read ${yesterdayRead} minutes.`)
  } else {
    let alert = new Alert()
    alert.title = 'Reading yesterday'
    alert.message = `${yesterdayRead} Minutes.`
    alert.presentAlert();
  }
}

function createWidget(pretitle, title, color) {
  let widget = new ListWidget()
  widget.backgroundColor = new Color(color)
  // This seems to be deprecated
  //widget.centerAlignContent()

  let preTxt = widget.addText(pretitle)
  preTxt.textColor = Color.white()
  preTxt.textOpacity = 0.8
  preTxt.textSize = 16

  let titleTxt = widget.addText(title)
  titleTxt.textColor = Color.white()
  titleTxt.textSize = 23
  
  return widget
}
