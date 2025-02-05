declare module 'nillion-sv-wrappers' {
    // export function initialize(config: any): void;
    // export function wrapFunction(fn: Function): Function;
    // export function unwrapFunction(fn: Function): Function;
    // export function isWrapped(fn: Function): boolean;
    export class SecretVaultWrapper {
      constructor(
        nodes: { url: string; did: string }[],
        orgCredentials: { secretKey: string; orgDid: string },
        schemaId?: string
      );
      init(): Promise<NilQLWrapper>;
      createSchema(schema: any, collectionName: string): Promise<any>;
      writeToNodes(data: any): Promise<any>;
      readFromNodes(query: any): Promise<any>;
    }

    export class NilQLWrapper {
      createSchema(schema: any, collectionName: string): Promise<any>;
      init(): Promise<void>;
      encrypt(data: any): Promise<Array>;
      decrypt(data: any): Promise<any>;
      promiseAndAllot(data: any): Promise<any>;
      unify(data: any): Promise<object | Array<object>>;
    }
}