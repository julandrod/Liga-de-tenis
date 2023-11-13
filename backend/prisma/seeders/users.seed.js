const { fakerES_MX: faker } = require("@faker-js/faker");
const { encryptPassword } = require("../../src/helpers");
const prisma = require("../../src/services/db");

const seedUsers = async () => {
  const users = [];
  const usersPassword = await encryptPassword("123456");

  const admin = {
    id: faker.string.uuid(),
    name: "admin_name",
    lastName: "admin_lastname",
    age: faker.number.int({ min: 5, max: 80 }),
    gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
    email: "admin@mail.com",
    password: usersPassword,
    role: "ADMIN",
  };

  for (let i = 0; i < 30; i++) {
    const user = {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 5, max: 80 }),
      gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
      email: faker.helpers.uniqueArray(faker.internet.email, 1)[0],
      password: usersPassword,
      role: "PLAYER",
    };
    users.push(user);
  }

  try {
    const usersCreated = await prisma.user.createMany({
      data: [...users, admin],
    });
    if (usersCreated) console.log("Users seeded correctly");
  } catch (error) {
    console.log(error);
  }
};

seedUsers();
