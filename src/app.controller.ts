import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { TokenAuthGuard } from './auth/guards/token-auth/token-auth.guard';
import { Public } from './auth/decorators/public/public.decorator';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @UseGuards(TokenAuthGuard)
    @Get('/secured')
    securedGetHello(): string {
        return this.appService.getHello();
    }

    @Public()
    @Get('/public')
    publicGetHello(): string {
        return this.appService.getHello();
    }
}
