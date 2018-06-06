export interface RgbColor {
    R: number;
    G: number;
    B: number;
    A?: number;
}
export declare function getSolidColorStructuralObject(color: string): any;
export declare function assertColorsMatch(actual: string, expected: string, invert?: boolean): boolean;
export declare function parseColorString(color: string): RgbColor;
