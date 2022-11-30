// powerbi
import powerbi from "powerbi-visuals-api";
import IPromise = powerbi.IPromise;
import PrivilegeStatus = powerbi.PrivilegeStatus;

//powerbi.extensibility
import IWebAccessService = powerbi.extensibility.IWebAccessService;

export class MockIWebAccessService implements IWebAccessService {
    public webAccessStatus(url: string): IPromise<PrivilegeStatus> {
        return new Promise<PrivilegeStatus>((resolve, rejects) => {
            resolve(PrivilegeStatus.Allowed)
        }) as any;
    }
}