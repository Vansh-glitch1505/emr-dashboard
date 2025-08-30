// medication.js (backend route file)

import express from "express";
import pool from "../db.js"; // your PostgreSQL connection pool

const router = express.Router();

// ✅ POST - Add new medication
router.post("/medications", async (req, res) => {
  try {
    const { userId, problem, medicine, mg, dose_time, time_period, status } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "No userId found. Please login again." });
    }

    const newMedication = await pool.query(
      `INSERT INTO medication_history 
        (user_id, problem, medicine, mg, dose_time, time_period, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [userId, problem, medicine, mg, dose_time, time_period, status]
    );

    res.json(newMedication.rows[0]); // ✅ send JSON
  } catch (err) {
    console.error("Error saving medication history:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET - Fetch all medications for a user
router.get("/medications/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const medications = await pool.query(
      "SELECT * FROM medication_history WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.json(medications.rows); // ✅ send JSON
  } catch (err) {
    console.error("Error fetching medication history:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ DELETE - Remove a medication
router.delete("/medications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM medication_history WHERE id = $1", [id]);
    res.json({ message: "Medication deleted" });
  } catch (err) {
    console.error("Error deleting medication:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ PUT - Update status (active/inactive)
router.put("/medications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await pool.query(
      "UPDATE medication_history SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error("Error updating medication:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
