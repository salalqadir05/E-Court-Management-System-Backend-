const express = require('express');
const multer = require('multer');
const fileController = require('../controller/fileController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/download/:filename', fileController.downloadFile);
router.get('/fetchdocuments',fileController.fetchdocuments);
router.put('/updatefile/:id', fileController.updateFile);
router.delete('/deletefile/:id',fileController.deleteFile)

router.post('/uploadcasemanager', upload.single('file'), fileController.uploadFileForCaseManager);
router.get('/downloadcasemanager/:filename', fileController.downloadFileForCaseManager);
router.get('/fetchdocumentscasemanager', fileController.fetchDocumentsForCaseManager);
router.put('/updatefilecasemanager/:id', fileController.updateFileForCaseManager);
router.delete('/deletefilecasemanager/:id', fileController.deleteFileForCaseManager);

module.exports = router;
