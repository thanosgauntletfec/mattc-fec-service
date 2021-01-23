const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../db')

const port = 2080;

app.use(express.static(path.join(__dirname, '../public')));

//app.use(express.static('./public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/homes/:id', async (req, res) => {
  console.log('getting address for id', req.params.id, '...');
  let address = await db.getAddress(req.params.id);

  res.send(address[0].address)
  console.log('done')
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(__dirname);
});