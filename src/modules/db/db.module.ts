import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://hex.mpkmuix.mongodb.net', {
      appName: 'Hex',
      auth: {
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASS,
      },
      connectionName: 'hex',
      retryWrites: true,
      writeConcern: { w: 'majority' },
    }),
    // MongooseModule.forRootAsync({
    //   useFactory: () => {
    //     const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hex.mpkmuix.mongodb.net/`;
    //     console.log(uri);
    //     return {
    //       uri,
    //       retryWrites: true,
    //       writeConcern: { w: 'majority' },
    //       appName: 'Hex',
    //       auth: {
    //         username: process.env.MONGO_USER,
    //         password: process.env.MONGO_PASS,
    //       },
    //     };
    //   },
    //   connectionName: 'hex',
    // }),
  ],
  exports: [MongooseModule],
})
export class DbModule {}
