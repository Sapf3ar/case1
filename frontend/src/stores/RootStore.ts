import { observable, runInAction, makeAutoObservable } from 'mobx';
import { ReportsResponse } from '../api/models';
import { ApiServiceInstanse } from '../api/ApiService';

type selectedFileKey = number;

export interface IRootStore {
    isLoading: boolean;
    reportUid: string;
    selectedFiles: selectedFileKey[];

    report?: ReportsResponse;

    setReportId(reportUid: string): void;
}

export class RootStore implements IRootStore {
    isLoading: boolean;
    reportUid: string;
    selectedFiles: selectedFileKey[];
    report?: ReportsResponse;

    constructor() {
        makeAutoObservable(this, {
            isLoading: observable,
            report: observable,
        });

        this.isLoading = false;
        this.reportUid = '';
        this.selectedFiles = [];
    }

    public setReportId(reportUid: string) {
        runInAction(() => {
            this.reportUid = reportUid;
        });
    }

    public fetchReports = async (transactionId: string) => {
        this.isLoading = true;

        const report = await ApiServiceInstanse.fetchReports(transactionId);

        runInAction(() => {
            this.report = report;
            this.isLoading = false;
        });
    };

    public setSelectedFile = (fileId: selectedFileKey) => {
        runInAction(() => {
            this.selectedFiles = [...this.selectedFiles, fileId];
        });
    };
}
