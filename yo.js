const { Form, User } = require('./db/models');

async function test() {
  const asd = await User.create({
    email: 'mikael@ya.ru',
    pass: '123',
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  // const asd = await Form.create({
  //   creator_id: 1,
  //   nameEmployee: 'Mikael',
  //   nameMentor: 'Vasya',
  //   link: 'http://localhost:3000/qwerty',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });
}
test();
