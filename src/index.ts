import express, { Request, Response, NextFunction } from 'express';
import exp from "node:constants";
import internal from "node:stream";
const app = express();
const http = require("http");
const cors = require("cors");
// const bodyParser = require("body-parser")

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.get("/main", (req: Request, res: Response) => {
    res.sendFile('index.html', {root: __dirname })
});

app.get("/react", (req: Request, res: Response) => {
    res.sendFile('../client/index.tsx', {root: __dirname })
});

app.post("/api/data", (req: Request, res: Response) => {
    const receivedData = req.body; // Access the data sent by React
    console.log('Data received from React:', receivedData);
    const data = receivedData.data;
    console.log("Input was:", data);
    // console.log(req);
    // Send a response back to React
    res.json({ message: 'Data received successfully!', receivedData });

});


const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server listening on port 8080.")
});


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

// const hashed: ArrayBuffer = await sha256(codeVerifier)
// const codeChallenge: string = base64encode(hashed);

let codeChallenge: string | undefined; // Declare a variable in the outer scope

const startApp = async () => {
    const codeVerifier = generateRandomString(64);

    const hashed: ArrayBuffer = await sha256(codeVerifier);
    codeChallenge = base64encode(hashed); // Assign the value to the outer variable
};

// Call the async wrapper function
startApp()
    .then(() => {
        console.log('Final Code Challenge:',  codeChallenge);
        // You can use finalCodeChallenge here
    })
    .catch((error) => {
        console.error('Error starting the app:', error);
    });




const clientId = '31058fbf04d542fcbc3a5f21dd8a40f3';
const redirectUri = 'http://localhost:8080';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

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

