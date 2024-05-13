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

            // Erstellen des neuen Videos in der Datenbank
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

            // Aktualisieren des Videos in der Datenbank
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

            // Löschen des Videos aus der Datenbank
            await pool.query("DELETE FROM videos WHERE id = ?", [id]);

            res.json({ message: "Video erfolgreich gelöscht." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Fehler beim Löschen des Videos." });
        }
    }
};

module.exports = videoController;
