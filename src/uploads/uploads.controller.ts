import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { extname, join, parse } from 'path';
import { UploadsService } from './uploads.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  create(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadsService.create(createUploadDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the name attribute of the input field in the form
  async uploadFile(@UploadedFile() file) {
    // Handle file here, e.g., save it to disk or a database
    const uploadDir = 'C:/uploads';

    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir);
    }

    const randomValue = Math.floor(Math.random() * 10000);
    const fileExt =  extname(file.originalname);
    const parsedPath = parse(file.originalname);
    
    const fileName = `${parsedPath.name}-${randomValue}${fileExt}`;
    // const fileName = 'uploaded-file.png';

    // Create a write stream to save the file
    const filePath = await join(uploadDir, fileName);
    const writeStream = await createWriteStream(filePath);

    console.log(file, 'debug');
    await writeStream.write(file.buffer);

    // return new Promise((resolve, reject) => {
    //   writeStream.on('finish', () =>
    //     resolve({ message: 'File uploaded successfully' }),
    //   );
    //   writeStream.on('error', (error) => reject(error));
    // });

    // You can access the uploaded file via the 'file' parameter
    // console.log(file);

    writeStream.on('error', (error) => {
      console.error('Error writing the file:', error);
    });
    return { message: 'File uploaded successfully' };
  }

  @Get()
  findAll() {
    return this.uploadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadsService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadsService.remove(+id);
  }
}
