import { Injectable } from '@nestjs/common';

import { QnARepository } from '@/modules/qna/qna.repository';

@Injectable()
export class HostQnAService {
  constructor(private readonly qnaRepository: QnARepository) {}
}
