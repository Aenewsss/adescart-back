import { IsString, IsNotEmpty } from "class-validator"

export class ChangePasswordLoginValidator {
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    newPassword: string

    @IsString()
    @IsNotEmpty()
    currentPassword: string
}
