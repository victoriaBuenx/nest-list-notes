import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './notes-dto';

@Injectable()
export class NotesService {
    constructor(private prisma: PrismaService ) {}

    findAll(){
        return this.prisma.note.findMany({
            orderBy:{
                createdAt: 'desc'
            }
        });
    }

    create(dto: CreateNoteDto){
        return this.prisma.note.create({
            data: dto,
        });
    }

    delete (id: string){
        return this.prisma.note.delete({
            where :{
                id
            }
        });
    }

    update (id: string, dto: CreateNoteDto){
        return this.prisma.note.update({
            where: {
                id
            }, 
            data: {
                title: dto.title,
                content: dto.content
            }
        });
    }
}
