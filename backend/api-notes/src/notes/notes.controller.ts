import { Controller, Get, Post, Body, Delete, Param, Patch} from '@nestjs/common';
import { NotesService } from './notes.service';
import type { CreateNoteDto } from './notes-dto';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService){}

    @Get()
    findAll(){
        return this.notesService.findAll();
    }

    @Post()
    create(@Body() dto: CreateNoteDto){
        return this.notesService.create(dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.notesService.delete(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: CreateNoteDto){
        return this.notesService.update(id, dto);
    }
}
