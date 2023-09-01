import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDto } from '../database/dtos/product.dto';
import { ProductService } from '../services/product.service';
import { ProductValidator } from "src/validators/product.validator";

@Controller('product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) { }

  @Get('/find/:id')
  async getProduct(@Param('id') id: string): Promise<ProductDto> {
    try {
      const response = await this.ProductService.findProduct(id);

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Get('')
  async getAll(): Promise<ProductDto[]> {
    try {
      const response = await this.ProductService.getAll();

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Post('')
  async createProduct(@Body() Product: ProductValidator): Promise<ProductDto> {
    try {
      const response = await this.ProductService.create(Product);

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Put("/:id")
  async updateProduct(@Param('id') id: string, @Body() product: ProductValidator): Promise<ProductDto> {
    try {
      const response = await this.ProductService.updateProduct(id, product);

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Delete('/:id')
  async deleteProduct(@Param("id") id: string): Promise<ProductDto> {
    try {
      const response = await this.ProductService.deleteProduct(id);

      return response;
    } catch (error) {
      return error.message;
    }
  }
}


