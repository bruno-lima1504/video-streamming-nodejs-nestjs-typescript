/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import fs from 'fs';
import request from 'supertest';
import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  jest,
} from '@jest/globals';
import { VideoRepository } from '@src/persistence/repository/video.repository';
import { ContentManagementService } from '@src/core/service/content-management.service';

describe('ContentController (e2e)', () => {
  let module: TestingModule;
  let app: INestApplication;
  let videoRepository: VideoRepository;
  let contentManagementService: ContentManagementService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    contentManagementService = module.get<ContentManagementService>(
      ContentManagementService,
    );
    videoRepository = module.get<VideoRepository>(VideoRepository);
  });

  beforeEach(() => {
    jest
      .useFakeTimers({ advanceTimers: true })
      .setSystemTime(new Date('2023-01-01'));
  });

  afterEach(async () => {
    await videoRepository.deleteAll();
  });

  afterAll(async () => {
    await module.close();
    fs.rmSync('./uploads', { recursive: true, force: true });
  });

  describe('/stream/:videoId (GET)', () => {
    it('streams a video', async () => {
      const createContent = await contentManagementService.createContent({
        title: 'Test Video',
        description: 'This a test video',
        url: './test/fixtures/sample.mp4',
        thumbnailUrl: './test/fixtures/sample.jpg',
        sizeInKb: 1430145,
      });

      const fileSize = 1430145;
      const range = `bytes=0-${fileSize - 1}`;

      const response = await request(app.getHttpServer())
        .get(`/stream/${createContent.getMedia()?.getVideo().getId()}`)
        .set('Range', range)
        .expect(HttpStatus.PARTIAL_CONTENT);

      expect(response.headers['content-range']).toBe(
        `bytes 0-${fileSize - 1}/${fileSize}`,
      );

      expect(response.headers['accept-ranges']).toBe('bytes');
      expect(response.headers['content-length']).toBe(String(fileSize));
      expect(response.headers['content-type']).toBe('video/mp4');
    });

    it('returns 404 for non existing video', async () => {
      await request(app.getHttpServer())
        .get('/stream/00000000-0000-0000-0000-000000000000')
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
