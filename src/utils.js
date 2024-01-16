import { faker } from '@faker-js/faker';

function generateRandomProfiles() {
  const sampleProfiles = [];

  for (let i = 1; i <= 20; i++) {
    sampleProfiles.push({
      id: i,
      image: faker.image.avatar(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
    });
  }
  return sampleProfiles;
}

export default generateRandomProfiles;
