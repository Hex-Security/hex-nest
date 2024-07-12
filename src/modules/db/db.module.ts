import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://hex:put0s1m3h4ck34s@hex.mpkmuix.mongodb.net/?retryWrites=true&w=majority&appName=Hex',
    ),
    // MongooseModule.forRoot('mongodb://hex.mpkmuix.mongodb.net', {
    //   appName: 'Hex',
    //   auth: {
    //     username: process.env.MONGO_USER,
    //     password: process.env.MONGO_PASS,
    //   },
    //   connectionName: 'hex',
    //   retryWrites: true,
    //   writeConcern: { w: 'majority' },
    // }),
  ],
  exports: [MongooseModule],
})
export class DbModule {}
