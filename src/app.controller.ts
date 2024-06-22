import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public/public.decorator';
import { TokenAuthGuard } from './auth/guards/token-auth/token-auth.guard';
import { PermissionsGuard } from './auth/guards/permissions/permissions.guard';

@Controller()
@UseGuards(TokenAuthGuard, PermissionsGuard)
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/public')
    @Public()
    publicGetHello(): string {
        // This controller will demostrate an example of Public route
        return this.appService.getHello();
    }
}
