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
  userService: any;
  constructor(private readonly ProductService: ProductService) { }

  @Get('/find/:id')
  async getProduct(@Param() params): Promise<ProductDto> {
    try {
      const response = await this.ProductService.findProduct(params.id);

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Get('/listAll')
  async getAll(): Promise<ProductDto[]> {
    try {
      const response = await this.ProductService.getAll();

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Post('/createProduct')
  async createProduct(@Body() Product): Promise<ProductDto> {
    try {
      const response = await this.ProductService.create(Product);

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Put("/update-Product/:id")
  async updateProduct(@Param() params, @Body() Product): Promise<ProductDto> {
    try {
      const response = await this.ProductService.updateProduct(params.id, Product);

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Delete('remove/:id')
  async deleteProduct(@Param() params): Promise<ProductDto> {
    try {
      const response = await this.ProductService.deleteProduct(params.id);

      return response;
    } catch (error) {
      return error.message;
    }
  }
}


