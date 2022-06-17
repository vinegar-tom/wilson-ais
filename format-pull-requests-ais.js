function formatPullRequests() {
  const sheet = SpreadsheetApp.getActiveSheet();

  // Delete and reorder columns
  sheet.deleteColumns(4, 11);
  sheet.deleteColumns(6, 4);
  sheet.deleteColumns(7, 7);
  sheet.deleteColumns(8, 1);

  const colA = sheet.getRange(1, 1, sheet.getLastRow());
  sheet.moveColumns(colA, 3);
  
  // Delete rows with Borchert Map Library locations
  const locations = sheet.getRange(2, 1, sheet.getLastRow() - 1).getValues();
  
  const borchertRows = [];
  for (let i = 0; i < locations.length; i++) {
    const location = locations[i][0];
    if (location.startsWith('Borchert')) borchertRows.push(i + 2);
  }

  let offset = 0;
  for (const rowNum of borchertRows) {
    sheet.deleteRow(rowNum - offset);
    offset += 1;
  }

  // Insert "Process at" and "Found?" columns
  sheet.insertColumnsAfter(7, 2);
  sheet.getRange('H1').setValue('Process At');
  sheet.getRange('I1').setValue('Found?');

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

  const colWidths = [115, 280, 175, 130, 90, 120, 125, 85, 70];
  for (let i = 0; i < colWidths.length; i++) {
    sheet.setColumnWidth((i + 1), colWidths[i]);
  }

  // Conditionals for "Pickup Location" and "Requester User Group"
  const destinations = sheet.getRange(2, 6, sheet.getLastRow() - 1, 2).getValues();
  for (let i = 0; i < destinations.length; i++) {
    const row = destinations[i];

    // Highlight "Home Delivery" && UMC/UMD
    if (row[0] === 'Home Delivery') {
      if (row[1].slice(0, 3) === 'UMC' || row[1].slice(0, 3) === 'UMD') {
        const range = sheet.getRange(i + 2, 6, 1, 2);
        range.setFontWeight('bold')
          .setFontStyle('italic')
          .setFontSize(12);
      }
    }

    // Set "Process at" value and formatting
    const processAtCell = sheet.getRange(i + 2, 8);
    if (row[0] === 'TC Wilson Library') {
      processAtCell.setValue('1st floor');
      processAtCell.setFontWeight('bold')
        .setFontStyle('italic')
        .setFontSize(12);
    } else {
      processAtCell.setValue('Basement');
    }
  }

  // Rename sheet with username and date
  const email = Session.getActiveUser().getEmail();
  const userName = email.slice(0, email.lastIndexOf('@'));

  const date = new Date().toLocaleString('en-US');
  const dateStamp = date.slice(0, date.lastIndexOf('/')) + date.slice(date.indexOf(' '));

  sheet.setName(`${userName} ${dateStamp}`);

  // Add datestamp row at top
  sheet.insertRowBefore(1);
  const dateStampCell = sheet.getRange(1, 8, 1, 2).merge();
  dateStampCell.setValue(dateStamp);
  dateStampCell.setHorizontalAlignment('normal');
}
