import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';

dotenv.config(); // .env 파일을 로드

@Injectable()
export class S3Service {
  private readonly s3: S3Client;
  private readonly bucketName: string = process.env.AWS_BUCKET_NAME;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    console.log(process.env.AWS_ACCESS_KEY_ID);
    console.log(process.env.AWS_SECRET_ACCESS_KEY);
    const fileKey = `${uuidv4()}-${file.originalname}`;
    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ACL: ObjectCannedACL.public_read, // 파일을 공개하려면 'public-read'로 설정합니다.
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);

    try {
      const data = await this.s3.send(command);
      return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }
}
