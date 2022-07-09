const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Checkbox, Form, User } = require('../db/models');

router.get('/form/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const currCheckbox = await Checkbox.findOne({
      where: { link_id: Number(id) }, // number?
    });

    res.json(currCheckbox).status(200);
  } catch (error) {
    res.sendStatus(418);
  }
});

router.post('/form', async (req, res) => {
  const { formOutput, formId } = req.body;
  try {
    const currCheckbox = await Checkbox.findOne({
      where: { link_id: Number(formId) }, // change later
    });
    if (currCheckbox) {
      try {
        await Checkbox.update(
          {
            q1: formOutput.q1,
            q2: formOutput.q2,
            q3: formOutput.q3,
            q4: formOutput.q4,
            q5: formOutput.q5,
            q6: formOutput.q6,
            q7: formOutput.q7,
            q8: formOutput.q8,
            q9: formOutput.q9,
            q10: formOutput.q10,
            q11: formOutput.q11,
            q12: formOutput.q12,
            q8_Str: formOutput.names,
            updatedAt: new Date(),
          },
          {
            where: { link_id: Number(formId) }, // change later
          },
        );
      } catch (error) {
        console.log(error, 'update error');
      }
    } else {
      try {
        await Checkbox.create({
          q1: formOutput.q1,
          q2: formOutput.q2,
          q3: formOutput.q3,
          q4: formOutput.q4,
          q5: formOutput.q5,
          q6: formOutput.q6,
          q7: formOutput.q7,
          q8: formOutput.q8,
          q9: formOutput.q9,
          q10: formOutput.q10,
          q11: formOutput.q11,
          q12: formOutput.q12,
          q8_Str: formOutput.names,
          link_id: Number(formId), // change later
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } catch (error) {
        console.log(error, 'create error');
      }
    }
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(418);
  }
});

router.post('/linkId', async (req, res) => {
  const link = `http://localhost:3000/form/${req.body.link}`;

  try {
    const currForm = await Form.findOne({
      where: { link },
    });

    res.json(currForm).status(200);
  } catch (error) {
    res.sendStatus(418);
  }
});

router.post('/role', async (req, res) => { // adding role to the user and returning all users
  const { email, isAdmin } = req.body;
  try {
    const currUser = await User.findOne({
      where: { email },
    });
    currUser.isAdmin = isAdmin;
    const allUsers = await User.findAll();
    res.json({ allUsers }).status(200);
  } catch (error) {
    res.sendStatus(418);
  }
});

router.get('/allforms', async (req, res) => {
  const allforms = await Form.findAll();
  res.json({ allforms });
});

router.get('/myforms', async (req, res) => {
  const myforms = await Form.findAll({ where: { creator_id: res.locals.userId } });
  res.json({ myforms });
});

router.get('/allusers', async (req, res) => {
  const allusers = await User.findAll();
  res.json({ allusers });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
  res.redirect('/');
});

module.exports = router;
