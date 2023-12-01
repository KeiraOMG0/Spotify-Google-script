# Spotify Controls on Google

This userscript adds Spotify controls to the Google homepage, allowing you to control your Spotify playback without leaving the Google page.

## Prerequisites

Before using this script, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Tampermonkey](https://www.tampermonkey.net/)

## Installation

1. Clone or download this repository to your local machine.

```bash
git clone https://github.com/your-username/spotify-controls-on-google.git
Navigate to the project folder.
cd spotify-controls-on-google
Install the required Node.js packages.
npm install
Edit the .env file in the project root and add your Spotify API credentials.
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret
Start the server.
The server will run on http://localhost:8080.

Open the tampermonkey-script.js file and replace your_spotify_client_id with your actual Spotify Client ID.

Open Tampermonkey and create a new script. Paste the contents of tampermonkey-script.js into the script editor.

Save the Tampermonkey script.

Now, when you visit the Google homepage, you should see the Spotify controls.

Spotify API Credentials
To obtain your Spotify API credentials, follow these steps:

Visit the Spotify Developer Dashboard.

Log in with your Spotify account or create a new one.

Click on "Create an App."

Fill in the required information and click "Create."

Once your app is created, copy your "Client ID" and "Client Secret" and add them to the .env file in your project.


Usage
Open Tampermonkey and create a new script. Paste the contents of tampermonkey-script.js into the script editor. Save the Tampermonkey script.

Now, when you visit the Google homepage, you should see the Spotify controls.

Combining with Another Script
If you want to combine this script with another Tampermonkey script, you can follow these steps:

Open the other script you want to combine (e.g., custom-google-homepage.user.js).

Copy the entire script content.

Open tampermonkey and create a new script.

Paste the script

Save the Tampermonkey script.

Now, you should have both scripts running together.

Credits
[KeiraOMG0]
