const express = require('express');
const path = require('path');
const ejs = require('ejs');
const db = require('../../db/connection');

const employees = db.get('employees');

const router = express.Router();

/* Render one view partial from this directory. */
const renderPartial = (name, data) => ejs.renderFile(path.join(__dirname, name), data);

/* Employees page: header + body + footer partials concatenated into one document. */
router.get('/', async (req, res, next) => {
  try {
    const allEmployees = await employees.find({});
    const [header, body, footer] = await Promise.all([
      renderPartial('header.ejs', { title: 'Employees', total: allEmployees.length }),
      renderPartial('body.ejs', { employees: allEmployees }),
      renderPartial('footer.ejs', { generatedAt: new Date().toISOString() }),
    ]);

    res.type('html').send(header + body + footer);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
