const express = require("express");
const router = express.Router();
const videoController = require("../controller/video.controller");

router.get("/:id", videoController.getVideoById);
router.post("/:videoId/comment", videoController.addCommentToVideo);
router.post("/:videoId/like", videoController.likeVideo);
router.post("/:videoId/dislike", videoController.dislikeVideo);

module.exports = router;
