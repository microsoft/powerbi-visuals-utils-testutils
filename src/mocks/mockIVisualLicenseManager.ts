// powerbi
import powerbi from "powerbi-visuals-api";
import IPromise = powerbi.IPromise;
import LicenseNotificationType = powerbi.LicenseNotificationType;
import ServicePlanState = powerbi.ServicePlanState;

//powerbi.extensibility
import IVisualLicenseManager = powerbi.extensibility.IVisualLicenseManager;

//powerbi.extensibility.visual
import visual = powerbi.extensibility.visual;

export class MockIVisualLicenseManager implements IVisualLicenseManager {
    public getAvailableServicePlans(): IPromise<visual.LicenseInfoResult> {
        return new Promise<visual.LicenseInfoResult>((resolve, reject) => {
            const result = {
                plans: [{
                    spIdentifier: "spIdentifier",
                    state: ServicePlanState.Active
                }],
                isLicenseUnsupportedEnv: false,
                isLicenseInfoAvailable: true,
            }
            resolve(result);
        }) as any;
    }
    public notifyLicenseRequired(notificationType: LicenseNotificationType): IPromise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        }) as any;
    }
    public notifyFeatureBlocked(tooltip: string): IPromise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(false);
        }) as any;
    }
    public clearLicenseNotification(): IPromise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        }) as any;
    }
}