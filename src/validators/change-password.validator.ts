import { IsString, IsNotEmpty } from "class-validator"

export class ChangePasswordValidator {
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    newPassword: string

    @IsString()
    @IsNotEmpty()
    repeatPassword: string
}
