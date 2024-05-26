import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { config } from './config/configuration';
import { PetsModule } from './pets/pets.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        AuthModule,
        PetsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
