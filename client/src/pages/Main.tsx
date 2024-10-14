import React, {useEffect, useState} from 'react';
import '../css/Main.css';
import PlaylistManager from './PlaylistManager';
import {response} from "express";


function Main() {
    const [loggedIn, setLoggedIn] = useState(false);


    fetch("http://localhost:8080/api/credentials")
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data["status"] == "success") {
                // load playlist manager
                console.log("playlist manager loading...")
                setLoggedIn(true);
            } else if (data["status"] == "error") {
                setLoggedIn(false)
            }
        })

    function authenticate() {
        window.location.href = 'http://localhost:8080/api/auth'
    };

    return (
        <div className="Main-header">
            {loggedIn ? <PlaylistManager></PlaylistManager> :

            <div className={"welcomeDiv"}>
                <p>Welcome! Link your Spotify Account to get Started!</p>
                <button type="button" className="btn btn-outline-light"
                        onClick={authenticate}>Authenticate
                </button>
            </div>
            }
        </div>
    )

}

export default Main;