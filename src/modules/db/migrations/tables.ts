import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tables1714002851810 implements MigrationInterface {
  name = 'Tables1714002851810';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Creating tables...');
    // Creating user table
    await queryRunner.query(`
      CREATE TYPE roles AS ENUM ('admin', 'user', 'guard', 'visitor', 'service');
    `);

    await queryRunner.query(`
      CREATE TYPE status AS ENUM ('pending', 'approved', 'denied', 'expired', 'completed', 'cancelled');
    `);

    await queryRunner.query(`
      CREATE TYPE visitor_type AS ENUM ('visitor', 'service', 'delivery', 'vendor', 'other');
    `);

    console.log('Types: OK');

    await queryRunner.query(`
      CREATE TABLE
        IF NOT EXISTS complex (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR NOT NULL,
          admin_id VARCHAR(128) NOT NULL,
          address VARCHAR NOT NULL,
          city VARCHAR NOT NULL,
          state VARCHAR NOT NULL,
          zip VARCHAR NOT NULL,
          metadata JSON NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE
        IF NOT EXISTS users (
          user_id VARCHAR(128) PRIMARY KEY,
          username VARCHAR,
          name VARCHAR NOT NULL,
          lname VARCHAR NOT NULL,
          email VARCHAR,
          phone VARCHAR,
          role roles NOT NULL DEFAULT 'user',
          residence_id UUID,
          complex_id UUID,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE
        IF NOT EXISTS house (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          number VARCHAR NOT NULL,
          owner_id VARCHAR(128) NOT NULL,
          complex_id UUID NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE
        IF NOT EXISTS access (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          reason VARCHAR NOT NULL,
          document VARCHAR NOT NULL,
          status status NOT NULL DEFAULT 'pending',
          approver_id VARCHAR(128),
          visitor_id VARCHAR(128) NOT NULL,
          vehicle_id UUID,
          house_id UUID NOT NULL,
          requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          entry_time TIMESTAMPTZ,
          exit_time TIMESTAMPTZ,
          requester_id VARCHAR(128) NOT NULL,
          duration INT,
          guard_id VARCHAR(128)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE
        IF NOT EXISTS visitor (
          user_id VARCHAR(128) PRIMARY KEY,
          name VARCHAR NOT NULL,
          lname VARCHAR NOT NULL,
          phone VARCHAR NOT NULL,
          type visitor_type NOT NULL DEFAULT 'visitor',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE
        IF NOT EXISTS vehicle (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          make VARCHAR NOT NULL,
          model VARCHAR NOT NULL,
          plate VARCHAR NOT NULL,
          color VARCHAR NOT NULL,
          year VARCHAR NOT NULL,
          is_visitor BOOLEAN NOT NULL DEFAULT TRUE,
          house_id UUID NOT NULL,
          user_id VARCHAR(128)
      );
    `);

    console.log('All tables: OK');

    // Adding foreign key constraints
    await queryRunner.query(`
      ALTER TABLE complex
      ADD CONSTRAINT fk_complex_admin_id FOREIGN KEY (admin_id) REFERENCES users (user_id);
    `);

    await queryRunner.query(`
      ALTER TABLE users
      ADD CONSTRAINT fk_user_residence_id FOREIGN KEY (residence_id) REFERENCES house (id),
      ADD CONSTRAINT fk_user_complex_id FOREIGN KEY (complex_id) REFERENCES complex (id);
    `);

    await queryRunner.query(`
      ALTER TABLE house
      ADD CONSTRAINT fk_house_owner_id FOREIGN KEY (owner_id) REFERENCES users (user_id),
      ADD CONSTRAINT fk_house_complex_id FOREIGN KEY (complex_id) REFERENCES complex (id);
    `);

    await queryRunner.query(`
      ALTER TABLE access
      ADD CONSTRAINT fk_access_approver_id FOREIGN KEY (approver_id) REFERENCES users (user_id),
      ADD CONSTRAINT fk_access_visitor_id FOREIGN KEY (visitor_id) REFERENCES visitor (user_id),
      ADD CONSTRAINT fk_access_vehicle_id FOREIGN KEY (vehicle_id) REFERENCES vehicle (id),
      ADD CONSTRAINT fk_access_house_id FOREIGN KEY (house_id) REFERENCES house (id),
      ADD CONSTRAINT fk_access_requester_id FOREIGN KEY (requester_id) REFERENCES users (user_id),
      ADD CONSTRAINT fk_access_guard_id FOREIGN KEY (guard_id) REFERENCES users (user_id);
    `);

    await queryRunner.query(`
      ALTER TABLE vehicle
      ADD CONSTRAINT fk_vehicle_house_id FOREIGN KEY (house_id) REFERENCES house (id),
      ADD CONSTRAINT fk_vehicle_user_id FOREIGN KEY (user_id) REFERENCES users (user_id);
    `);

    await queryRunner.query(`
      ALTER TABLE visitor
      ADD CONSTRAINT fk_visitor_user_id FOREIGN KEY (user_id) REFERENCES users (user_id);
    `);

    console.log('Foreign key constraints: OK');

    // Create Indexes for Access Table
    await queryRunner.query(`
      CREATE INDEX access_visitor_id_index ON access (visitor_id);
    `);
    await queryRunner.query(`
      CREATE INDEX idx_approver_id ON access (approver_id);
    `);
    await queryRunner.query(`
      CREATE INDEX idx_vehicle_id ON access (vehicle_id);
    `);
    await queryRunner.query(`
      CREATE INDEX idx_house_id ON access (house_id);
    `);
    await queryRunner.query(`
      CREATE INDEX idx_requester_id ON access (requester_id);
    `);
    await queryRunner.query(`
      CREATE INDEX idx_guard_id ON access (guard_id);
    `);

    console.log('Indexes: OK');

    // Ensure the UUID extension is available
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    // Insert data into user table for admins
    await queryRunner.query(`
      INSERT INTO users (user_id, username, name, lname, email, phone, role, residence_id) VALUES
      ('admin1', 'admin1', 'Admin', 'One', 'admin1@complex.com', '1234567890', 'admin', NULL),
      ('admin2', 'admin2', 'Admin', 'Two', 'admin2@complex.com', '0987654321', 'admin', NULL);
    `);

    // Insert data into complex table
    await queryRunner.query(`
      INSERT INTO complex (id, name, admin_id, address, city, state, zip, metadata) VALUES
      (uuid_generate_v4(), 'Complex 1', 'admin1', '123 Main St', 'City A', 'State A', '12345', '{}'),
      (uuid_generate_v4(), 'Complex 2', 'admin2', '456 Side St', 'City B', 'State B', '67890', '{}');
    `);

    // Update the complex_id field in the user table
    await queryRunner.query(`
      UPDATE users SET complex_id = (SELECT id FROM complex WHERE name = 'Complex 1') WHERE user_id = 'admin1';
    `);

    await queryRunner.query(`
      UPDATE users SET complex_id = (SELECT id FROM complex WHERE name = 'Complex 2') WHERE user_id = 'admin2';
    `);

    // Insert data into user table for guards
    await queryRunner.query(`
      INSERT INTO users (user_id, username, name, lname, role, complex_id) VALUES
      ('guard1', 'guard1', 'Guard', 'One', 'guard', (SELECT id FROM complex WHERE name = 'Complex 1')),
      ('guard2', 'guard2', 'Guard', 'Two', 'guard', (SELECT id FROM complex WHERE name = 'Complex 2'));
    `);

    // Insert data into user table for residents
    await queryRunner.query(`
      INSERT INTO users (user_id, username, name, lname, email, phone, role) VALUES
      ('resident1', 'resident1', 'Resident', 'One', 'resident1@email.com', '1234567890', 'user'),
      ('resident2', 'resident2', 'Resident', 'Two', 'resident2@email.com', '0987654321', 'user');
    `);

    // Insert data into user table for house
    await queryRunner.query(`
      INSERT INTO house (id, number, owner_id, complex_id) VALUES
      (uuid_generate_v4(), '1', 'admin1', (SELECT id FROM complex WHERE name = 'Complex 1')),
      (uuid_generate_v4(), '2', 'admin2', (SELECT id FROM complex WHERE name = 'Complex 2'));
    `);

    // Update the residence_id field in the user table
    await queryRunner.query(`
      UPDATE users SET residence_id = (SELECT id FROM house WHERE number = '1') WHERE user_id = 'resident1';
    `);

    await queryRunner.query(`
      UPDATE users SET residence_id = (SELECT id FROM house WHERE number = '2') WHERE user_id = 'resident2';
    `);

    // Insert data into user table for visitor
    await queryRunner.query(`
      INSERT INTO users (user_id, name, lname, phone, role) VALUES
      ('visitor1', 'Visitor', 'One', '1234567890', 'visitor'),
      ('visitor2', 'Visitor', 'Two', '0987654321', 'visitor');
    `);

    // Insert data into visitor table
    await queryRunner.query(`
      INSERT INTO visitor (user_id, name, lname, phone) VALUES
      ('visitor1', 'Visitor', 'One', '1234567890'),
      ('visitor2', 'Visitor', 'Two', '0987654321');
    `);

    // Insert data into vehicle table for visitor
    await queryRunner.query(`
      INSERT INTO vehicle (id, make, model, plate, color, year, house_id, user_id) VALUES
      (uuid_generate_v4(), 'Toyota', 'Corolla', '123ABC', 'Blue', '2021', (SELECT id FROM house WHERE number = '1'), 'visitor1'),
      (uuid_generate_v4(), 'Honda', 'Civic', '456DEF', 'Red', '2020', (SELECT id FROM house WHERE number = '2'), 'visitor2');
    `);

    // Insert data into vehicle table for residents
    await queryRunner.query(`
      INSERT INTO vehicle (id, make, model, plate, color, year, house_id, user_id) VALUES
      (uuid_generate_v4(), 'Ford', 'F150', '789GHI', 'Black', '2019', (SELECT id FROM house WHERE number = '1'), 'resident1'),
      (uuid_generate_v4(), 'Chevy', 'Silverado', '012JKL', 'White', '2018', (SELECT id FROM house WHERE number = '2'), 'resident2');
    `);

    // Insert data into access table
    await queryRunner.query(`
      INSERT INTO access (id, reason, document, status, visitor_id, house_id, requester_id) VALUES
      (uuid_generate_v4(), 'Delivery', '123456', 'pending', 'visitor1', (SELECT id FROM house WHERE number = '1'), 'resident1'),
      (uuid_generate_v4(), 'Service', '789012', 'pending', 'visitor2', (SELECT id FROM house WHERE number = '2'), 'resident2');
    `);

    console.log('Data insertion: OK');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Dropping tables...');
    await queryRunner.query(
      'ALTER TABLE vehicle DROP CONSTRAINT fk_vehicle_user_id;',
    );
    await queryRunner.query(
      'ALTER TABLE vehicle DROP CONSTRAINT fk_vehicle_visitor_id;',
    );
    await queryRunner.query(
      'ALTER TABLE vehicle DROP CONSTRAINT fk_vehicle_house_id;',
    );
    await queryRunner.query(
      'ALTER TABLE access DROP CONSTRAINT fk_access_guard_id;',
    );
    await queryRunner.query(
      'ALTER TABLE access DROP CONSTRAINT fk_access_requester_id;',
    );
    await queryRunner.query(
      'ALTER TABLE access DROP CONSTRAINT fk_access_house_id;',
    );
    await queryRunner.query(
      'ALTER TABLE access DROP CONSTRAINT fk_access_vehicle_id;',
    );
    await queryRunner.query(
      'ALTER TABLE access DROP CONSTRAINT fk_access_visitor_id;',
    );
    await queryRunner.query(
      'ALTER TABLE access DROP CONSTRAINT fk_access_approver_id;',
    );
    await queryRunner.query(
      'ALTER TABLE house DROP CONSTRAINT fk_house_complex_id;',
    );
    await queryRunner.query(
      'ALTER TABLE house DROP CONSTRAINT fk_house_owner_id;',
    );
    await queryRunner.query(
      'ALTER TABLE user DROP CONSTRAINT fk_user_complex_id;',
    );
    await queryRunner.query(
      'ALTER TABLE user DROP CONSTRAINT fk_user_residence_id;',
    );
    await queryRunner.query(
      'ALTER TABLE complex DROP CONSTRAINT fk_complex_admin_id;',
    );

    await queryRunner.query('DROP TABLE IF EXISTS vehicle;');
    await queryRunner.query('DROP TABLE IF EXISTS access;');
    await queryRunner.query('DROP TABLE IF EXISTS visitor;');
    await queryRunner.query('DROP TABLE IF EXISTS house;');
    await queryRunner.query('DROP TABLE IF EXISTS user;');
    await queryRunner.query('DROP TABLE IF EXISTS complex;');

    await queryRunner.query('DROP TYPE IF EXISTS visitor_type;');
    await queryRunner.query('DROP TYPE IF EXISTS status;');
    await queryRunner.query('DROP TYPE IF EXISTS roles;');
  }
}
