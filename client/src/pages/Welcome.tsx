import React from 'react';
import spotify from "../../public/spotify.png"
import "../css/Welcome.css"
function Welcome() {

    const generateRandomString = (length: number) => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }

    const codeVerifier: string  = generateRandomString(64);

    const sha256 = async (plain: string) => {
        const encoder = new TextEncoder()
        const data = encoder.encode(plain)
        return window.crypto.subtle.digest('SHA-256', data)
    }

    const base64encode = (input: ArrayBuffer) => {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }

    const generateCodeChallenge = async (codeVerifier: string) => {
        const hashed = await sha256(codeVerifier);
        return base64encode(hashed);
    }

    // const codeChallenge = generateCodeChallenge(codeVerifier);

    const clientId = '31058fbf04d542fcbc3a5f21dd8a40f3';
    const redirectUri = 'http://localhost:8080';

    const scope = 'user-read-private user-read-email';
    const authUrl = new URL("https://accounts.spotify.com/authorize")



    async function  authenticate() {
        const codeChallenge = await generateCodeChallenge(codeVerifier);
        // generated in the previous step
        window.localStorage.setItem('code_verifier', codeVerifier);

        const params =  {
            response_type: 'code',
            client_id: clientId,
            scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
        }


        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();

        verify();
    }

    function verify() {

        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code')

        if (code != null) {
            console.log(code);
            // authConfirmed(code);
        } else {
            // authDenied();
            console.log("Authentication denied.")
        }
    }

    function authAccepted() {
        //this is basically gonna pass the auth code to the main component which will pass it to the playlist render component (i think)
    }



    return (
        <div className={"welcomeDiv"}>
            <p>Welcome! Link your Spotify Account to get Started!</p>

            <button type="button" className="btn btn-outline-light" onClick={authenticate}>Authenticate</button>


        </div>


    );
}

export default Welcome;