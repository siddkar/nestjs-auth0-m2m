import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { TokenAuthGuard } from './auth/guards/token-auth/token-auth.guard';
import { Public } from './auth/decorators/public/public.decorator';
import { PermissionsGuard } from './auth/guards/permission/permissions.guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @UseGuards(TokenAuthGuard, PermissionsGuard)
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
