import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../database/schemas/product.schema';
import {ProductDto } from '../database/dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private ProductModel: Model<ProductDocument>) {}

  async create(Product: ProductDto): Promise<ProductDto> {
    const newProduct = new this.ProductModel(Product);
    return newProduct.save();
  }

  async findProduct(id: string): Promise<ProductDto> {
    return await this.ProductModel.findById(id);
  }

  async getAll(): Promise<ProductDto[]> {
    return await this.ProductModel.find();
  }

  async updateProduct(id: string, product: ProductDto): Promise<ProductDto> {
    const updated = await this.ProductModel.findByIdAndUpdate(id, product, {new: true});
    return updated.save();
  }

  async deleteProduct(id: string): Promise<ProductDto> {
    return await this.ProductModel.findByIdAndDelete(id);
  }
}
