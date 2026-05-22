import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpClient } from '@sharedModule/http-client/client/http.client-service';

@Module({
  imports: [HttpModule],
  providers: [HttpClient],
  exports: [HttpClient],
})
export class HttpClientModule {}
