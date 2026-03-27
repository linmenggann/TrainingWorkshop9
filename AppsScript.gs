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
