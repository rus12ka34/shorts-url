import express, { Request, response, Response } from "express";
import bodyParser from "body-parser";
import { getTesting } from "./requests";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript world!");
});

getTesting(10).then((response) => {
  console.log('response >> ', response);
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

