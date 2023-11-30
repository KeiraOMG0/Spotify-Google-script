const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const app = express();
const PORT = 8080;

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;
let accessToken = null;

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

app.get('/authorize', (req, res) => {
    const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=user-read-private user-modify-playback-state`;
    res.redirect(authorizeUrl);
});

app.get('/callback', async (req, res) => {
    const { code } = req.query;

    try {
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

        accessToken = tokenResponse.data.access_token;
        res.send('Authorization complete. You can close this window.');
    } catch (error) {
        console.error('Error exchanging code for access token:', error.message);
        res.status(500).send('Error during authorization.');
    }
});

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
