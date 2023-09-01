import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDto } from '../dtos/product.dto';
import { ProductService } from '../services/product.service';

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
  async createProduct(@Body() Product: ProductDto): Promise<ProductDto> {
    try {
      const response = await this.ProductService.create(Product);

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Put("/:id")
  async updateProduct(@Param('id') id: string, @Body() Product: ProductDto): Promise<ProductDto> {
    try {
      const response = await this.ProductService.updateProduct(id, Product);

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


