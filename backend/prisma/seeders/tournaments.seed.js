const { fakerES_MX: faker } = require("@faker-js/faker");
const prisma = require("../../src/services/db");

const seedTournaments = async () => {
  const tournaments = [];
  const adminId = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });
  const playerIds = await prisma.user.findMany({
    where: { role: "PLAYER" },
    select: { id: true },
  });

  for (let i = 0; i < 5; i++) {
    const tournament = {
      name: faker.lorem.sentence(4),
      description: faker.lorem.sentence(10),
      startDate: faker.date.soon({ days: 10 }),
      endDate: faker.date.soon({ days: 20 }),
      creatorId: adminId.id,
    };
    tournaments.push(tournament);
  }

  try {
    const tournamentsCreated = await prisma.tournament.createMany({
      data: [...tournaments],
    });
    if (tournamentsCreated) console.log("Tournaments seeded correctly");
  } catch (error) {
    console.log(error);
  }

  const tournamentsList = await prisma.tournament.findMany();

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 7; j++) {
      await prisma.tournament.update({
        where: { id: tournamentsList[i].id },
        data: {
          players: {
            connect: { id: playerIds[j].id },
          },
        },
      });
    }
  }
  console.log("Add players to tournaments correctly");
};

seedTournaments();
