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

// update status
async function updateStatus(ohm, status) {
  const statuses = ['CREATED', 'PREPARING', 'READY', 'IN_DELIVERY', 'REFUSED', 'DELIVERED'];
  // getting current status
  const currentStatus = ohm.value().status;
  // getting index of current status
  const currentPosition = statuses.indexOf(currentStatus);
  // verifying if status is 1 position ahead in statuses array
  if ((status === statuses[currentPosition + 1]) ||
    // or 2 position ahed allowed for IN_DELIVERY
    (currentStatus === 'IN_DELIVERY' && status === statuses[currentPosition + 2])) {
    ohm.assign({ status })
      .write();

    return ohm;
  }
  else {
    console.log('INVALID STATUS');
  }
}

// update history
async function updateHistory(ohm, status) {
  const currentHistory = ohm.value().history;
  currentHistory.push({ state: status, at: Date.now() + "" });
  ohm.assign({ history: currentHistory })
    .write();

  return ohm;
}

// add comment 
async function updateComment(ohm, message) {
  const comment = message;
  console.log(message);
  ohm.assign({ comment })
    .write();

  return ohm;
}

module.exports = { getOhmById, getOhmByTrackingId, updateStatus, updateHistory, updateComment };