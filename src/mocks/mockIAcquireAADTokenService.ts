import powerbi from "powerbi-visuals-api";
import IAcquireAADTokenService = powerbi.extensibility.IAcquireAADTokenService;
import AcquireAADTokenResult = powerbi.extensibility.AcquireAADTokenResult;
import PrivilegeStatus = powerbi.PrivilegeStatus;

export class MockIAcquireAADTokenService implements IAcquireAADTokenService {
    acquireAADToken(): powerbi.IPromise<powerbi.extensibility.AcquireAADTokenResult> {
        return new Promise<AcquireAADTokenResult>((resolve) => {
            const token: AcquireAADTokenResult = { accessToken: undefined };
            resolve(token);
        }) as any;
    }

    acquireAADTokenstatus(): powerbi.IPromise<powerbi.PrivilegeStatus> {
        return new Promise<PrivilegeStatus>((resolve) => {
            resolve(PrivilegeStatus.Allowed);
        }) as any;
    }
}
