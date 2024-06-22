import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Permissions } from 'src/auth/decorators/permissions/permissions.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions/permissions.guard';
import { TokenAuthGuard } from 'src/auth/guards/token-auth/token-auth.guard';
import { Permission } from 'src/utils/enums/permissions.enum';

@Controller('pets')
@UseGuards(TokenAuthGuard, PermissionsGuard)
export class PetsController {
    constructor() {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.ADMIN_PETS, Permission.READ_PETS)
    getPets(@Req() _req: Request, @Res() res: Response): Response {
        // This is a dummy controller method to demostrate M2M token POC
        return res.json({
            msg: 'Fetching All Pets',
        });
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Permissions(Permission.ADMIN_PETS, Permission.READ_PETS)
    getPetById(@Param('id') id: string, @Req() _req: Request, @Res() res: Response): Response {
        // This is a dummy controller method to demostrate M2M token POC
        return res.json({
            msg: `Fetching Pet By Id ${id}`,
        });
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions(Permission.ADMIN_PETS, Permission.CREATE_PETS)
    createPet(@Req() _req: Request, @Res() res: Response): Response {
        // This is a dummy controller method to demostrate M2M token POC
        return res.json({
            msg: 'Creating Pet',
        });
    }

    @Patch(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    @Permissions(Permission.ADMIN_PETS, Permission.UPDATE_PETS)
    updatePet(@Param('id') id: string, @Req() _req: Request, @Res() res: Response): Response {
        // This is a dummy controller method to demostrate M2M token POC
        return res.json({
            msg: `Updating Pet By Id ${id}`,
        });
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions(Permission.ADMIN_PETS, Permission.DELETE_PETS)
    deletePet(@Param('id') id: string, @Req() _req: Request, @Res() res: Response): Response {
        // This is a dummy controller method to demostrate M2M token POC
        return res.json({
            msg: `Deleting Pet By Id ${id}`,
        });
    }
}
