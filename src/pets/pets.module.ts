import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';

@Module({
    controllers: [PetsController],
    providers: [],
})
export class PetsModule {}
