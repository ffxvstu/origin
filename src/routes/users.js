/* eslint-disable consistent-return */
const express = require('express');
const db = require('../db/connection');

const users = db.get('user');
const employees = db.get('employees');

const router = express.Router();

/* Get all users */
router.get('/', async (req, res, next) => {
  try {
    const allUsers = await users.find({});
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

/* Get all jobs presented in the database */
router.get('/jobs', async (req, res, next) => {
  try {
    const jobs = await employees.distinct('job');
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

/* Get users with IDs within a given range, e.g. /range?min=4&max=6 (inclusive) */
router.get('/range', async (req, res, next) => {
  try {
    const min = Number.parseInt(req.query.min, 10);
    const max = Number.parseInt(req.query.max, 10);

    if (Number.isNaN(min) || Number.isNaN(max)) {
      res.status(400);
      return next(new Error('Query parameters "min" and "max" must be integers'));
    }

    const allUsers = await users.find({});
    const usersInRange = allUsers.filter(
      ({ _id }) => Number(_id) >= min && Number(_id) <= max,
    );

    res.json(usersInRange);
  } catch (error) {
    next(error);
  }
});

/* Get a user with the appropriate username */
router.get('/username/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await users.findOne({ username });

    if (!user) {
      const error = new Error('User does not exist');
      return next(error);
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

/* Get a user with the appropriate _id */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await users.findOne({ _id: id });

    if (!user) {
      const error = new Error('User does not exist');
      return next(error);
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
