import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { BaseController } from '../common/base.controller';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import upload from 'src/config/multer.config';

@Controller('payment')
@ApiBearerAuth() // Show auth button in Swagger
@UseGuards(JwtAuthGuard)
export class PaymentController extends BaseController<Payment> {
    constructor(private readonly paymentService: PaymentService) {
        super(paymentService);
    }

    @Post('upload/:paymentId')
    @ApiOperation({ summary: 'Upload a file' })
    @ApiResponse({ status: 200, description: 'File uploaded successfully' })
    @UseInterceptors(FileInterceptor('file', { storage: upload.storage }))
    uploadFile(@UploadedFile() file: any, @Param('paymentId') paymentId: number) {
        console.log(file);
        if (!paymentId) {
            throw new Error('Payment ID is required for the update.');
        }    // Update the contract with the new file URL or set it to null if needed
    const updateData = { file_url: file.path || null }; // Allow null if no file is uploaded
    let value = this.paymentService.update(paymentId, updateData);
    return { fileUrl: file.path, message: 'File uploaded successfully' }; // Return the file URL
  } 
    // Additional endpoints can be added here
} 