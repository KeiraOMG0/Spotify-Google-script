# Spotify Controls on Google

This userscript adds Spotify controls to the Google homepage, allowing you to control your Spotify playback without leaving the Google page.

## Prerequisites

Before using this script, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Tampermonkey](https://www.tampermonkey.net/)
- [Spotify Developer](https://developer.spotify.com/dashboard)

## Installation

1. Clone the repo to your local machine.
```bash
git clone https://github.com/KeiraOMG0/Spotify-Google-script.git
```
You can also download the zip if you wish.

2. Navigate to the project folder.
```bash
cd Spotify-Google-script
```
If you downloaded the zip, you need to unzip it first.

3. Open `server.js` and replace the `CLIENT ID HERE` with your Spotify client ID, then replace `CLIENT SECRET HERE` with your Spotify client secret.

4. Edit the `tampermonkey-script.js` file and replace `TOKEN_HERE` with your Spotify client ID. (To get the Spotify client id and Cleint secret go to the spotify develpoer, make a app and then you can copy them.You will need the "Web API"

5. Start the server. The server will run on http://localhost:8080.

6. Open Tampermonkey and create a new script. Paste the contents of tampermonkey-script.js into the script editor and save it. Now, when you visit the Google homepage, you should see the Spotify controls!

7. The custom-google-home-page.js is not required but it was used when develping the spotify + google script so if the buttons seem abit random.

8. To install open Tampermonkey and create a new script. Paste the contents of custom-google-home-page.js into the script editor and save it. Now, when you visit the Google homepage, you should see the new buttons, guess the number game, and timer!
