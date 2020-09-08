import { Client, TestSandbox } from '@loopback/testlab';
import { AccessControlApplication } from '../..';
export declare function setupApplication(fileStorageDirectory?: string): Promise<AppWithClient>;
export interface AppWithClient {
    app: AccessControlApplication;
    client: Client;
}
export declare function getSandbox(): TestSandbox;
