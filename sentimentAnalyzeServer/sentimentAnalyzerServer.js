const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: api_key,
    }),
    serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}
const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let nluinstance = getNLUInstance();
    const analyzeParams = {
        'html':req,
        'features':{
            'emotion':{
                'targets':[]
            }
        }
    }
    nluinstance.analyze(analyzeParams).then(analysisResults => {
        res.send(analysisResults.result.analyzed_text);
    }).catch(err =>{
        res.send(err.toString());
    })
});

app.get("/url/sentiment", (req,res) => {
    let nluinstance = getNLUInstance();
    const analyzeParams = {
        'html':req,
        'features':{
            'sentiment':{
                'targets':[]
            }
        }
    }
    nluinstance.analyze(analyzeParams).then(analysisResults => {
<<<<<<< HEAD
        res.send(analysisResults.result.analyzed_text);
=======
        res.send(JSON.stringify(analysisResults),null,2);
>>>>>>> d77b20f68cff1adf348785ee9ec8036c53006162
    }).catch(err =>{
        res.send(err.toString());
    })
});

app.get("/text/emotion", (req,res) => {
    let nluinstance = getNLUInstance();
    const analyzeParams = {
        'html':req,
        'features':{
            'emotion':{
                'targets':[]
            }
        }
    }
    nluinstance.analyze(analyzeParams).then(analysisResults => {
<<<<<<< HEAD
        res.send(analysisResults.result.analyzed_text);
=======
        res.send(JSON.stringify(analysisResults),null,2);
>>>>>>> d77b20f68cff1adf348785ee9ec8036c53006162
    }).catch(err =>{
        res.send(err.toString());
    })
    
});

app.get("/text/sentiment", (req,res) => {
    let nluinstance = getNLUInstance();
    const analyzeParams = {
        'html':req,
        'features':{
            'sentiment':{
                'targets':[]
            }
        }
    }
    nluinstance.analyze(analyzeParams).then(analysisResults => {
<<<<<<< HEAD
        res.send(analysisResults.result.analyzed_text);
=======
        res.send(JSON.stringify(analysisResults),null,2);
>>>>>>> d77b20f68cff1adf348785ee9ec8036c53006162
    }).catch(err =>{
        res.send(err.toString());
    })
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

