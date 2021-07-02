///////////
// Cards //
///////////

function getHomepageCard() {
  return getStartingCard();
}

function getStartingCard() {
  let header = CardService.newCardHeader();
  header.setTitle("Select a Steam Market Listing email.");

  let section = CardService.newCardSection();
  section.addWidget(CardService.newTextParagraph().setText('It will have the subject line "Community Market Listing Confirmation".'));

  return CardService.newCardBuilder().setHeader(header).addSection(section).build();
}

function getMessageCard(evt) {
  let thread = getThreadFromEvent(evt);
  if (thread.getFirstMessageSubject() !== "Community Market Listing Confirmation") {
    return getStartingCard();
  }

  let section = CardService.newCardSection();
  section.setHeader("To Begin");
  section.addWidget(CardService.newTextParagraph().setText("Click Generate to build a list of URLs from your Steam Marketplace links."));

  let btnGenerate = CardService.newTextButton();
  btnGenerate.setText("Generate");
  btnGenerate.setOnClickAction(CardService.newAction().setFunctionName("actionCreateOutputCard"));

  section.addWidget(btnGenerate);

  return CardService.newCardBuilder().addSection(section).build();
}

function getOutputCard(evt) {
  let thread = getThreadFromEvent(evt);
  let output = getGeneratedURLs(thread);

  let section = CardService.newCardSection();
  section.setHeader("Output");
  section.addWidget(CardService.newTextParagraph().setText("Select and copy URLs below for use in automation."));
  section.addWidget(CardService.newTextInput().setFieldName("outputField").setMultiline(true).setValue(output));

  return CardService.newCardBuilder().addSection(section).build();
}


///////////
// Logic //
///////////

function getThreadFromEvent(evt) {
  let threadId = evt.gmail.threadId;
  return GmailApp.getThreadById(threadId);
}

function actionCreateOutputCard(evt) {
  let navigation = CardService.newNavigation();
  navigation.pushCard(getOutputCard(evt));
  return CardService.newActionResponseBuilder().setNavigation(navigation).build();
}

function getGeneratedURLs(thread) {
  let output = "";
  let re = /(https\:\/\/steamcommunity\.com\/market\/confirmlisting\/\d+\?accountid\=\d+&amp;confirmation_code\=\d+)/;

  let messages = thread.getMessages();
  messages.forEach(message => {
    let body = message.getBody();
    let url = re.exec(body)[0];
    url = url.replace(/&amp;/g, '&'); // Clean ampersand entities from URL
    output += url + "\n";
  });

  // Error handling
  if (!output) {
    output = "No Steam Market Listings found";
  }

  return output;
}
