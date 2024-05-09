#!/usr/bin/env node

const sqlite3 = require('sqlite3').verbose()
const path = require('path')
var amqp = require('amqplib/callback_api');

const db = new sqlite3.Database(path.join
    (__dirname,
      '/db',
      'database.db'
    )
  )

amqp.connect('amqps://anhvwzjy:Muz1av0n_UGxT-vVK4wp05lti_f8o6Oc@crow.rmq.cloudamqp.com/anhvwzjy', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });
        
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {
            var stringmsg = parseInt((msg.content.toString()).substring(14))
            console.log(stringmsg)
            console.log(" [x] Received %s", msg.content.toString());
            db.serialize(() => {
                db.run('INSERT INTO cars(LevelBattery) VALUES ($LevelBattery)',
                  {
                    $LevelBattery: stringmsg,
                    // $Speed: req.body.Speed,
                  },
                )
              })
        }, {
            noAck: true
        });
    });
});