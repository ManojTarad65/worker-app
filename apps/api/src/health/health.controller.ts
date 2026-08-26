import { Controller, Get } from '@nestjs/common';
import { HealthCheckResponse } from '@marketplace/types';

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): HealthCheckResponse {
    return {
      status: 'ok',
    };
  }
}
