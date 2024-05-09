var restify = require('restify');
const sqlite3 = require('sqlite3').verbose()
const path = require('path')
// var i = 0;

var server = restify.createServer();
server.use(restify.plugins.bodyParser());

const db = new sqlite3.Database(path.join
    (__dirname,
        '/db',
        'database.db'
    )
)

server.get('/cars', function (req, res, next) {
    console.log(req.body);
    // db.serialize(() => {
    //     db.all('select ROWID, * from cars', (err, rows) => {
    //         if (err) {
    //             console.error(err)
    //             res.statusCode = 500;
    //             res.send('errore elenco dati') 
    //         } else {
    //             res.send(rows)        
    //         }
    //     })
    // })

    //res.send('List of cars: [TODO]');
    return next();
});

server.get('/cars/:id', function (req, res, next) {
    console.log(req.body)
    res.send('Current values for car ' + req.params['id'] + ': [TODO]');
    //     // db.serialize(() => {
    //     //     db.get('select ROWID, * from cars WHERE ROWID = $id',
    //     //         {
    //     //             $id: req.params.id    //permette di passare i parametri in /log/:id
    //     //         },
    //     //         (err, row) => {
    //     //             //console.log(err)      //per mostrare gli errori
    //     //             if (err) {
    //     //                 console.error(err)
    //     //                 res.statusCode = 400;
    //     //                 res.send('errore database')  //gestione errore
    //     //             } else {
    //     //                 res.send(row)
    //     //             }
    //     //         })
    //     // })

    //     //res.send('Current values for car ' + req.params['id'] + ': [TODO]');
    return next();
});

server.post('/cars/:id', function (req, res, next) {
    console.log(req.body);
    // res.send('Data received from car ' + req.params['id'] + ' ');
    db.serialize(() => {
        db.run('INSERT INTO cars(LevelBattery) VALUES ($LevelBattery)',
            {
                $LevelBattery: req.body,
                // $Speed: req.body.Speed,
            },
            res.send('Car creata')
        )
    })
    return next();
    //
    //  else {
    //     i = 0;
    //     db.serialize(() => {
    //         db.run('INSERT INTO cars(Speed) VALUES ($Speed)',
    //             {
    //                 $Speed: req.body,
    //                 // $Speed: req.body.Speed,
    //             },
    //             res.send('Car creata')
    //         )
    //     })
    //     return next();
    // }
});

server.listen(8080, function () {
    //console.log('%s listening at %s', server.name, server.url);
});
