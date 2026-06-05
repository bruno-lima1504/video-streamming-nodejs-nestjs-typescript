import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoMetadataService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getVideoDuration(_videoPath: string): Promise<number> {
    return 100;
  }
}
