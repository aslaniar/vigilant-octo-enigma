import express, { Request, Response, NextFunction } from 'express';
const app = express();
const http = require("http");

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.get("/main", (req: Request, res: Response) => {
    res.sendFile('index.html', {root: __dirname })
});

app.get("/react", (req: Request, res: Response) => {
    res.sendFile('../client/index.tsx', {root: __dirname })
});

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server listening on port 8080.")
});