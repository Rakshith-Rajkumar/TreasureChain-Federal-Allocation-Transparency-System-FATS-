import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  category: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  categoryId: string;
}