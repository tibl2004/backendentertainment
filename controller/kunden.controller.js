const pool = require("../database/index");

const kundenController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM kunden");
            res.json({
                data: rows
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error"
            });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query("SELECT * FROM kunden WHERE id = ?", [id]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error"
            });
        }
    },
    create: async (req, res) => {
        try {
            const {
                vorname,
                nachname,
                strasseHausnummer,
                postleitzahl,
                ort,
                email,
                telefon,
                mobil,
                geschlecht,
                auftragsTyp,
                auftragsBeschreibung
            } = req.body;

            const kundennummer = generateRandomKundennummer();

            const sql = `
                INSERT INTO kunden (
                    kundennummer,
                    vorname, 
                    nachname, 
                    strasseHausnummer, 
                    postleitzahl, 
                    ort, 
                    email, 
                    telefon, 
                    mobil, 
                    geschlecht,
                    auftragsTyp,
                    auftragsBeschreibung
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                kundennummer,
                vorname,
                nachname,
                strasseHausnummer,
                postleitzahl,
                ort,
                email,
                telefon,
                mobil,
                geschlecht,
                auftragsTyp,
                auftragsBeschreibung
            ];

            const [result] = await pool.query(sql, values);

            res.json({
                data: {
                    id: result.insertId,
                    kundennummer: kundennummer
                }
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error"
            });
        }
    },
    update: async (req, res) => {
        try {
            const {
                vorname,
                nachname,
                strasseHausnummer,
                postleitzahl,
                ort,
                email,
                telefon,
                mobil,
                geschlecht,
                auftragsTyp,
                auftragsBeschreibung
            } = req.body;

            const { id } = req.params;

            const sql = `
                UPDATE kunden 
                SET 
                    vorname = ?, 
                    nachname = ?, 
                    strasseHausnummer = ?, 
                    postleitzahl = ?, 
                    ort = ?, 
                    email = ?, 
                    telefon = ?, 
                    mobil = ?, 
                    geschlecht = ?, 
                    auftragsTyp = ?, 
                    auftragsBeschreibung = ? 
                WHERE 
                    id = ?
            `;

            const values = [
                vorname,
                nachname,
                strasseHausnummer,
                postleitzahl,
                ort,
                email,
                telefon,
                mobil,
                geschlecht,
                auftragsTyp,
                auftragsBeschreibung,
                id
            ];

            const [result] = await pool.query(sql, values);

            res.json({
                status: "success",
                message: "Eintrag erfolgreich aktualisiert"
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error",
                message: "Eintrag konnte nicht aktualisiert werden"
            });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await pool.query("DELETE FROM kunden WHERE id = ?", [id]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.error(error);
            res.json({
                status: "error"
            });
        }
    }
};

// Funktion zur Generierung einer zufälligen Kundennummer
function generateRandomKundennummer() {
    return Math.floor(Math.random() * 1000000) + 1;
}

module.exports = kundenController;
