const express = require('express');
const exp = express();

//Adding movies module after export
const movies = require('./movies');

//For convert data into json format for posting
exp.use(express.json());

exp.use('/abc', movies);
/*
//Middleware to show the method and path in console
exp.use('/api/movies', (req, res, next) => {
    console.log(req.url, req.method);
    next();
})
*/
//For validation use joi package
//const joi = require('@hapi/joi');

//const path = require('path');

/*

exp.get('/', (req,res) =>{
    res.send('Hello Everyone from nodemon');
});

exp.get('/api/movies', (req,res) =>{
    res.send(movies);
});
exp.get('/api/movies/:id', (req,res) =>{
    var movieId=req.params.id;
    movieId=Number(movieId);
    if(movieId<movies.length) res.send(movies[movieId]);
    else res.send("Maximum value of id is :"+(movies.length-1));
});

exp.post('/api/movies', (req, res) => {

    const schema = Joi.object({
        name : Joi.string().min(3).required()

    });
    const result = schema.validate(req.body);
    console.log(result);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    /*if(!req.body.name || req.body.name.length<3){
        res.status(400).send('Invalid Movie Name or The movie name is very small');
        return;
    }/

    let movie = {
        id:movies.length,
        name:req.body.name
    }
    movies.push(movie);
    res.send(movie);
})

exp.put('/api/movies/:id', (req, res) => {
    var movieId=req.params.id;
    movieId=Number(movieId);
    let movie=movies[movieId];
    if(!(movieId<movies.length)) res.send("no movie found for id: "+movieId);
    const schema = Joi.object({
        name : Joi.string().min(3).required()

    });
    const result = schema.validate(req.body);
    console.log(result);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    movie.name = req.body.name;
    res.send(movie);

})





/*exp.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

exp.get('/person', (req,res) =>{
    res.send('This is person route');
});
exp.get('/person/:name/:age', (req,res) =>{
    console.log(req.params);
    //res.send(req.params);
    res.send(req.query);
});/

exp.delete('/api/movies/:id', (req, res) => {
    var movieId=req.params.id;
    movieId=Number(movieId);
    let movie=movies[movieId];
    if(!(movieId<movies.length)) res.send("no movie found for id: "+movieId);

    movies.splice(movieId,1);
    res.send(movie);
});

*/
const port = process.env.PORT || '5000';
exp.listen(port, () => console.log('listening to port: '+port));