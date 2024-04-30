import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from 'src/modules/entity/entities/access.entity';
import { Complex } from 'src/modules/entity/entities/complex.entity';
import { House } from 'src/modules/entity/entities/house.entity';
import { User } from 'src/modules/entity/entities/user.entity';
import { Vehicle } from 'src/modules/entity/entities/vehicle.entity';
import { Visitor } from 'src/modules/entity/entities/visitor.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT) || 15432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DB || 'hex',
      entities: [Access, Complex, House, User, Vehicle, Visitor],
      synchronize: true,
      migrationsRun: true,
      migrations: ['dist/src/modules/db/migrations/*.js'],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
