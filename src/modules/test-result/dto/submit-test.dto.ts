import { ApiProperty } from '@nestjs/swagger';

export class SubmitTestDto {
  @ApiProperty({ description: '用户ID', example: '60d0fe4f5311236168a109ca' })
  userId: string;

  @ApiProperty({ description: '问卷ID', example: '60d0fe4f5311236168a109cb' })
  questionnaireId: string;

  @ApiProperty({ 
    description: '答案列表', 
    example: [{ questionId: '60d0fe4f5311236168a109cc', optionId: '60d0fe4f5311236168a109cd' }]
  })
  answers: Array<{ questionId: string; optionId: string }>;
}
