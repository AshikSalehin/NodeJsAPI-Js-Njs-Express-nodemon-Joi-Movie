const express = require('express');
const route = express.Router();
const Joi = require('@hapi/joi');
const movies =[
    {id:0, name:''},
    {id:1, name:'star war'},
    {id:2, name:'Avatar'},
    {id:3, name:'Tarjan'},
    {id:4, name:'Kungfu'},
    {id:5, name:'Captain Amarica'},
    {id:6, name:'Toy Story'},
    {id:7, name:'Mallificient'}
];

route.use('/api/movies', (req, res, next) => {
    console.log(req.url, req.method);
    next();
})


route.get('/', (req,res) =>{
    res.send('Hello Everyone from nodemon');
});

route.get('/api/movies', (req,res) =>{
    res.send(movies);
});
route.get('/api/movies/:id', (req,res) =>{
    var movieId=req.params.id;
    movieId=Number(movieId);
    if(movieId<movies.length) res.send(movies[movieId]);
    else res.send("Maximum value of id is :"+(movies.length-1));
});

route.post('/api/movies', (req, res) => {

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
    }*/

    let movie = {
        id:movies.length,
        name:req.body.name
    }
    movies.push(movie);
    res.send(movie);
})

route.put('/api/movies/:id', (req, res) => {
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

});

route.delete('/api/movies/:id', (req, res) => {
    var movieId=req.params.id;
    movieId=Number(movieId);
    let movie=movies[movieId];
    if(!(movieId<movies.length)) res.send("no movie found for id: "+movieId);

    movies.splice(movieId,1);
    res.send(movie);
});


module.exports = route;