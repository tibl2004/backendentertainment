const express = require("express");
const router = express.Router();
const multer = require('multer');

const videoController = require("../controller/video.controller");

const upload = multer({ dest: 'uploads/' }); // Hier wird 'upload' definiert

router.get("/", videoController.getAllVideos);
router.get("/:id", videoController.getVideoById);
router.post("/", videoController.createVideo);
router.put("/:id", videoController.updateVideo);
router.delete("/:id", videoController.deleteVideo);
router.post("/upload", upload.single('video'), videoController.uploadVideo); // Hier wird 'upload' verwendet

module.exports = router;
