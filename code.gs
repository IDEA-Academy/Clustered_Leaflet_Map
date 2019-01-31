/* This function runs when the page loads */
function doGet() {
  var page = HtmlService.createTemplateFromFile('app'); 
  return page.evaluate(); 
}


/* This function allows other page to be included in the template */
function include(file) {
  return HtmlService.createTemplateFromFile(file)
  .evaluate()
  .getContent();
}

function doGet() {
  var page = HtmlService.createTemplateFromFile('app');  
  
  /* This line adds the JSON string to the page template in a variable called json */ 
  page.json = createJsonFile();
  return page.evaluate(); 
  
}

function createJsonFile() {
  /* extractSheetAsJson takes 2 arguments the id of the speadsheet and the data range */   
  var res = extractSheetAsJson('###Link to Google Sheet hosted on Google Drive####',"###Data Range###");
  return res;
}

function extractSheetAsJson(file, range) {
  /* These lines open the speadsheet and get the data */
  var sheet = SpreadsheetApp.openById(file).getActiveSheet();  
  var data = sheet.getRange(range).getValues();
  
  /* These line format the sheets into a JSON string */ 
  var json = '[';

  for (i=1;i<data.length;i++) {
    if (data[i][0] === "") { continue; }
    json = json + '{"' + data[0][0] + '":"' + data[i][0] + '",'
    json = json + '"' + data[0][1] + '":"' + data[i][1] + '",'
    json = json + '"' + data[0][2] + '":"' + data[i][2] + '",'  
    json = json + '"' + data[0][3] + '":"' + data[i][3] + '",' 
    json = json + '"' + data[0][4] + '":"' + data[i][4] + '",' 
    json = json + '"' + data[0][5] + '":"' + data[i][5] + '",' 
    json = json + '"' + data[0][6] + '":"' + data[i][6] + '",' 
    json = json + '"' + data[0][7] + '":"' + data[i][7] + '"},'
  } 
  json = json.substring(0,json.length-1) + ']';

  return json.trim();  
}

function insertImageFromDrive(){
 var fileId = '###Google File ID###';
 var img = DriveApp.getFileById(fileId).getBlob();
 DocumentApp.getActiveDocument().getBody().insertImage(0, img); 
}