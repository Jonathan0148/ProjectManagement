import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateRoleDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsArray()
    functionalityRole: UpdateFunctionalityRoleDto[];
}

export class UpdateFunctionalityRoleDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    functionalityId: number;

    @IsNotEmpty()
    @IsArray()
    functionalityRolePermit: UpdateFunctionalityRolePermitDto[];
}

export class UpdateFunctionalityRolePermitDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
    
    @IsNotEmpty()
    @IsNumber()
    permitId: number;
}