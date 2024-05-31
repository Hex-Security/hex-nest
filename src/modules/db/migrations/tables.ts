import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFeedTables1714002851810 implements MigrationInterface {
  name = 'CreateFeedTables1714002851810';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Creating tables...');
    // Creating users table
    await queryRunner.query(`
      CREATE TYPE roles AS ENUM ('admin', 'user', 'guard', 'visitor', 'service');
    `);

    await queryRunner.query(`
      CREATE TYPE status AS ENUM ('pending', 'approved', 'denied');
    `);

    await queryRunner.query(`
      CREATE TYPE visitor_type AS ENUM ('visitor', 'service', 'delivery', 'vendor', 'other');
    `);

    console.log('Types: OK');

    await queryRunner.query(`
      CREATE TABLE access (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        reason VARCHAR NOT NULL,
        document VARCHAR NOT NULL,
        status status_enum NOT NULL DEFAULT 'PENDING',
        approver_id UUID,
        visitor_id UUID NOT NULL,
        vehicle_id UUID,
        house_id UUID NOT NULL,
        requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        entry_time TIMESTAMPTZ,
        exit_time TIMESTAMPTZ,
        requester_id UUID NOT NULL,
        duration INT,
        guard_id UUID,
        FOREIGN KEY (approver_id) REFERENCES users(id),
        FOREIGN KEY (visitor_id) REFERENCES visitors(id),
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
        FOREIGN KEY (house_id) REFERENCES houses(id),
        FOREIGN KEY (requester_id) REFERENCES users(id),
        FOREIGN KEY (guard_id) REFERENCES users(id)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE users (
        user_id UUID PRIMARY KEY,
        username VARCHAR NOT NULL,
        name VARCHAR NOT NULL,
        lname VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        phone VARCHAR NOT NULL,
        role roles NOT NULL DEFAULT 'USER',
        residence_id UUID,
        complex_id UUID,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        FOREIGN KEY (residence_id) REFERENCES houses(id),
        FOREIGN KEY (complex_id) REFERENCES complexes(id)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE visitors (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR NOT NULL,
        lname VARCHAR NOT NULL,
        phone VARCHAR NOT NULL,
        type visitor_type_enum NOT NULL DEFAULT 'VISITOR',
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
        visitor_id UUID,
        user_id UUID,
        FOREIGN KEY (house_id) REFERENCES houses(id),
        FOREIGN KEY (visitor_id) REFERENCES visitors(id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE houses (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        number VARCHAR NOT NULL,
        owner_id UUID NOT NULL,
        complex_id UUID NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES users(user_id),
        FOREIGN KEY (complex_id) REFERENCES complexes(id)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE complexes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR NOT NULL,
        admin_id UUID NOT NULL,
        address VARCHAR NOT NULL,
        city VARCHAR NOT NULL,
        state VARCHAR NOT NULL,
        zip VARCHAR NOT NULL,
        metadata JSON NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        FOREIGN KEY (admin_id) REFERENCES users(user_id)
      );
    `);

    console.log('All tables: OK');

    // Create Indexes for Access Table
    await queryRunner.query(`
      CREATE INDEX access_visitor_id_index ON access(visitor_id);
      `);
    await queryRunner.query(`
      CREATE INDEX idx_approver_id ON access(approver_id);
      `);
    await queryRunner.query(`
      CREATE INDEX idx_visitor_id ON access(visitor_id);
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
      INSERT INTO complexes (id, name, admin_id, address, city, state, zip, metadata, created_at, updated_at) VALUES
      (uuid_generate_v4(), 'Complex 1', 'admin1', '123 Main St', 'City A', 'State A', '12345', '{}', NOW(), NOW()),
      (uuid_generate_v4(), 'Complex 2', 'admin2', '456 Side St', 'City B', 'State B', '67890', '{}', NOW(), NOW());
    `);

    // Insert data into users table for admins
    await queryRunner.query(`
      INSERT INTO users (user_id, username, name, lname, email, phone, role, residence_id, complex_id, created_at, updated_at) VALUES
      ('admin1', 'admin1', 'Admin', 'One', 'admin1@complex.com', '1234567890', 'admin', NULL, (SELECT id FROM complexes WHERE name = 'Complex 1'), NOW(), NOW()),
      ('admin2', 'admin2', 'Admin', 'Two', 'admin2@complex.com', '0987654321', 'admin', NULL, (SELECT id FROM complexes WHERE name = 'Complex 2'), NOW(), NOW());
    `);

    // Insert data into users table for users

    // Insert data into users table for guards

    // Insert data into users table for visitors

    // Insert data into visitors table
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Dropping tables...');
    // Add logic to revert the migration
    await queryRunner.query('DROP TABLE IF EXISTS vectors;');
    await queryRunner.query('DROP TABLE IF EXISTS sources;');
    await queryRunner.query('DROP TABLE IF EXISTS providers;');
    await queryRunner.query('DROP TABLE IF EXISTS users;');
    await queryRunner.query('DROP TABLE IF EXISTS profiles;');
    await queryRunner.query('DROP TABLE IF EXISTS patients;');
    await queryRunner.query('DROP TABLE IF EXISTS practitioners;');
    await queryRunner.query('DROP TABLE IF EXISTS lab_companies;');
    await queryRunner.query('DROP TABLE IF EXISTS lab_tests;');
    await queryRunner.query('DROP TABLE IF EXISTS orders;');
    await queryRunner.query('DROP TABLE IF EXISTS ordered_tests;');

    await queryRunner.query('DROP TYPE IF EXISTS role;');
  }
}
