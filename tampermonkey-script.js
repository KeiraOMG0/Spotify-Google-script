// ==UserScript==
// @name         Spotify Controls with Volume on Google
// @version      1
// @description  Add Spotify controls with volume adjustment to Google page
// @author       KeiraOMG0
// @include     https://www.google.com/
// @exclude     https://www.google.com/search*
// @match *https://www.google.com/?gws_rd=ssl*
// @match        *://www.google.co.uk/*
// @match        *://www.google.ca/*
// @match        *://www.google.fr/*
// @match        *://www.google.de/*
// @match        *://www.google.it/*
// @match        *://www.google.es/*
// @match        *://www.google.se/*
// @match        *://www.google.nl/*
// @match        *://www.google.no/*
// @match        *://www.google.dk/*
// @match        *://www.google.fi/*
// @match        *://www.google.be/*
// @match        *://www.google.ch/*
// @match        *://www.google.at/*
// @match        *://www.google.ru/*
// @match        *://www.google.com.br/*
// @match        *://www.google.com.mx/*
// @match        *://www.google.com.ar/*
// @match        *://www.google.co.jp/*
// @match        *://www.google.co.kr/*
// @match        *://www.google.com.au/*
// @match        *://www.google.com.hk/*
// @match        *://www.google.co.in/*
// @match        *://www.google.co.id/*
// @match        *://www.google.com.sg/*
// @match        *://www.google.com.my/*
// @match        *://www.google.co.th/*
// @match        *://www.google.com.ph/*
// @match        *://www.google.com.vn/*
// @match        *://www.google.com.sa/*
// @match        *://www.google.ae/*
// @match        *://www.google.co.il/*
// @match        *://www.google.com.tr/*
// @match        *://www.google.co.za/*
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function () {
    'use strict';

    // Spotify API credentials
    const CLIENT_ID = '43d52e81239b4c9a9d08a7566ad312fc';
    const REDIRECT_URI = 'http://localhost:8080/callback';
    const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';

    // Spotify controls HTML
    const spotifyControlsHTML = `
        <div id="spotify-controls">
            <button id="authorize-button">Authorize Spotify</button>
            <button id="play-button">Play</button>
            <button id="pause-button">Pause</button>
            <button id="next-button">Next</button>
            <button id="prev-button">Previous</button>
            <input type="range" id="volume-slider" min="0" max="100" step="1" value="50">
            <input type="text" id="volume-input" placeholder="Volume %">
            <button id="set-volume-button">Set Volume</button>
            <span id="volume-label">Volume: 50%</span>
        </div>
    `;

    // Inject Spotify controls
    function injectSpotifyControls() {
        $('body').append(spotifyControlsHTML);

        // Add event listeners to control buttons
        $('#authorize-button').on('click', authorizeSpotify);
        $('#play-button').on('click', playSpotify);
        $('#pause-button').on('click', pauseSpotify);
        $('#next-button').on('click', nextTrack);
        $('#prev-button').on('click', previousTrack);

        // Volume slider event listener
        $('#volume-slider').on('input', updateVolume);

        // Volume input event listener
        $('#volume-input').on('input', validateVolumeInput);

        // Set volume button event listener
        $('#set-volume-button').on('click', setVolume);

        // Check if the user is already authorized
        checkAuthorization();
    }

    // Function to initiate Spotify authorization
    function authorizeSpotify() {
        window.location.href = `${SPOTIFY_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=user-modify-playback-state`;
    }

    // Function to check if the user is already authorized
    function checkAuthorization() {
        const accessToken = localStorage.getItem('spotify_access_token');
        if (accessToken) {
            console.log('User is already authorized with access token:', accessToken);
        }
    }

    // Your Spotify control functions using Spotify API
    function playSpotify() {
        makeControlRequest('play');
    }

    function pauseSpotify() {
        makeControlRequest('pause');
    }

    function nextTrack() {
        makeControlRequest('next');
    }

    function previousTrack() {
        makeControlRequest('previous');
    }

    // Function to update the volume
    function updateVolume() {
        const volume = $('#volume-slider').val();
        $('#volume-label').text(`Volume: ${volume}%`);
        $('#volume-input').val(volume);
        makeControlRequest('volume', { volume_percent: volume });
    }

    // Function to validate volume input
    function validateVolumeInput() {
        const inputVolume = $('#volume-input').val();
        if (inputVolume >= 0 && inputVolume <= 100) {
            $('#volume-slider').val(inputVolume);
            $('#volume-label').text(`Volume: ${inputVolume}%`);
        }
    }

    // Function to set volume using the input
    function setVolume() {
        const inputVolume = $('#volume-input').val();
        if (inputVolume >= 0 && inputVolume <= 100) {
            makeControlRequest('volume', { volume_percent: inputVolume });
        }
    }

    // Function to make requests to the Node.js server for controlling playback
    function makeControlRequest(action, params = {}) {
        $.get(`http://localhost:8080/${action}`, params, function (data) {
            console.log(data);
        });
    }

    // Add custom styles
    GM_addStyle(`
        #spotify-controls {
            position: fixed;
            top: 50px;
            left: 5px;
            z-index: 9999;
        }

        #spotify-controls button {
            margin-right: 5px;
        }

        #volume-slider, #volume-input, #set-volume-button {
            margin-right: 5px;
        }
    `);

    // Wait for the DOM to be ready before injecting controls
    $(document).ready(function () {
        injectSpotifyControls();
    });

})();
