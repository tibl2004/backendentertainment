const pool = require("../database/index");

const videoController = {
    getVideoById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query("SELECT * FROM videos WHERE id = ?", [id]);
            if (rows.length === 0) {
                return res.status(404).json({ error: "Video nicht gefunden." });
            }
            res.json({ data: rows[0] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Fehler beim Abrufen des Videos." });
        }
    },

    addCommentToVideo: async (req, res) => {
        try {
            const { videoId } = req.params;
            const { username, text } = req.body;
            const [video] = await pool.query("SELECT comments FROM videos WHERE id = ?", [videoId]);
            if (video.length === 0) {
                return res.status(404).json({ error: "Video nicht gefunden." });
            }
            const comments = JSON.parse(video[0].comments);
            comments.push({ username, text });
            await pool.query("UPDATE videos SET comments = ? WHERE id = ?", [JSON.stringify(comments), videoId]);
            res.status(201).json({ message: "Kommentar erfolgreich hinzugefügt." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Fehler beim Hinzufügen des Kommentars." });
        }
    },

    likeVideo: async (req, res) => {
        try {
            const { videoId } = req.params;
            await pool.query("UPDATE videos SET likes = likes + 1 WHERE id = ?", [videoId]);
            const [updatedVideo] = await pool.query("SELECT likes FROM videos WHERE id = ?", [videoId]);
            res.status(200).json({ message: "Video erfolgreich geliked.", likes: updatedVideo[0].likes });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Fehler beim Liken des Videos." });
        }
    },

    dislikeVideo: async (req, res) => {
        try {
            const { videoId } = req.params;
            await pool.query("UPDATE videos SET dislikes = dislikes + 1 WHERE id = ?", [videoId]);
            const [updatedVideo] = await pool.query("SELECT dislikes FROM videos WHERE id = ?", [videoId]);
            res.status(200).json({ message: "Video erfolgreich dislikt.", dislikes: updatedVideo[0].dislikes });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Fehler beim Disliken des Videos." });
        }
    }
};

module.exports = videoController;
