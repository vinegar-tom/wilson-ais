function removeSpecialChars() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lineNotesRange = sheet.getRange(5, 39, sheet.getLastRow() - 4);
  const lineNotes = lineNotesRange.getValues();

  const nonASCII = /[^\x00-\x7F]/gu;
  const otherIllegal = /["<>%]/gu;
  const ampersand = /&/gu;

  for (let i = 0; i < lineNotes.length; i++) {
    var lineNote = lineNotes[i][0];

    lineNote = lineNote.replaceAll(nonASCII, '');
    lineNote = lineNote.replaceAll(otherIllegal, '');
    lineNote = lineNote.replaceAll(ampersand, 'and');

    lineNotes[i][0] = lineNote;
  }

  lineNotesRange.setValues(lineNotes);
}
