import { Sex, fakerES_MX } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { House } from '../src/modules/entity/entities/house.entity';
import { User } from '../src/modules/entity/entities/user.entity';
import { ComplexDto } from '../src/shared/dto/complex.dto';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const test_config = {
    nu_complexes: 2,
    nu_users_per_complex: 10,
    nu_houses_per_complex: 10,
    nu_residents_min_per_house: 1,
    nu_residents_max_per_house: 3,
    nu_vehicle_per_resident: 1,
    nu_visitors_per_resident: 2,
  };

  for (let i = 0; i < test_config.nu_complexes; i++) {
    // 1. Generate complex data
    const complex_dto: ComplexDto = {
      name: fakerES_MX.company.name(),
      address: fakerES_MX.location.streetAddress(),
      city: fakerES_MX.location.city(),
      state: fakerES_MX.location.state(),
      zip: fakerES_MX.location.zipCode(),
    };

    // 2. Generate users
    let users: Partial<User>[] = [];
    for (let j = 0; j < test_config.nu_users_per_complex; j++) {
      const sex = fakerES_MX.person.sex();
      const first_name = fakerES_MX.person.firstName(sex as Sex);
      const last_name = fakerES_MX.person.lastName(sex as Sex);

      const email =
        last_name.toLowerCase().slice(10) +
        first_name.toLowerCase().slice(2) +
        '@e2e-test.com';

      // 2. Create users data
      const user: Partial<User> = {
        name: first_name,
        lname: last_name,
        email: email,
        username: email,
      };

      users.push(user);
    }

    // 3. Generate houses data
    let houses: Partial<House>[] = [];
    for (let j = 0; j < test_config.nu_houses_per_complex; j++) {
      const house: Partial<House> = {
        number: fakerES_MX.location.buildingNumber(),
        residents: [],
        vehicles: [],
      };

      houses.push(house);
    }
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  for (let i = 0; i < test_config.nu_complexes; i++) {
    it('should create a complex', () => {
      return request(app.getHttpServer())
        .post('/complex')
        .send(complex_dto)
        .expect(201);
    });

    it('should create users', () => {
      return request(app.getHttpServer())
        .post('/user')
        .send(users)
        .expect(201);
    });

    it('should create houses', () => {
      return request(app.getHttpServer())
        .post('/house')
        .send(houses)
        .expect(201);
    });
  }
});
