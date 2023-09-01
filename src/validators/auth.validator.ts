import { IsString, IsNotEmpty } from "class-validator"

export class AuthValidator {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}