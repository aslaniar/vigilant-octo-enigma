import React from 'react';
import spotify from "../public/spotify.png"
import "./Welcome.css"
function Welcome() {





    return (
        <div>
            <p>Welcome! Link your Spotify Account to get Started!</p>

            <button type="button" className="btn btn-outline-light">Authenticate</button>


        </div>


    );
}

export default Welcome;