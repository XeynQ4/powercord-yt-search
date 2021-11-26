# Youtube Search for Powercord

This plugin adds .yt or .youtube command that searches youtube for the query user provided as the first argument.

## Setup Guide
To use this plugin you need to get a Youtube API key. You can get it by following these steps:
1. Go to https://console.cloud.google.com/
2. Agree to TOS and click on "Select a project" button in upper left corner
3. From the popup, select "NEW PROJECT"
4. Name it hovewer you want and don't change the location (by default it should be "No organization")
5. Click "CREATE"
6. In the left pannel find and go to "APIs & Services"
7. Click on the "ENABLE APIS AND SERVICES" button and search for "YouTube Data API v3" (it has to be this exact one. As of now, there are three different youtube apis but you have to chose this one)
8. Click "ENABLE" button and wait for it to load it should take you to "Overview" page
9. Go to "Credentials" from the left menu and up on the page, there should be button "CREATE CREDENTIALS". Click the button and select "API key"
10. It will create your API key. Copy it and paste it into this plugins settings
11. If you accidentally clicked off of the popup without copying or want to copy it again, just click the "Copy API key" button on the row with API key 1
