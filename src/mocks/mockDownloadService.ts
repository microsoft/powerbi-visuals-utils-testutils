/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

// powerbi
import powerbi from "powerbi-visuals-api";
import IPromise = powerbi.IPromise;
import PrivilegeStatus = powerbi.PrivilegeStatus;

// powerbi.extensibility
import IDownloadService = powerbi.extensibility.IDownloadService;

export class MockDownloadService implements IDownloadService {
  public exportVisualsContent(content: string, fileName: string, fileType: string, fileDescription: string): IPromise<boolean> {
    return new Promise<void>((resolve, reject) => {
      resolve();
    }) as any;
  }
  public exportVisualsContentExtended(content: string, fileName: string, fileType: string, fileDescription: string): IPromise<powerbi.ExportContentResultInfo> {
    return new Promise<void>((resolve, reject) => {
      resolve();
    }) as any;
  }
  public exportStatus(): IPromise<PrivilegeStatus> {
    return new Promise<PrivilegeStatus>((resolve, reject) => {
      resolve(PrivilegeStatus.Allowed);
    }) as any;
  }
}
