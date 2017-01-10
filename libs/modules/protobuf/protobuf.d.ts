
declare module protobuf {
    export function load(filename:string, contents: any, options:any, callback:any):any;
    // export class Field{
    //     public constructor(name,id,type);
    // }
    export class Type{
         public constructor();
     }
    export class Message{
         public constructor();
     }
}

declare module "protobufjs" {
    export = protobuf;
}