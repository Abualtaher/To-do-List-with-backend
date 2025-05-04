import { Router, Request, Response } from "express";
import db from "./db";
import { error } from "console";

const router = Router();

router.get("/todos", (_req: Request, res: Response) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/todos", (req: Request, res: Response) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "Task is required" });

  db.run("INSERT INTO todos (task) VALUES (?)", [task], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, task });
  });
});

router.delete("/todos/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  db.run("DELETE FROM todos WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

export default router;
