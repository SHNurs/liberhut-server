import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post) private postRepo: typeof Post,
                private filesService: FilesService) {}

    async createPost(dto: CreatePostDto, image) {
        const filename = await this.filesService.createFile(image)
        return await this.postRepo.create({...dto, img: filename})
    }

    async getAllPosts(){
        return await this.postRepo.findAll()
    }

    async getOnePost(id: number ){
        if(!id) throw new HttpException('ID is required', HttpStatus.BAD_REQUEST)
        return await this.postRepo.findByPk(id)
    }

    async deletePost(id: number ){
        if(!id) throw new HttpException('ID is required', HttpStatus.BAD_REQUEST)
        return await this.postRepo.destroy({where: {id}})
    }

    async updatePost(dto: UpdatePostDto ){
        if(!dto.id) throw new HttpException('ID is required', HttpStatus.PARTIAL_CONTENT)
        return await this.postRepo.update(dto, {where: {id: dto.id}})
    }
}
