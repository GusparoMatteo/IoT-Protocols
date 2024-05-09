const mqtt = require('mqtt')
const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const db = new sqlite3.Database(path.join
  (__dirname,
    '/db',
    'database.db'
  )
)

const client = mqtt.connect("mqtt://test.mosquitto.org");

client.on('connect', function () {
  console.log("Connesso");
  client.subscribe('carDM/car22sasso/#');
})

// topic: 'carDM/car22sasso/LevelBattery/#'

client.on('message', function (topic, message) {
  console.log('TOPIC: ' + topic + "\nMESSAGE: " + message.toString());
  var IntMess = parseInt(message)
  db.serialize(() => {
    db.run('INSERT INTO cars(LevelBattery) VALUES ($LevelBattery)',
      {
        $LevelBattery: IntMess,
        // $Speed: req.body.Speed,
      },
    )
  })
})