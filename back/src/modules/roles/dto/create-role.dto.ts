import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsArray()
    functionalityRole: CreateFunctionalityRoleDto[];
}

export class CreateFunctionalityRoleDto {
    @IsNotEmpty()
    @IsNumber()
    functionalityId: number;

    @IsNotEmpty()
    @IsArray()
    functionalityRolePermit: CreateFunctionalityRolePermitDto[];
}

export class CreateFunctionalityRolePermitDto {
    @IsNotEmpty()
    @IsNumber()
    permitId: number;
}