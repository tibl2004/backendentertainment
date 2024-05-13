// videoController.js

const pool = require("../database/index");

const videoController = {
    getAllVideos: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM videos");
            res.json({
                data: rows
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Fehler beim Abrufen der Videos."
            });
        }
    },

    getVideoById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query("SELECT * FROM videos WHERE id = ?", [id]);
            res.json({
                data: rows[0]
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Fehler beim Abrufen des Videos."
            });
        }
    },

    createVideo: async (req, res) => {
        try {
            const { comments } = req.body;
            const result = await pool.query("INSERT INTO videos (comments, likes, dislikes) VALUES (?, 0, 0)", [JSON.stringify(comments)]);
            const newVideoId = result.insertId;

            res.status(201).json({ message: "Video erfolgreich erstellt." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Fehler beim Erstellen des Videos." });
        }
    },

    updateVideo: async (req, res) => {
        try {
            const { id } = req.params;
            const { comments, likes, dislikes } = req.body;
            await pool.query("UPDATE videos SET comments = ?, likes = ?, dislikes = ? WHERE id = ?", [JSON.stringify(comments), likes, dislikes, id]);
            res.json({ message: "Video erfolgreich aktualisiert." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Fehler beim Aktualisieren des Videos." });
        }
    },

    deleteVideo: async (req, res) => {
        try {
            const { id } = req.params;
            await pool.query("DELETE FROM videos WHERE id = ?", [id]);
            res.json({ message: "Video erfolgreich gelöscht." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Fehler beim Löschen des Videos." });
        }
    },

    // Neu hinzugefügt: Endpunkt zum Hinzufügen eines Kommentars zu einem Video
    addCommentToVideo: async (req, res) => {
        try {
            const { videoId } = req.params;
            const { username, text } = req.body;
            // Hier sollte Logik hinzugefügt werden, um den Kommentar zum entsprechenden Video in der Datenbank hinzuzufügen
            res.status(201).json({ message: "Kommentar erfolgreich hinzugefügt." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Fehler beim Hinzufügen des Kommentars." });
        }
    }
};

module.exports = videoController;
