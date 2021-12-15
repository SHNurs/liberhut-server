import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('img'))
    createPost(@Body() dto: CreatePostDto,
               @UploadedFile() image) {
        return this.postService.createPost(dto, image)
    }

    @Get()
    getAllPosts(){
        return this.postService.getAllPosts()
    }

    @Get(':id')
    getOnePost(@Param('id') id: string ){
        return this.postService.getOnePost(+id)
    }

    @Delete(':id')
    deletePost(@Param('id') id: string ){
        return this.postService.deletePost(+id)
    }

    @Put()
    updatePost(@Body() dto: UpdatePostDto ){
        return this.postService.updatePost(dto)
    }
}
