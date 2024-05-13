// video.router.js

const express = require("express");
const router = express.Router();

const videoController = require("../controller/video.controller");

router.get("/", videoController.getAllVideos);
router.get("/:id", videoController.getVideoById);
router.post("/", videoController.createVideo);
router.put("/:id", videoController.updateVideo);
router.delete("/:id", videoController.deleteVideo);

module.exports = router;
