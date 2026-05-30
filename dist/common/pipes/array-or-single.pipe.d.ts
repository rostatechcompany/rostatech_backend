import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ArrayOrSinglePipe<T> implements PipeTransform {
    private readonly dtoClass;
    constructor(dtoClass: new () => T);
    transform(value: any, _metadata: ArgumentMetadata): Promise<T | T[]>;
}
