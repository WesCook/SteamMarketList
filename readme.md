# Steam Market List

Returns a list of URLs from Steam Market threads in Gmail.  This can be piped into [Postman](https://www.postman.com/) or similar tools for bulk confirmation of market transactions.

There's two scripts available which perform similar utilities.

### Web App

The web app runs directly on the [Google App Script](https://script.google.com/home) engine.  It will produce a list of URLs from all Steam market links in your inbox.

**Installation:** Create a new script in Google App Script and copy the code from [/webapp/Code.gs](webapp/Code.gs).  From the services menu, enable Gmail v1.  Press run and accept the OAuth prompt.  If all went well, URLs will populate the output log at the bottom.

This can optionally be deployed as a web app as well, where the output will instead generate to a new page.

![Web App Screenshot](/webapp/screenshot.png)

---

### Workspace Add-on

The second script makes up a Google Workspace Add-on for Gmail.  This requires considerably more effort to set up, but does embed nicely into the Gmail sidebar.

**Installation:** As above you start by creating a Google App Script.  Copy the files in [/addon/](addon) for the main script and manifest file.  Ensure that "Show 'appsscript.json' manifest file in editor" is enabled in Project Settings.

Google Cloud Platform is required to publish an add-on, even privately.  You can convert the script in settings, which involves setting up a new project.  This will require you set up IAM roles, OAuth scopes, and numerous API integrations.  Due to the complexities of this process, this code is provided as-is and does not include any support.

![Add-on Screenshot](/addon/screenshot.png)
