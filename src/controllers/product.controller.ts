import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UseGuards
} from '@nestjs/common';
import { ProductDto } from '../database/dtos/product.dto';
import { ProductService } from '../services/product.service';
import { ProductValidator } from "../validators/product.validator";
import { AuthGuard } from "../guards/auth.guard";

@Controller('product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) { }

  @Get('/:id')
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
  @UseGuards(AuthGuard)
  async createProduct(@Body() Product: ProductValidator): Promise<ProductDto> {
    try {
      const response = await this.ProductService.create(Product);

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Put("/:id")
  @UseGuards(AuthGuard)
  async updateProduct(@Param('id') id: string, @Body() product: ProductValidator): Promise<ProductDto> {
    try {
      const response = await this.ProductService.updateProduct(id, product);

      return response;
    } catch (error) {
      return error.message;
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deleteProduct(@Param("id") id: string): Promise<ProductDto> {
    try {
      const response = await this.ProductService.deleteProduct(id);

      return response;
    } catch (error) {
      return error.message;
    }
  }
}


