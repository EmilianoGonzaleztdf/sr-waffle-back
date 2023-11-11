export class CreateProductDto {
  readonly bar_code: string;
  readonly name : string;
  readonly description : string;
  readonly imgURL : string;
  readonly price : number;
  readonly status : boolean;
}
