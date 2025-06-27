import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsNumber()
    roles_id: number;

    @IsNotEmpty()
    @IsString()
    names: string;

    @IsNotEmpty()
    @IsString()
    surnames: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}