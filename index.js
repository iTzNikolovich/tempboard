const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));

// database
const { KVBase } = require('./KVBase');
let db = new KVBase();

app.get('/', (req, res) => {
  res.send('TempBoard v1.1 is running!')
});

app.post('/up', async (req, res) => {
  // get data from the sensor
  const mac = req.body.mac;
  const temp = req.body.temp;
  const hum = req.body.hum; // To disable humidity support comment this line

  // store data in db
  ts = Date.now();
  var data = { mac: mac, date: ts, temp: temp, hum: hum }; // To disable humidity support delete 'hum: hum'
  console.log(data);
  await db.set(data.mac, data);
  res.send('TempBoard v1.1: Success!')
});

app.get('/get/:mac', async (req, res) => {
  const mac = req.params.mac;
  if (mac != '') {
    var data = await db.get(mac);
    //console.log('TempBoard v1.1: Success!');
    res.send(data)
  } else {
    res.status(404).send('not found')
  }
});

app.listen(3000, () => {
  console.log('TempBoard v1.1 is running!');
});
