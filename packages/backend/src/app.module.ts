import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {SanityController} from "./sanity.controller";
import {SanityService} from "./sanity.service";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ SanityController],
  providers: [ SanityService],
})
export class AppModule {}
