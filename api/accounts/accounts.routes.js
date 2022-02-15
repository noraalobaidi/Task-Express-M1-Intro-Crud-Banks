const express = require('express');
const router = express.Router();
const {
  accountsGet,
  accountUpdate,
  accountDelete,
  accountCreate,
  getAccountByUsername,
} = require('./accounts.controllers');

router.get('/', accountsGet);
router.get('/:username', getAccountByUsername);
router.post('/', accountCreate);

router.delete('/:accountId', accountDelete);

router.put('/:accountId', accountUpdate);

module.exports = router;
