import { Answer } from './answer';

export class Result<T, J> extends Answer {
    item: T;
    itemOptional: J;
}
