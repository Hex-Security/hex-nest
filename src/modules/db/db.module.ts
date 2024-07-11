import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

const config: MongooseModuleOptions = {
  retryWrites: true,
  writeConcern: { w: 'majority' },
  authSource: 'admin',
  appName: 'Hex',
};

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hex.mpkmuix.mongodb.net/`;
        return {
          uri,
          ...config,
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DbModule {}
