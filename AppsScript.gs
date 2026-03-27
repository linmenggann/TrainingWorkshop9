// ===== GET：讀取報名資料供儀表板使用 =====
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.openById("1nREPHRMx0Y6nyKKmgm3bDZKT2YnEhpMLIRKbyWTMvUs")
                              .getSheetByName("工作坊報名資料");

    var data = sheet.getDataRange().getValues();
    var headers = data[0];
    var rows = data.slice(1).filter(function(row) {
      return row.some(function(cell) { return cell !== ""; });
    });

    var result = rows.map(function(row) {
      var obj = {};
      headers.forEach(function(header, i) {
        obj[header] = row[i];
      });
      return obj;
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", data: result, total: result.length }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== POST：接收報名資料寫入試算表 =====
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById("1nREPHRMx0Y6nyKKmgm3bDZKT2YnEhpMLIRKbyWTMvUs")
                              .getSheetByName("工作坊報名資料");

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),           // 時間戳記
      data.name,            // 姓名
      data.organization,    // 機構名
      data.title,           // 職稱
      data.category,        // 負責的職類
      data.isHost,          // 是否擔任教學訓練計畫主持人
      data.joinMethod,      // 參與方式
      data.email,           // Email
      data.phone            // 聯繫電話
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "報名成功" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
