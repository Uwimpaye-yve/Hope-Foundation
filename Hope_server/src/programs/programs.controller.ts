import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ApplyProgramDto } from './dto/apply-program.dto';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  createProgram(@Body() programData: any) {
    return this.programsService.createProgram(programData);
  }

  @Get()
  getAllPrograms() {
    return this.programsService.getAllPrograms();
  }

  @Get('available')
  getAvailablePrograms() {
    return this.programsService.getAvailablePrograms();
  }

  @Get(':id')
  getProgramById(@Param('id') id: string) {
    return this.programsService.getProgramById(id);
  }

  @Delete(':id')
  deleteProgram(@Param('id') id: string) {
    return this.programsService.deleteProgram(id);
  }

  @Post('apply')
  applyToProgram(@Body() applyDto: ApplyProgramDto) {
    return this.programsService.applyToProgram(applyDto);
  }

  @Get('applications')
  getApplications() {
    return this.programsService.getApplications();
  }
}
