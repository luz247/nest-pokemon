import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
  ServeStaticModule.forRoot({
    rootPath:join(__dirname,'..','public')
  }),
  PokemonModule,
  MongooseModule.forRoot('mongodb://root:example@localhost:27017/'),
  CommonModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
