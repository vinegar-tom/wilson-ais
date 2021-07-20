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
      rowCount += 1;
      alikeRows.push(rowCount);
    }
  }

  var row = 2;

  for (const number of alikeRows) {
    sheet.getRange(row, 12, number).merge();
    sheet.getRange(row, 13, number).merge();
    row += number;
  }
}
