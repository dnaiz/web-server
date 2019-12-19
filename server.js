const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=> new Date().getFullYear());
hbs.registerHelper('number',(num) => num+1);
app.set('view engine','hbs')
app.use(express.static(__dirname +'/public' ));

app.use((req, res, next) =>{
    res.render('maintenance.hbs');
    next();
});

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `method: ${req.method}, url: ${req.url}\n`;
    fs.appendFile('server.log',log,(err)=>{
        if(err){
            console.log('unable to append to server.log');
        }
    });
    next();
});

app.get('/', (req, res)=>{
    res.render('home.hbs',{
        pageTitle:'Welcome to the home page.'        
    })
});

app.get('/contact', (req, res) => {
    res.render('contact.hbs',{
        purpose:'contact us',
        pageTitle:'Contact Page'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page!'
    });
});

app.get('/bad',(req, res) => {
    res.send({
        errorMessage:'Error...  page not found'
    });
});


app.listen(port, () =>{
     console.log(`listening ${port}`);
});