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

    await queryRunner.query(``);

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

    console.log('Inserting data...');

    // Ensure the UUID extension is available
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    // Inserting providers data
    await queryRunner.query(`
      INSERT INTO providers 
        (name, slug, description, logo, auth_type, supported_resources) 
      VALUES 
        ('Apple HealthKit', 'apple_health_kit', 'HealthKit provides a central repository for health and fitness data on iPhone and Apple Watch.', 'https://storage.googleapis.com/vital-assets/apple_health.png', 'sdk', ARRAY['activity', 'blood_oxygen', 'blood_pressure', 'body', 'caffeine', 'calories_active', 'calories_basal', 'distance', 'fat', 'floors_climbed', 'glucose', 'heartrate', 'hrv', 'hypnogram', 'mindfulness_minutes', 'profile', 'respiratory_rate', 'sleep', 'sleep_stream', 'steps', 'vo2_max', 'water', 'weight', 'workouts']),
        ('Oura', 'oura', 'Smart sleep tracking ring', 'https://storage.googleapis.com/vital-assets/oura.png', 'oauth', ARRAY['activity', 'body', 'calories_active', 'distance', 'heartrate', 'hrv', 'hypnogram', 'profile', 'respiratory_rate', 'sleep', 'sleep_stream', 'steps', 'weight', 'workouts']),
        ('Whoop V2', 'whoop_v2', 'Smart Activity Watches', 'https://storage.googleapis.com/vital-assets/whoop.png', 'team_oauth', ARRAY['activity', 'body', 'sleep', 'workouts']),
        ('Fitbit', 'fitbit', 'Activity Trackers', 'https://storage.googleapis.com/vital-assets/fitbit.png', 'oauth', ARRAY['activity', 'blood_oxygen', 'body', 'calories_active',  'distance', 'fat', 'heartrare', 'hrv', 'hypnogram', 'profile', 'respiratory_rate', 'sleep', 'steps', 'vo2_max', 'water', 'weight', 'workout_stream', 'workouts']),
        ('Garmin', 'garmin', 'Smart Watches', 'https://storage.googleapis.com/vital-assets/garmin.png', 'oauth', ARRAY['activity', 'blood_oxygen', 'blood_pressure', 'body', 'calories_active', 'distance', 'fat', 'heartrate', 'hrv', 'hypnogram', 'respiratory_rate', 'sleep', 'steps', 'stress_level','vo2_max', 'weight', 'workouts']),
        ('Baseline API', 'api', 'API incoming data', 'N/A', 'N/A', ARRAY['activity', 'body', 'sleep', 'workouts']);
    `);

    console.log('Providers: OK');

    // Inserting users data
    await queryRunner.query(`
      INSERT INTO users (user_id, vital_id, rupa_id, fname, lname, email, role) 
      VALUES 
        (uuid_generate_v4(), '36e5aaba-0208-401b-8859-50b836e892e6', 'pat_abcdefg', 'John', 'Doe', 'john.doe@example.com', 'user'),
        (uuid_generate_v4(), 'fac593ed-f371-4aea-9210-9332f1b19bec', 'pat_hijklmn', 'Jane', 'Smith', 'jane.smith@example.com', 'user')
      ;
    `);

    // await queryRunner.query(`
    //   INSERT INTO enroll_metadata (user_id, authenticator_type, binding_method, recovery_codes, oob_channel, oob_code, mfa_token)
    //   SELECT user_id, 'email', 'email', ARRAY['123456'], 'email', '123456', '123
    //   FROM users u
    //   WHERE u.vital_id = '36e5aaba-0208-401b-8859-50b836e892e6'
    //   UNION ALL
    //   SELECT user_id, 'email', 'email', ARRAY['654321'], 'email', '654321', '321'
    //   FROM users u
    //   WHERE u.vital_id = 'fac593ed-f371-4aea-9210-9332f1b19bec';
    // `);

    console.log('Users: OK');

    await queryRunner.query(`
      INSERT INTO profiles (user_id, phone, goals, activity_level, age, weight, height, first_time)
      SELECT user_id, phone, goals, activity_level, age, weight, height, first_time
      FROM (
        SELECT 
          user_id,
          '+1234567890' AS phone,
          ARRAY['lose_weight'::goals, 'control_stress'::goals] AS goals,
          3 AS activity_level,
          25 AS age,
          150 AS weight,
          70 AS height,
          TRUE AS first_time
        FROM users u
        WHERE u. vital_id = '36e5aaba-0208-401b-8859-50b836e892e6'
      
        UNION ALL
      
        SELECT 
          user_id,
          '+0987654321' AS phone,
          ARRAY['improve_recovery'::goals, 'improve_sleep'::goals] AS goals,
          2 AS activity_level,
          30 AS age,
          200 AS weight,
          80 AS height,
          TRUE AS first_time
        FROM users u
        WHERE u.vital_id = 'fac593ed-f371-4aea-9210-9332f1b19bec'
      ) AS profile_data;
    `);

    console.log('Profiles: OK');
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
