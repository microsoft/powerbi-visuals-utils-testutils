/// <reference types="powerbi-visuals-tools" />
import powerbi from "powerbi-visuals-tools";
import ITelemetryService = powerbi.extensibility.ITelemetryService;
export declare class MockITelemetryService implements ITelemetryService {
    instanceId: string;
    trace(veType: powerbi.VisualEventType, payload?: string): void;
}
