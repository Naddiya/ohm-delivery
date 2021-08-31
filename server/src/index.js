const shortid = require('shortid');
var express = require('express');
var app = express();
const Utils = require('./utils');
app.use(express.json());

function serve() {
  // ohms by id
  app.get('/ohms/:id', async (req, res) => {
    const ohm = await Utils.getOhmById(req.params.id);

    res.send(ohm);
  });

  // ohms by trackingId
  app.get('/ohms/tracking/:trackingId', async (req, res) => {
    const ohm = await Utils.getOhmByTrackingId(req.params.trackingId);
    if (!ohm) {

      return res.status(404).send('not found');
    }

    return res.send(ohm);
  });

  // update ohm status
  app.put('/ohms/tracking/update/:trackingId/status', async function (req, res) {
    if (!req.body.status) {
      return res.status(400).send('bad request');
    }
    const ohm = await Utils.getOhmByTrackingId(req.params.trackingId);
    if (!ohm) {

      return res.status(404).send('not found');
    }
    await Utils.updateStatus(ohm, req.body.status);
    await Utils.updateHistory(ohm, req.body.status);

    return res.send(ohm);
  });


  app.listen(3000, () => console.log('listening on port 3000'));
}

serve();