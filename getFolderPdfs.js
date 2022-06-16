function getFolderPdfs() {
  // Input folder ID before running; can be found in folder's URL in Drive
  const folderId = '';

  const rootFolder = DriveApp.getFolderById(folderId);
  const spreadsheet = SpreadsheetApp.create(`PDFs in "${rootFolder.getName()}"`);
  Logger.log(spreadsheet.getUrl());
  const sheet = spreadsheet.getSheets()[0];
  sheet.appendRow(['Name', 'URL']);

  function listFolderPdfs(folder) {
    const files = folder.getFilesByType('application/pdf');
    while (files.hasNext()) {
      const file = files.next();
      if (!file.getUrl().includes('resourcekey')) {
        sheet.appendRow([file.getName(), file.getUrl()]);
      }
    }
  }

  function iterateFolders(folder) {
    listFolderPdfs(folder);

    const childFolders = folder.getFolders();
    while (childFolders.hasNext()) {
      const childFolder = childFolders.next();
      iterateFolders(childFolder);
    }
  }

  iterateFolders(rootFolder);
}
