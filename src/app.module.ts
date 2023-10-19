import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [PrismaModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, PrismaModule],
})
export class AppModule {}
