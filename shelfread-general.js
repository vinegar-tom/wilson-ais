function onFormSubmit(e) {
  const form = FormApp.getActiveForm();
  const formItems = form.getItems();

  const itemResponses = e.response.getItemResponses();
  const callNumber = itemResponses[2];

  // Description is always item immediately before call number question
  formItems[callNumber.getItem().getIndex() - 1].setHelpText(
    `Start at: ${callNumber.getResponse()}`
  );
}
