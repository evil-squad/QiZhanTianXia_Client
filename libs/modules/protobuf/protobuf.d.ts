
declare module protobuf {
    export function load(filePath: string):any;
}

declare module "protobufjs" {
    export = protobuf;
}