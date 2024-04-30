const pool = require("../database/index");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Speicherort für hochgeladene Dateien

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
            const { title, src, thumbnail, description, comments } = req.body;

            // Umwandlung der Kommentare in einen JSON-String
            const commentsJSON = JSON.stringify(comments);

            const sql = `
                INSERT INTO videos (title, src, thumbnail, description, comments, likes, dislikes) 
                VALUES (?, ?, ?, ?, ?, 0, 0)
            `;

            const values = [title, src, thumbnail, description, commentsJSON];

            await pool.query(sql, values);

            res.status(201).json({ message: "Video erfolgreich hochgeladen und erstellt." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Fehler beim Hochladen und Erstellen des Videos." });
        }
    },

    updateVideo: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, src, thumbnail, description, comments } = req.body;

            // Umwandlung der Kommentare in einen JSON-String
            const commentsJSON = JSON.stringify(comments);

            const sql = `
                UPDATE videos 
                SET 
                    title = ?, 
                    src = ?, 
                    thumbnail = ?, 
                    description = ?, 
                    comments = ? 
                WHERE 
                    id = ?
            `;

            const values = [title, src, thumbnail, description, commentsJSON, id];

            await pool.query(sql, values);

            res.json({
                message: "Video erfolgreich aktualisiert."
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Fehler beim Aktualisieren des Videos." });
        }
    },

    deleteVideo: async (req, res) => {
        try {
            const { id } = req.params;
            const [result] = await pool.query("DELETE FROM videos WHERE id = ?", [id]);
            if (result.affectedRows > 0) {
                res.json({
                    message: "Video erfolgreich gelöscht."
                });
            } else {
                res.status(404).json({
                    error: "Video nicht gefunden."
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Fehler beim Löschen des Videos." });
        }
    },

    uploadVideo: async (req, res) => {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({ error: "Keine Datei hochgeladen." });
            }
            // Speichern Sie den Dateipfad in der Datenbank oder einem anderen Speicherort
            const filePath = file.path;
            res.status(201).json({ message: "Datei erfolgreich hochgeladen.", filePath: filePath });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Fehler beim Hochladen der Datei." });
        }
    }
};

module.exports = videoController;
