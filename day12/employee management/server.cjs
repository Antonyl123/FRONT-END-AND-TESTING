const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DB_FILE = path.join(__dirname, 'employee-management', 'db.json');

app.use(cors());
app.use(express.json());

// Helper to read database
function readDB() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database file:", err);
    return {
      employees: [],
      attendance: [],
      leaveRequests: [],
      schedules: [],
      salaries: [],
      credentials: []
    };
  }
}

// Helper to write database
function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error("Error writing database file:", err);
  }
}

// Generic route builder for resources
const resources = ['employees', 'attendance', 'leaveRequests', 'schedules', 'salaries', 'credentials'];

resources.forEach(resource => {
  // GET all or filter by query parameters
  app.get(`/${resource}`, (req, res) => {
    const db = readDB();
    let list = db[resource] || [];

    // Filter by query parameters if any (e.g., ?employeeId=101 or ?email=admin@aurahr.com)
    Object.keys(req.query).forEach(key => {
      const value = req.query[key];
      list = list.filter(item => {
        return String(item[key]) === String(value);
      });
    });

    res.json(list);
  });

  // GET by ID
  app.get(`/${resource}/:id`, (req, res) => {
    const db = readDB();
    const list = db[resource] || [];
    const item = list.find(i => String(i.id) === String(req.params.id));
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  // POST (Create)
  app.post(`/${resource}`, (req, res) => {
    const db = readDB();
    const list = db[resource] || [];
    const newItem = req.body;
    
    // Auto-generate ID if not present
    if (!newItem.id) {
      newItem.id = Math.random().toString(36).substring(2, 11);
    } else {
      newItem.id = String(newItem.id);
    }

    list.push(newItem);
    db[resource] = list;
    writeDB(db);
    res.status(201).json(newItem);
  });

  // PUT (Update full)
  app.put(`/${resource}/:id`, (req, res) => {
    const db = readDB();
    const list = db[resource] || [];
    const index = list.findIndex(i => String(i.id) === String(req.params.id));

    if (index !== -1) {
      const updatedItem = { ...req.body, id: String(req.params.id) };
      list[index] = updatedItem;
      db[resource] = list;
      writeDB(db);
      res.json(updatedItem);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  // PATCH (Update partial)
  app.patch(`/${resource}/:id`, (req, res) => {
    const db = readDB();
    const list = db[resource] || [];
    const index = list.findIndex(i => String(i.id) === String(req.params.id));

    if (index !== -1) {
      const updatedItem = { ...list[index], ...req.body, id: String(req.params.id) };
      list[index] = updatedItem;
      db[resource] = list;
      writeDB(db);
      res.json(updatedItem);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  // DELETE
  app.delete(`/${resource}/:id`, (req, res) => {
    const db = readDB();
    const list = db[resource] || [];
    const filteredList = list.filter(i => String(i.id) !== String(req.params.id));

    if (list.length !== filteredList.length) {
      db[resource] = filteredList;
      writeDB(db);
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Express AuraHR API Server running at http://localhost:${PORT}`);
});
