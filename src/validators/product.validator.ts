import { IsNotEmpty, IsString, IsEnum,IsOptional} from "class-validator"
import { CategoryEnum } from "../enum/category.enum";

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

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    imageUrl: string;
}