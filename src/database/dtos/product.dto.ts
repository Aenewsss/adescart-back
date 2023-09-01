import { CategoryEnum } from "src/enum/category.enum";

export class ProductDto {
  name: string;
  price: string;
  category: CategoryEnum;
  description: string;
  imageUrl: string;
}
