function copyColumns() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const copySheet = spreadsheet.getSheetByName('Copy');
  const inputSheet = spreadsheet.getSheetByName('Data Input');

  const copyValues = copySheet.getDataRange().getValues().filter((_, i) => {
    return i !== 0;
  });
  const numRows = copyValues.length;
  const numColumns = copyValues[0].length;

  const destColumns = [null, 6, 10, 19, null, 28, 31, 34, 39, 41, 42, 43, 47];
  
  for (let i = 0; i < numColumns; i++) {
    if (destColumns[i] == null) continue;
    const destRange = inputSheet.getRange(5, destColumns[i], numRows);

    // Correct string formatting for price
    if (destColumns[i] == 31) {
      destRange.setValues(copyValues.map(row => {
        if (row[i].toString().includes('.')) return [row[i]];
        return [row[i].toString() + '.00'];
      }));
      continue;
    }

    // Removal of special characters needed for line note
    if (destColumns[i] == 39) {
      const nonASCII = /[^\x00-\x7F]/gu;
      const otherIllegal = /["<>%`]/gu;
      const ampersand = /&/gu;

      destRange.setValues(copyValues.map(row => {
        let lineNote = row[i].normalize("NFKD");
        lineNote = lineNote.replaceAll(nonASCII, '');
        lineNote = lineNote.replaceAll(otherIllegal, '');
        lineNote = lineNote.replaceAll(ampersand, 'and');
        return [lineNote];
      }));
      continue;
    }

    destRange.setValues( copyValues.map(row => [row[i]]) );
  }
}
