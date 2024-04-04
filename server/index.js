var restify = require('restify');
const sqlite3 = require('sqlite3').verbose()
const path = require('path')

var server = restify.createServer();
server.use(restify.plugins.bodyParser());


const db = new sqlite3.Database //crea la connessione al database
    (path.join
        (__dirname,
            '../db',
            'database.db'
        )
    )

// console.log(path.join
//         (__dirname,
//             '../db',
//             'database.db'
//         )
//     )

server.get('/cars', function(req, res, next) {


    res.send('List of cars: [TODO]');
    return next();
});

server.get('/cars/:id', function(req, res, next) {

    db.serialize(() => {
        db.get('select ROWID, * from cars WHERE ROWID = $id',
            {
                $id: req.params.id    //permette di passare i parametri in /log/:id
            },
            (err, row) => {
                //console.log(err)      //per mostrare gli errori
                if (err) {
                    console.error(err)
                    res.statusCode = 400;
                    res.send('errore database')  //gestione errore
                } else {
                    res.send(row)
                }
            })
    })

    //res.send('Current values for car ' + req.params['id'] + ': [TODO]');
    return next();
});

server.post('/cars/:id', function(req, res, next) {
    res.send('Data received from car [TODO]');

    console.log(req.body);

    return next();
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
