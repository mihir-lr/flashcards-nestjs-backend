// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema'; // Import User and UserSchema
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    DatabaseModule,
  ], // Provide UserSchema
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Export UserService if needed
})
export class UserModule {}
