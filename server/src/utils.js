const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('db.json');
const config = require('../db.config.json');

const db = (async () => {
  const _db = await low(adapter);
  await _db.defaults(config).write();
  return _db;
})();

// get ohm by id
async function getOhmById(id) {
  const _db = await db;
  const ohm = _db.get('ohms')
    .find({ id })
    .value();

  return ohm;
}

// get ohm per trackingId
async function getOhmByTrackingId(trackingId) {
  const _db = await db;
  const ohm = _db.get('ohms')
    .find({ trackingId });
  if (!ohm.value()) {

    return null;
  }

  return ohm;
}


module.exports = { getOhmById, getOhmByTrackingId };