import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tables1714002851810 implements MigrationInterface {
  name = 'Tables1714002851810';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Creating tables...');
    // Creating users table
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
      CREATE TABLE complexes (
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
      CREATE TABLE users (
        user_id VARCHAR(128) PRIMARY KEY,
        username VARCHAR NOT NULL,
        name VARCHAR NOT NULL,
        lname VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        phone VARCHAR NOT NULL,
        role roles NOT NULL DEFAULT 'user',
        residence_id UUID,
        complex_id UUID,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE houses (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        number VARCHAR NOT NULL,
        owner_id VARCHAR(128) NOT NULL,
        complex_id UUID NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE access (
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
      CREATE TABLE visitors (
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
      CREATE TABLE vehicles (
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
      ALTER TABLE complexes
      ADD CONSTRAINT fk_complexes_admin_id FOREIGN KEY (admin_id) REFERENCES users(user_id);
    `);

    await queryRunner.query(`
      ALTER TABLE users
      ADD CONSTRAINT fk_users_residence_id FOREIGN KEY (residence_id) REFERENCES houses(id),
      ADD CONSTRAINT fk_users_complex_id FOREIGN KEY (complex_id) REFERENCES complexes(id);
    `);

    await queryRunner.query(`
      ALTER TABLE houses
      ADD CONSTRAINT fk_houses_owner_id FOREIGN KEY (owner_id) REFERENCES users(user_id),
      ADD CONSTRAINT fk_houses_complex_id FOREIGN KEY (complex_id) REFERENCES complexes(id);
    `);

    await queryRunner.query(`
      ALTER TABLE access
      ADD CONSTRAINT fk_access_approver_id FOREIGN KEY (approver_id) REFERENCES users(user_id),
      ADD CONSTRAINT fk_access_visitor_id FOREIGN KEY (visitor_id) REFERENCES visitors(id),
      ADD CONSTRAINT fk_access_vehicle_id FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
      ADD CONSTRAINT fk_access_house_id FOREIGN KEY (house_id) REFERENCES houses(id),
      ADD CONSTRAINT fk_access_requester_id FOREIGN KEY (requester_id) REFERENCES users(user_id),
      ADD CONSTRAINT fk_access_guard_id FOREIGN KEY (guard_id) REFERENCES users(user_id);
    `);

    await queryRunner.query(`
      ALTER TABLE vehicles
      ADD CONSTRAINT fk_vehicles_house_id FOREIGN KEY (house_id) REFERENCES houses(id),
      ADD CONSTRAINT fk_vehicles_visitor_id FOREIGN KEY (visitor_id) REFERENCES visitors(id),
      ADD CONSTRAINT fk_vehicles_user_id FOREIGN KEY (user_id) REFERENCES users(user_id);
    `);

    await queryRunner.query(`
      ALTER TABLE visitors
      ADD CONSTRAINT fk_visitors_user_id FOREIGN KEY (user_id) REFERENCES users(user_id),
    `);

    console.log('Foreign key constraints: OK');

    // Create Indexes for Access Table
    await queryRunner.query(`
      CREATE INDEX access_visitor_id_index ON access(visitor_id);
    `);
    await queryRunner.query(`
      CREATE INDEX idx_approver_id ON access(approver_id);
    `);
    await queryRunner.query(`
      CREATE INDEX idx_vehicle_id ON access(vehicle_id);
    `);
    await queryRunner.query(`
      CREATE INDEX idx_house_id ON access(house_id);
    `);
    await queryRunner.query(`
      CREATE INDEX idx_requester_id ON access(requester_id);
    `);
    await queryRunner.query(`
      CREATE INDEX idx_guard_id ON access(guard_id);
    `);

    console.log('Indexes: OK');

    // Ensure the UUID extension is available
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    // Insert data into complexes table
    await queryRunner.query(`
      INSERT INTO complexes (id, name, admin_id, address, city, state, zip, metadata) VALUES
      (uuid_generate_v4(), 'Complex 1', 'admin1', '123 Main St', 'City A', 'State A', '12345', '{}', NOW(), NOW()),
      (uuid_generate_v4(), 'Complex 2', 'admin2', '456 Side St', 'City B', 'State B', '67890', '{}', NOW(), NOW());
    `);

    // Insert data into users table for admins
    await queryRunner.query(`
      INSERT INTO users (user_id, username, name, lname, email, phone, role, residence_id, complex_id) VALUES
      ('admin1', 'admin1', 'Admin', 'One', 'admin1@complex.com', '1234567890', 'admin', NULL, (SELECT id FROM complexes WHERE name = 'Complex 1')),
      ('admin2', 'admin2', 'Admin', 'Two', 'admin2@complex.com', '0987654321', 'admin', NULL, (SELECT id FROM complexes WHERE name = 'Complex 2'));
    `);

    // Update the admin_id field in the complexes table
    await queryRunner.query(`
      UPDATE complexes SET admin_id = 'admin1' WHERE name = 'Complex 1';
    `);

    await queryRunner.query(`
      UPDATE complexes SET admin_id = 'admin2' WHERE name = 'Complex 2';
    `);

    // Insert data into users table for guards
    await queryRunner.query(`
      INSERT INTO users (user_id, username, name, lname, role, complex_id) VALUES
      ('guard1', 'guard1', 'Guard', 'One', 'guard', (SELECT id FROM complexes WHERE name = 'Complex 1')),
      ('guard2', 'guard2', 'Guard', 'Two', 'guard', (SELECT id FROM complexes WHERE name = 'Complex 2'));
    `);

    // Insert data into users table for houses
    await queryRunner.query(`
      INSERT INTO houses (id, number, complex_id) VALUES
      (uuid_generate_v4(), '1', (SELECT id FROM complexes WHERE name = 'Complex 1')),
      (uuid_generate_v4(), '2', (SELECT id FROM complexes WHERE name = 'Complex 2'));
    `);

    // Insert data into users table for residents
    await queryRunner.query(`
      INSERT INTO users (user_id, username, name, lname, email, phone, role, residence_id) VALUES
      ('resident1', 'resident1', 'Resident', 'One', 'resident1@email.com', '1234567890', 'user', (SELECT id FROM houses WHERE number = '1')),
      ('resident2', 'resident2', 'Resident', 'Two', 'resident2@email.com', '0987654321', 'user', (SELECT id FROM houses WHERE number = '2'));
    `);

    // Update the owner_id field in the houses table
    await queryRunner.query(`
      UPDATE houses SET owner_id = 'resident1' WHERE number = '1';
    `);

    await queryRunner.query(`
      UPDATE houses SET owner_id = 'resident2' WHERE number = '2';
    `);

    // Insert data into users table for visitors
    await queryRunner.query(`
      INSERT INTO users (user_id, name, lname, phone, role) VALUES
      ('visitor1', 'Visitor', 'One', '1234567890', 'visitor'),
      ('visitor2', 'Visitor', 'Two', '0987654321', 'visitor');
    `);

    // Insert data into visitors table
    await queryRunner.query(`
      INSERT INTO visitors (user_id, name, lname, phone) VALUES
      ('visitor1', 'Visitor', 'One', '1234567890'),
      ('visitor2', 'Visitor', 'Two', '0987654321');
    `);

    // Insert data into vehicles table for visitors
    await queryRunner.query(`
      INSERT INTO vehicles (id, make, model, plate, color, year, house_id, user_id) VALUES
      (uuid_generate_v4(), 'Toyota', 'Corolla', '123ABC', 'Blue', '2021', (SELECT id FROM houses WHERE number = '1'), 'visitor1'),
      (uuid_generate_v4(), 'Honda', 'Civic', '456DEF', 'Red', '2020', (SELECT id FROM houses WHERE number = '2'), 'visitor2');
    `);

    // Insert data into vehicles table for residents
    await queryRunner.query(`
      INSERT INTO vehicles (id, make, model, plate, color, year, house_id, user_id) VALUES
      (uuid_generate_v4(), 'Ford', 'F150', '789GHI', 'Black', '2019', (SELECT id FROM houses WHERE number = '1'), 'resident1'),
      (uuid_generate_v4(), 'Chevy', 'Silverado', '012JKL', 'White', '2018', (SELECT id FROM houses WHERE number = '2'), 'resident2');
    `);

    // Insert data into access table
    await queryRunner.query(`
      INSERT INTO access (id, reason, document, status, visitor_id, house_id, requester_id) VALUES
      (uuid_generate_v4(), 'Delivery', '123456', 'pending', 'visitor1', (SELECT id FROM houses WHERE number = '1'), 'resident1'),
      (uuid_generate_v4(), 'Service', '789012', 'pending', 'visitor2', (SELECT id FROM houses WHERE number = '2'), 'resident2');
    `);

    console.log('Data insertion: OK');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Dropping tables...');
    await queryRunner.query(
      'ALTER TABLE vehicles DROP CONSTRAINT fk_vehicles_user_id;',
    );
    await queryRunner.query(
      'ALTER TABLE vehicles DROP CONSTRAINT fk_vehicles_visitor_id;',
    );
    await queryRunner.query(
      'ALTER TABLE vehicles DROP CONSTRAINT fk_vehicles_house_id;',
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
      'ALTER TABLE houses DROP CONSTRAINT fk_houses_complex_id;',
    );
    await queryRunner.query(
      'ALTER TABLE houses DROP CONSTRAINT fk_houses_owner_id;',
    );
    await queryRunner.query(
      'ALTER TABLE users DROP CONSTRAINT fk_users_complex_id;',
    );
    await queryRunner.query(
      'ALTER TABLE users DROP CONSTRAINT fk_users_residence_id;',
    );
    await queryRunner.query(
      'ALTER TABLE complexes DROP CONSTRAINT fk_complexes_admin_id;',
    );

    await queryRunner.query('DROP TABLE IF EXISTS vehicles;');
    await queryRunner.query('DROP TABLE IF EXISTS access;');
    await queryRunner.query('DROP TABLE IF EXISTS visitors;');
    await queryRunner.query('DROP TABLE IF EXISTS houses;');
    await queryRunner.query('DROP TABLE IF EXISTS users;');
    await queryRunner.query('DROP TABLE IF EXISTS complexes;');

    await queryRunner.query('DROP TYPE IF EXISTS visitor_type;');
    await queryRunner.query('DROP TYPE IF EXISTS status;');
    await queryRunner.query('DROP TYPE IF EXISTS roles;');
  }
}
