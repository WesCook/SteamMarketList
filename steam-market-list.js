function doGet() {
	let output = "";
	let re = /(https\:\/\/steamcommunity\.com\/market\/confirmlisting\/\d+\?accountid\=\d+&amp;confirmation_code\=\d+)/;

	let threads = GmailApp.getInboxThreads();
	threads.forEach(thread => {
		// Skip thread if not a Steam Market confirmation
		if (thread.getFirstMessageSubject() !== "Community Market Listing Confirmation") {
			return;
		}

		let messages = thread.getMessages();
		messages.forEach(message => {
			// Add URL to list
			let body = message.getBody();
			let url = re.exec(body)[0];
			output += url + "\n";

			// Mark message as read
			message.markRead();
		});

		// Archive thread
		thread.moveToArchive();
	});

	// Print to log and return text output page
	if (!output) {
		output = "No Steam Market Listings found";
	}
	Logger.log(output);
	return ContentService.createTextOutput(output);
}
