// database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConnection } from './database.connection'; // Import your DatabaseConnection class

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: DatabaseConnection, // Use your DatabaseConnection provider
    }),
  ],
})
export class DatabaseModule {}
