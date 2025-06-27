import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { Order } from "../constanst/config-globals";


export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.DESC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 10000,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly take: number = 10;

  @IsOptional()
  @IsString()
  readonly term?: string = "";

  @IsOptional()
  @IsString()
  initialDate?: string = "";

  @IsOptional()
  @IsString()
  endDate?: string = "";

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @IsOptional()
  @IsString()
  filterBy?: string

}