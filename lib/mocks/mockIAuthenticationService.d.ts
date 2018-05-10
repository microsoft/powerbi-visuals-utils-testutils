/// <reference types="powerbi-visuals-tools" />
import IAuthenticationService = powerbi.extensibility.IAuthenticationService;
export declare class MockIAuthenticationService implements IAuthenticationService {
    private token;
    constructor(token: string);
    getAADToken(visualId?: string): powerbi.IPromise<string>;
}
