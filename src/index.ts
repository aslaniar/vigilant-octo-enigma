import express, { Request, Response, NextFunction } from 'express';
import exp from "node:constants";
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

