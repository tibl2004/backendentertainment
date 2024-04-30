const express = require("express");
const router = express.Router();
const multer = require('multer');


const videoController = require("../controller/video.controller");

router.get("/", videoController.getAllVideos);
router.get("/:id", videoController.getVideoById);
router.post("/", videoController.createVideo);
router.put("/:id", videoController.updateVideo);
router.delete("/:id", videoController.deleteVideo);
router.post("/upload", upload.single('video'), videoController.uploadVideo);

module.exports = router;
