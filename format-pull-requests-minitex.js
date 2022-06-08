function formatPullRequests() {
  const sheet = SpreadsheetApp.getActiveSheet();

  // Delete and reorder columns
  sheet.deleteColumns(4, 11);
  sheet.deleteColumns(6, 4);
  sheet.deleteColumns(7, 7);
  sheet.deleteColumns(8, 1);

  const colA = sheet.getRange(1, 1, sheet.getLastRow());
  sheet.moveColumns(colA, 3);

  // Insert "Found?" column
  sheet.insertColumnAfter(7);
  sheet.getRange('H1').setValue('Found?');

  // Freeze heading row; sort by "C" then "A"
  sheet.setFrozenRows(1);

  sheet.sort(3);
  sheet.sort(1);

  // Format text and sheet layout
  sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight('bold');

  sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
    .setWrap(true)
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, true, true);

  const colWidths = [115, 280, 175, 130, 90, 120, 125, 70];
  for (let i = 0; i < colWidths.length; i++) {
    sheet.setColumnWidth((i + 1), colWidths[i]);
  }

  // Highlight "Home Delivery" and UMC/UMD
  const destinations = sheet.getRange(2, 6, sheet.getLastRow() - 1, 2).getValues();
  for (let i = 0; i < destinations.length; i++) {
    const row = destinations[i];
    if (row[0] === 'Home Delivery') {
      let range = sheet.getRange(i + 2, 6);
      if (row[1].slice(0, 3) === 'UMC' || row[1].slice(0, 3) === 'UMD') {
        range = sheet.getRange(i + 2, 6, 1, 2);
      }
      range.setFontWeight('bold')
        .setFontStyle('italic')
        .setFontSize(12);
    }
  }

  // Rename sheet with username and date
  const email = Session.getActiveUser().getEmail();
  const userName = email.slice(0, email.lastIndexOf('@'));

  const date = new Date().toLocaleString('en-US');
  const dateStamp = date.slice(0, date.lastIndexOf('/')) + date.slice(date.indexOf(' '));

  sheet.setName(`${userName} ${dateStamp}`);
}
