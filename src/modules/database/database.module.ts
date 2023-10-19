import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
