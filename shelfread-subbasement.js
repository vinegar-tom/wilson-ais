function onFormSubmit(e) {
  const form = FormApp.getActiveForm();
  const formItems = form.getItems();

  const itemResponses = e.response.getItemResponses();
  const callNumber = itemResponses[1];

  // Description is always item immediately before call number question
  formItems[callNumber.getItem().getIndex() - 1].asPageBreakItem()
    .setHelpText(`Start at: ${callNumber.getResponse()}`);
}
