import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '@forge-fit/exercises-api';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  getConfiguration(): Configuration {
    return new Configuration({
      baseOptions: {
        headers: {
          'X-RapidAPI-Key': this.configService.get<string>('RAPID_API_KEY'),
        },
      },
    });
  }
}
