function onFormSubmit(e) {
  const form = FormApp.getActiveForm();
  const formItems = form.getItems();
  const itemResponses = e.response.getItemResponses();

  // 4th floor has only one active section
  if (itemResponses[0].getResponse() === '4th Floor') {
    formItems[itemResponses[1].getItem().getIndex() - 1].setHelpText(
      `Start at row: ${itemResponses[1].getResponse()}`
    );
  // 2nd and 3rd floor have two active sections
  } else {
    try {
      const startingRowQuestion = itemResponses[1].getItem()
        .asMultipleChoiceItem();
      const initialChoices = startingRowQuestion.getChoices();
      const endingRow = itemResponses[2].getResponse();

      if (itemResponses[1].getResponse() === initialChoices[0].getValue()) {
        startingRowQuestion.setChoiceValues([
          endingRow,
          initialChoices[1].getValue()
        ]);
      } else {
        startingRowQuestion.setChoiceValues([
          initialChoices[0].getValue(),
          endingRow
        ]);
      }
    // Persistent error, probably from Form being left open in browser
    } catch (e) {
      console.error('Invalid form submission; no starting row selected.');
    }
  }
}
