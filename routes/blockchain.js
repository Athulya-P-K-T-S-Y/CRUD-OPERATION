const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');


const {
    getAllBlockchain,
    get1Blockchain,
    CreateBlockchain,
    UpdateBlockchain,
    PutBlockchain,
    DeleteBlockchain
} = require('../controller/blockchain');

router
    .route('/')
    .post(authenticateUser, CreateBlockchain)
    .get(authenticateUser, getAllBlockchain);

router.route('/:id').get(authenticateUser, get1Blockchain).delete(authenticateUser, DeleteBlockchain).patch(authenticateUser, UpdateBlockchain).put(authenticateUser, PutBlockchain);

module.exports = router;