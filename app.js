const express = require('express');
const mongoose = require('mongoose');
const Crop = require('./models/crops');
const cropData = require('./data/cropdata');
const { query } = require('express');
const dotenv = require('dotenv').config();
const queryFunctions = require('./functions/query_functions');

const app = express();

// connect to mongoDB
const dbURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@crop-data.bff4s.mongodb.net/crop-data?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => app.listen(3000))
    .catch((error) => console.log(error));

// mongoose and mongo routes
// TEMP - add crops to the db
app.get('/add-crops', (req, res) => {
    const crops = cropData.forEach(crop => {
        const cropDbItem = new Crop(crop);
        cropDbItem.save()
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                console.log(error);
            });
    });
});

// get all db documents
app.get('/api/allcrops', (req, res) => {
    Crop.find()
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.log(error);
        });
});

// get a single crop by name
app.get('/api/crop/:name', (req, res) => {
    const parameter = new RegExp(req.params.name, 'i');
    Crop.find({name: parameter})
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.log(error);
        })
})

// get a list of crops by family
app.get('/api/family/:family', (req, res) => {
    const parameter = new RegExp(req.params.family, 'i');
    Crop.find({family: parameter})
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.log(error);
        })
});

// get a list of crops by hardiness
app.get('/api/hardiness/:hardiness', (req, res) => {
    const parameter = new RegExp(req.params.hardiness, 'i');
    Crop.find({hardiness: parameter})
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.log(error);
        })
});

// TODO - add query patterns for the below routes, ?name=, ?family= , ?hardiness= , ?sort= alphabetically? - maybe include queries for > & < on numbered queries
// TODO - summer squash data due to data structure change will need splitting into seperate bush and trailing varieties
// TODO - message if search returns nothing


// get a list of crops by sowing times for undercover or direct
// queries: ?range=before/after, ?family=familyname, ?hardiness=Hn
app.get('/api/sowing/undercover/:month', (req, res) => {
    const parameter = req.params.month;
    const query = req.query;
    let dbQuery = {
        "sowing.undercover": new RegExp(parameter, 'i')
    }

    dbQuery = queryFunctions.generateDbQuery(parameter, query, dbQuery);
    
    Crop.find(dbQuery)
    .then(result => {
        res.send(result);
    })
    .catch(error => {
        console.log(error);
    })
});

app.get('/api/sowing/direct/:month', (req, res) => {
    const parameter = req.params.month;
    const query = req.query;
    let dbQuery = {
        "sowing.direct": new RegExp(parameter, 'i')
    }

    dbQuery = queryFunctions.generateDbQuery(parameter, query, dbQuery);
    
    Crop.find(dbQuery)
    .then(result => {
        res.send(result);
    })
    .catch(error => {
        console.log(error);
    })
});

app.get('/api/sowing/latest/:month', (req, res) => {
    const parameter = req.params.month;
    const query = req.query;
    let dbQuery = {
        "sowing.latest": new RegExp(parameter, 'i')
    }

    dbQuery = queryFunctions.generateDbQuery(parameter, query, dbQuery);
    
    Crop.find(dbQuery)
    .then(result => {
        res.send(result);
    })
    .catch(error => {
        console.log(error);
    })
});

// get list of crops by transplanting times
app.get('/api/transplanting/:month', (req, res) => {
    const parameter = req.params.month;
    const query = req.query;
    let dbQuery = {
        "transplanting.from": new RegExp(parameter, 'i')
    }

    dbQuery = queryFunctions.generateDbQuery(parameter, query, dbQuery);
    
    Crop.find(dbQuery)
    .then(result => {
        res.send(result);
    })
    .catch(error => {
        console.log(error);
    })
});

// get a list of crops based on a specified row and interval spacing
// queries: ?family=familyname, ?hardiness=Hn
app.get('/api/spacing/:measurements', (req, res) => {
    const parameter = req.params.measurements.split(','); // array
    const query = req.query;
    let dbQuery = {
        "spacing.row": {$lte: parameter[0]},
        "spacing.interval": { $lte: parameter[1]}
    }

    dbQuery = queryFunctions.generateDbQuery(parameter, query, dbQuery);

    Crop.find(dbQuery)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.log(error);
        })
});

// get a list of crops based on a specified maturity time
app.get('/api/maturity/:days', (req, res) => {
    const parameter = req.params.days;
    const query = req.query;
    let dbQuery = {
        "harvesting.maturity.max_days": {$lte: parseInt(parameter)}
    }

    dbQuery = queryFunctions.generateDbQuery(parameter, query, dbQuery);

    Crop.find(dbQuery)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.log(error);
        })
});

app.get('/', (req, res) => {
    res.send('hello page, info on what request to make to the api');
});

// app.get('/vegetable', (req, res) => {
//     res.send('send a random vegetable data');
// });

// app.get('/vegetables', (req, res) => {
//     res.send('send a random 10 vegetable data');
// });



