import { observable, runInAction, makeAutoObservable } from 'mobx';

export interface IRootStore {
    isLoading: boolean;
    reportUid: string;
}

export class RootStore implements IRootStore {
    isLoading: boolean;
    reportUid: string;

    constructor() {
        makeAutoObservable(this, {
            isLoading: observable,
        });

        this.isLoading = false;
        this.reportUid = '';
    }

    public setReportId(reportUid: string) {
        runInAction(() => {
            this.reportUid = reportUid;
        });
    }
}
