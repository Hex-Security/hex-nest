import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFeedTables1714002851810 implements MigrationInterface {
  name = 'CreateFeedTables1714002851810';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('Creating tables...');
    // Creating users table
    await queryRunner.query(`
      CREATE TYPE role AS ENUM ('admin', 'user', 'guard', 'visitor', 'service');
    `);

    await queryRunner.query(`
      CREATE TABLE
        IF NOT EXISTS users (
          user_id VARCHAR(36) PRIMARY KEY,
          vital_id VARCHAR(36) UNIQUE NOT NULL,
          rupa_id VARCHAR(100) UNIQUE,
          team_id VARCHAR(36),
          fname VARCHAR(100) NOT NULL,
          lname VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          role role NOT NULL,
          created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await queryRunner.query(`
      CREATE TABLE
        IF NOT EXISTS enroll_metadata (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(36) NOT NULL REFERENCES users (user_id),
          authenticator_type VARCHAR(100) NOT NULL,
          binding_method VARCHAR(100) NOT NULL,
          recovery_codes TEXT[],
          oob_channel VARCHAR(100) NOT NULL,
          oob_code TEXT NOT NULL,
          mfa_token TEXT NOT NULL,
          created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Creating providers table
    await queryRunner.query(`
      CREATE TABLE
        IF NOT EXISTS providers (
          slug VARCHAR(100) PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          description VARCHAR(1000),
          logo VARCHAR(1000),
          auth_type VARCHAR(100) NOT NULL,
          supported_resources VARCHAR(100)[],
          created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Creating sources table
    await queryRunner.query(`
      CREATE TABLE
        IF NOT EXISTS sources (
          user_id VARCHAR(36) REFERENCES users (user_id),
          slug VARCHAR(100) REFERENCES providers (slug),
          conn_metadata JSON,
          type VARCHAR(10),
          created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (user_id, slug)
        );
    `);

    // Creating vectors table
    await queryRunner.query(`
      CREATE TABLE
        IF NOT EXISTS vectors (
          id VARCHAR(36) PRIMARY KEY,
          user_id VARCHAR(36) REFERENCES users (user_id) NOT NULL,
          event_type VARCHAR(100) NOT NULL,
          slug VARCHAR(100) REFERENCES providers (slug),
          event_data JSON,
          values FLOAT[] NOT NULL,
          created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Creating profiles table
    await queryRunner.query(`
      CREATE TABLE
        IF NOT EXISTS profiles (
          user_id VARCHAR(36) REFERENCES users (user_id) PRIMARY KEY,
          phone VARCHAR(20),
          goals goals[],
          activity_level INTEGER,
          age INTEGER,
          weight INTEGER,
          height INTEGER,
          first_time BOOLEAN DEFAULT TRUE NOT NULL,
          CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id)
        );
    `);

    await queryRunner.query(`
      CREATE TABLE
        IF NOT EXISTS patients (
          rupa_id VARCHAR PRIMARY KEY,
          user_id VARCHAR(36) REFERENCES users (user_id) NOT NULL,
          created_at TIMESTAMP NOT NULL,
          practitioner_id VARCHAR NOT NULL,
          clinic_id VARCHAR NOT NULL,
          gender VARCHAR NOT NULL,
          shipping_address VARCHAR,
          CONSTRAINT fk_user_ID FOREIGN KEY (user_id) REFERENCES users (user_id)
        );
    `);

    await queryRunner.query(`
      CREATE TABLE 
        IF NOT EXISTS practitioners (
          id VARCHAR PRIMARY KEY,
          first_name VARCHAR NOT NULL,
          last_name VARCHAR NOT NULL,
          titled_full_name VARCHAR NOT NULL,
          primary_practitioner_type VARCHAR NOT NULL,
          ordering_authorization_status BOOLEAN NOT NULL,
          verification_status BOOLEAN NOT NULL,
          address VARCHAR NOT NULL,
          updated_at TIMESTAMP NOT NULL,
          clinic_id VARCHAR NOT NULL
        );
    `);

    await queryRunner.query(`
      CREATE TABLE 
        IF NOT EXISTS lab_companies (
          id VARCHAR PRIMARY KEY,
          name VARCHAR NOT NULL,
          short_name VARCHAR,
          key VARCHAR NOT NULL,
          additional_fees TEXT,
          about_url VARCHAR,
          logo VARCHAR,
          certifications TEXT[],
          specialties TEXT[]
        );
    `);

    await queryRunner.query(`
      CREATE TABLE 
        IF NOT EXISTS lab_tests (
          id VARCHAR PRIMARY KEY,
          name VARCHAR NOT NULL,
          url VARCHAR,
          details TEXT,
          lab_company_id VARCHAR NOT NULL,
          unavailable_reason VARCHAR,
          is_addon BOOLEAN NOT NULL,
          parent_id VARCHAR,
          shipping_days_min INTEGER NOT NULL,
          shipping_days_max INTEGER NOT NULL,
          estimated_days_for_results INTEGER NOT NULL,
          rupa_price NUMERIC NOT NULL,
          sample_report_url VARCHAR,
          disabled BOOLEAN NOT NULL,
          disabled_reason VARCHAR,
          CONSTRAINT fk_lab_company FOREIGN KEY (lab_company_id) REFERENCES lab_companies (id),
          CONSTRAINT fk_parent_lab_test FOREIGN KEY (parent_id) REFERENCES lab_tests (id)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE 
        IF NOT EXISTS orders (
          id VARCHAR PRIMARY KEY,
          patient_id VARCHAR NOT NULL,
          practitioner_id VARCHAR NOT NULL,
          signing_practitioner_id VARCHAR NOT NULL,
          total_price NUMERIC NOT NULL,
          notes_to_patient TEXT,
          line_items TEXT[],
          is_demo BOOLEAN NOT NULL,
          status VARCHAR NOT NULL,
          date_submitted TIMESTAMP,
          date_paid TIMESTAMP,
          date_patient_checkout TIMESTAMP,
          date_completed TIMESTAMP,
          date_canceled TIMESTAMP,
          payer VARCHAR,
          CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES users (user_id),
          CONSTRAINT fk_practitioner FOREIGN KEY (practitioner_id) REFERENCES practitioners (id),
          CONSTRAINT fk_signing_practitioner FOREIGN KEY (signing_practitioner_id) REFERENCES practitioners (id)
      );
    `);
    await queryRunner.query(`
      CREATE TABLE 
        IF NOT EXISTS ordered_tests (
          id VARCHAR PRIMARY KEY,
          user_id VARCHAR NOT NULL,
          order_id VARCHAR NOT NULL,
          lab_test_id VARCHAR NOT NULL,
          date_results_received_from_lab TIMESTAMP NOT NULL,
          results_h17 TEXT NOT NULL,
          results_pdf TEXT NOT NULL,
          CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id),
          CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders (id),
          CONSTRAINT fk_lab_test FOREIGN KEY (lab_test_id) REFERENCES lab_tests (id)
      );
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
