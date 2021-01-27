const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../db');
const cors = require('cors')

const port = 2080;

app.use(cors({
  origin: 'http://localhost:3080'

}))
app.use(express.static(path.join(__dirname, '../public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/homes/:id', async (req, res) => {
  console.log('getting address for id', req.params.id, '...');
  let address = await db.getAddress(req.params.id);

  res.send(address[0].address)
  console.log('done')
})

app.post('/api/tours', (req, res) => {
  db.scheduleTour(req.body)
  res.status(200).send()
})

app.post('/api/info', (req, res) => {
  db.postInfoRequest(req.body)
  res.status(200).send()
})

app.get('/api/tours/:id/:day', async (req, res) => {
  let bookedTimes = await db.checkAvailability(req.params.id, req.params.day);
  res.status(200).send(bookedTimes);
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(__dirname);
});