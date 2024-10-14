import express, { Request, Response, NextFunction } from 'express';
import exp from "node:constants";
import internal from "node:stream";
const app = express();
const http = require("http");
const cors = require("cors");
// const bodyParser = require("body-parser")

// CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allows cookies to be sent
};


app.use(cors(corsOptions));
app.use(express.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server listening on port 8080.")
});

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

let token: string = "test";

app.get("/api/credentials", (req: Request, res: Response) => {
    if (token) {
        res.send({"status": "success"})
    }
    else {
        res.send({"status": "error"})
    }
});


app.get("/api/auth", async (req: Request, res: Response) => {
    console.log("Auth API endpoint reached");
    try {
        const redirectURL = await generateRedirect(); // Ensure to await the promise
        console.log(redirectURL)
        res.redirect(redirectURL); // Redirect to the generated URL
    } catch (error) {
        console.error('Error generating redirect URL:', error);
        res.status(500).send('Internal Server Error'); // Send an error response
    }
});

app.get("/api/spotify_redirect", (req: Request, res: Response) => {
    const code = req.query.code as string | undefined; // Accessing the 'code' parameter    let code = urlParams.get('code')

    if (code) {
        console.log("Success! The Auth Code is: " + code);
        res.redirect("http://localhost:3000")
        // setAuthCode(code);
    } else {
        // authDenied();
        console.log("Authentication denied.")
    }
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
    return crypto.subtle.digest('SHA-256', data)
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

const clientId = '31058fbf04d542fcbc3a5f21dd8a40f3';
const redirectUri = 'http://localhost:8080/api/spotify_redirect';
// const prodScope = 'playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public ugc-image-upload user-library-read user-library-modify';
const scope = 'playlist-read-private playlist-read-collaborative user-library-read';
const authUrl = new URL("https://accounts.spotify.com/authorize")

async function  generateRedirect() {
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    // generated in the previous step

    const params =  {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    return authUrl.toString();
}
