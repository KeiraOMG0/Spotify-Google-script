const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const app = express();
const PORT = 8080;

// Spotify API credentials
const CLIENT_ID = 'CLIENT ID HERE';
const CLIENT_SECRET = 'CLIENT SECRET HERE';
const REDIRECT_URI = 'http://localhost:8080/callback';

// Temporary storage for the access token (not suitable for production)
let accessToken = null;

// Spotify API endpoints
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

// Route to initiate the Spotify authorization
app.get('/authorize', (req, res) => {
    const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=user-read-private user-modify-playback-state`;
    res.redirect(authorizeUrl);
});

// Route to handle the Spotify callback and exchange the authorization code for an access token
app.get('/callback', async (req, res) => {
    const { code } = req.query;

    try {
        // Exchange the authorization code for an access token
        const tokenResponse = await axios.post(
            'https://accounts.spotify.com/api/token',
            querystring.stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        // Store the access token (in-memory storage, not suitable for production)
        accessToken = tokenResponse.data.access_token;

        res.send('Authorization complete. You can close this window.');
    } catch (error) {
        console.error('Error exchanging code for access token:', error.message);
        res.status(500).send('Error during authorization.');
    }
});

// Route to control playback: Play
app.get('/play', async (req, res) => {
    try {
        await axios.put(
            `${SPOTIFY_API_BASE_URL}/me/player/play`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        res.send('Playback is now playing.');
    } catch (error) {
        console.error('Error starting playback:', error.message);
        res.status(500).send('Error starting playback.');
    }
});

// Route to control playback: Pause
app.get('/pause', async (req, res) => {
    try {
        await axios.put(
            `${SPOTIFY_API_BASE_URL}/me/player/pause`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        res.send('Playback is now paused.');
    } catch (error) {
        console.error('Error pausing playback:', error.message);
        res.status(500).send('Error pausing playback.');
    }
});

// Route to control playback: Next Track
app.get('/next', async (req, res) => {
    try {
        await axios.post(
            `${SPOTIFY_API_BASE_URL}/me/player/next`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        res.send('Skipped to the next track.');
    } catch (error) {
        console.error('Error skipping to the next track:', error.message);
        res.status(500).send('Error skipping to the next track.');
    }
});

// Route to control playback: Previous Track
app.get('/previous', async (req, res) => {
    try {
        await axios.post(
            `${SPOTIFY_API_BASE_URL}/me/player/previous`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        res.send('Returned to the previous track.');
    } catch (error) {
        console.error('Error returning to the previous track:', error.message);
        res.status(500).send('Error returning to the previous track.');
    }
});

// ... (existing code)

// Route to control playback: Volume
app.get('/volume', async (req, res) => {
    const { volume_percent } = req.query;
    try {
        await axios.put(
            `${SPOTIFY_API_BASE_URL}/me/player/volume?volume_percent=${volume_percent}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        res.send(`Volume is now set to ${volume_percent}%.`);
    } catch (error) {
        console.error('Error setting volume:', error.message);
        res.status(500).send('Error setting volume.');
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
