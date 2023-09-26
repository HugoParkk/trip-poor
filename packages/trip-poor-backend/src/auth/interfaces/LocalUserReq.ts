import { ApiProperty } from '@nestjs/swagger';

export class LocalUserReq {
  @ApiProperty({
    description: '암호화 된 계정 정보',
    default: 'asdfasdfsadfadf',
  })
  value: string;
}
