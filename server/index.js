import express from 'express';
import bodyParser from 'body-parser';
import pdf from 'html-pdf';
import cors from 'cors';
import template from './documents/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const port  = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//POST Route 
app.post('/create-pdf',(req,res)=>{
    const {name , receiptId , price1 , price2} = req.body;
    //pdfTemplate(name, price1, price2, receiptId
    pdf.create(template(req.body),{format : 'letter'}).toFile('result.pdf',(err)=>{
        if(err) {
           res.send(Promise.reject());
        } 

        res.send(Promise.resolve());
    })
})

//Get - Send the generated
app.get('/fetch-pdf',(req,res)=>{
    const dirPath = path.join(__dirname, '/result.pdf');
    res.sendFile(dirPath);
})

app.listen(port , ()=> console.log(`Listening on port ${port}`));
