function renameOutdatedFiles() {
  // Change string between single quotes to the folder ID from the URL
  const folderId = '';

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    file.setName(`[Outdated] ${file.getName()}`);
  }
}
