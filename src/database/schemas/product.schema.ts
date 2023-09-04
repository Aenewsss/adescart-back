import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CategoryEnum } from "../../enum/category.enum";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  price: string;

  @Prop({ required: true, type: String })
  category: CategoryEnum;

  @Prop({ type: String })
  description: string;

  @Prop({ required: true, type: String })
  imageUrl: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
