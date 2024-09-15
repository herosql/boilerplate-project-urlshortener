require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

var shortUrls = new Map();

app.post('/api/shorturl',(req,res)=>{
  if(isValidHttpUrl(req.body.url)){
    let shortUrl = shortUrls.keys.length + 1;
    let parseUrl = {original_url:req.body.url,short_url:shortUrl};
    shortUrls.set(shortUrl,parseUrl.original_url);
    res.json(parseUrl);
  }else{
    res.json( { error: 'invalid url'});
  }
 
});

function isValidHttpUrl(url) {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?' + // port
    '(\\/[-a-z\\d%_.~+]*)*' + // path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return pattern.test(url);
}

app.get('/api/shorturl/:shortUrl',(req,res)=>{
  let parse = { error: 'invalid url'};
  if(req.params.shortUrl && shortUrls.has(Number(req.params.shortUrl))){
    res.redirect(302, shortUrls.get(Number(req.params.shortUrl)));
  }else{
    res.json(parse);
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
