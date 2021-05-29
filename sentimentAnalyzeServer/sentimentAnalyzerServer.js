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

        const analyzeParams = {
  'url' : req.query.url,
  'features': {
    'entities': {
      'emotion': true,
      'limit': 2,
    },
    'keywords': {
      'emotion': true,
      'limit': 2,
    },
  },
};
getNLUInstance().analyze(analyzeParams).then(analysisResults => {
    console.log(JSON.stringify(analysisResults.result.keywords[0].emotion, null, 2));
    return res.send(JSON.stringify(analysisResults.result.keywords[0].emotion, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });
});

app.get("/url/sentiment", (req,res) => {
    const analyzeParams = {
  'url' : req.query.url,
  'features': {
    'entities': {
      'sentiment': true,
      'limit': 2,
    },
    'keywords': {
      'sentiment': true,
      'limit': 2,
    },
  },
};
getNLUInstance().analyze(analyzeParams).then(analysisResults => {
    console.log(JSON.stringify(analysisResults.result.keywords[0].sentiment.label, null, 2));
    return res.send(JSON.stringify(analysisResults.result.keywords[0].sentiment.label, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });
});

app.get("/text/emotion", (req,res) => {
    const analyzeParams = {
  'text' : req.query.text,
  'features': {
    'entities': {
      'emotion': true,
      'limit': 2,
    },
    'keywords': {
      'emotion': true,
      'limit': 2,
    },
  },
};
getNLUInstance().analyze(analyzeParams).then(analysisResults => {
    console.log(JSON.stringify(analysisResults.result.keywords[0].emotion, null, 2));
    return res.send(JSON.stringify(analysisResults.result.keywords[0].emotion, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });

});

app.get("/text/sentiment", (req,res) => {
    const analyzeParams = {
  'text' : req.query.text,
  'features': {
    'entities': {
      'sentiment': true,
      'limit': 2,
    },
    'keywords': {
      'sentiment': true,
      'limit': 2,
    },
  },
};
getNLUInstance().analyze(analyzeParams).then(analysisResults => {
    console.log(JSON.stringify(analysisResults.result.keywords[0].sentiment.label, null, 2));
    return res.send(JSON.stringify(analysisResults.result.keywords[0].sentiment.label, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });

});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

