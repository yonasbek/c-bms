import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'cbms',
      autoLoadEntities: true,
      synchronize: true, // Auto-migrates schema
      logging: true,
    }),
  ],
})
export class DatabaseModule {}
