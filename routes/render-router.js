const router = require('express').Router();
const fetch = require('node-fetch');
// const isRegistered = require('../middlewares/isRegistered');
// const authorized = require('../middlewares/authorized');
// const bcrypt = require('bcrypt');
const { Form, User, Checkbox } = require('../db/models');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/main', (req, res) => {
  res.render('main');
});

router.get('/error', (req, res) => {
  res.render('error', { message: 'Неверные данные. Проверьте e-mail и пароль' });
});

router.get('/allforms', async (req, res) => {
  const lists = await Form.findAll();
  res.json(lists);
});

router.get('/myforms', async (req, res) => {
  try {
    console.log('MMMMMYYYY  FFFFFFFOOOORMMMMS');
    const lists = await Form.findAll({ where: { creator_id: req.session.userId } });
    console.log('88888888888888888888888888888888888888888', req.session.userId);
    res.json(lists);
  } catch (error) {
    alert('whats happening?');
  }
});

async function gett(i) {
  const back = await Checkbox.findOne({ where: { link_id: i } });
  console.log('back', back);
  return back;
}

router.get('/allusers', async (req, res) => {
  const allusers = await User.findAll();
  res.json(allusers);
});

router.post('/main', async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user.email === email) {
      // if (await bcrypt.compare(pass, user.pass)) {
      if (pass === user.pass) {
        req.session.userEmail = user.email;
        req.session.userId = user.id;
        req.session.admin = user.isAdmin;
        return res.redirect('/main').status(200);
      }
      res.sendStatus(418);
    }
  } catch (error) {
    res.sendStatus(418);
  }
});

router.post('/newuser', async (req, res) => {
  const { email, pass } = req.body;
  try {
    await User.create({ email, pass, isAdmin: false });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(418);
  }
});

router.post('/newform', async (req, res) => {
  const { nameEmployee, nameMentor, link } = req.body;
  try {
    await Form.create({
      creator_id: req.session.userId, nameEmployee, nameMentor, link,
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(418);
  }
});

router.post('/update', async (req, res) => { // adding role to the user and returning all users
  const { email, role } = req.body;
  console.log(role);
  try {
    const currUser = await User.findOne({
      where: { email },
    });
    if (role === 'admin') {
      await User.update({
        isAdmin: true,
      }, {
        where: {
          email,
        },
      });
    } else {
      await User.update({
        isAdmin: false,
      }, {
        where: {
          email,
        },
      });
    }
    const allUsers = await User.findAll();
    res.json(allUsers);
  } catch (error) {
    res.sendStatus(418);
  }
});

router.get('/logout', (req, res) => {
  console.log('VVVVVIIIIIIIHHHOOODDD');
  req.session.destroy();
  res.clearCookie('user_sid');
  // res.redirect('/');
  res.sendStatus(200);
});

router.get('/form/:link', async (req, res) => {
  const { link } = req.params;

  const response = await fetch('http://localhost:3000/db/linkId', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ link }),
  });

  if (response.ok) {
    const data = await response.json();

    res.render('form', { data });
  } else {
    res.sendStatus(418);
  }
});

router.post('/delete', async (req, res) => {
  const { email } = req.body;
  try {
    await User.destroy({ where: { email } });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(418);
  }
});

router.get('/allbox', async (req, res) => {
  const allbox = await Checkbox.findAll();
  res.json(allbox);
});

router.get('/mybox', async (req, res) => {
  try {
    const boxes = await Checkbox.findAll({ where: { link_id: req.session.userId } });
    res.json(boxes);
    console.log(boxes, 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
  } catch (error) {
    alert('whats happening?');
  }
});

router.get('/formsAndCheckboxes', async (req, res) => {
  try {
    const data = await Form.findAll({ include: Checkbox });
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', data);
    // const box = data.map((el) => el.creator_id == req.session.userId);
    const box = [];
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].creator_id == req.session.userId) {
        box.push(data[i]);
      }
    }
    console.log('444444444444444444444444', box);

    res.json(box);
  } catch (error) {
    res.sendStatus(418);
  }
});


router.get('/formsAndBoxes', async (req, res) => {
  try {
    const data = await Form.findAll({ include: Checkbox });
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', data);
    // const box = data.map((el) => el.creator_id == req.session.userId);
    const box = [];
    for (let i = 0; i < data.length; i += 1) {
      box.push(data[i]);
    }
    console.log('444444444444444444444444', box);

    res.json(box);
  } catch (error) {
    res.sendStatus(418);
  }
});


module.exports = router;
