const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));

// database
const { KVBase } = require('./KVBase');
let db = new KVBase();

app.get('/', (req, res) => {
  res.send('TempBoard v1.0 is running!')
});

app.post('/up', async (req, res) => {
  // get data from the sensor
  const mac = req.body.mac;
  const temp = req.body.temp;

  // store data in db
  ts = Date.now();
  var data = { mac: mac, date: ts, temp: temp };
  //console.log(data);
  await db.set(data.mac, data);
  res.send('TempBoard v1.0: Success!')
});

app.get('/:mac', async (req, res) => {
  const mac = req.params.mac;
  if (mac != '') {
    var data = await db.get(mac);
    //console.log('TempBoard v1.0: Success!');
    res.send(data)
  } else {
    res.send('TempBoard v1.0: not enough parameters...')
  }
});

app.listen(3000, () => {
  console.log('TempBoard v1.0 is running!');
});
