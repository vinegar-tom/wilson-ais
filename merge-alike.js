function mergeAlike() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const primaryIDs = sheet.getRange(2, 9, sheet.getLastRow() - 1).getValues();
  var rowCount = 0;
  const alikeRows = [];

  for (let i = 0; i < primaryIDs.length; i++) {
    if (i !== primaryIDs.length - 1) {
      rowCount += 1;
      if (primaryIDs[i][0] !== primaryIDs[i + 1][0]) {
        alikeRows.push(rowCount);
        rowCount = 0;
      }
    } else {
      if (primaryIDs[i][0] !== primaryIDs[i - 1][0]) {
        alikeRows.push(1);
      } else {
        rowCount += 1;
        alikeRows.push(rowCount);
      }
    }
  }

  rowCount = 2;

  for (let i = 0; i < alikeRows.length; i++) {
    const mergeNumber = alikeRows[i];
    sheet.getRange(rowCount, 12, mergeNumber).merge();
    sheet.getRange(rowCount, 13, mergeNumber).merge();
    rowCount += mergeNumber;
  }
}
