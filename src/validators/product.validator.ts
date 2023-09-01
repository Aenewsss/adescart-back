import { IsNotEmpty, IsString, IsEnum} from "class-validator"
import { CategoryEnum } from "src/enum/category.enum";

export class ProductValidator {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    price: string;

    @IsNotEmpty()
    @IsEnum(CategoryEnum)
    category: CategoryEnum;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    imageUrl: string;
}