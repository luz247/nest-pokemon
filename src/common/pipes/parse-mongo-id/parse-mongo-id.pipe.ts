import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {


  //metodo
  transform(value: string, metadata: ArgumentMetadata) {

    if (!isValidObjectId(value)) {
      throw new BadRequestException(`The id ivalid ${value}`)
    }
    return  value
  }
 
}
