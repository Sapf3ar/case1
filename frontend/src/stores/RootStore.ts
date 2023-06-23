import { observable, runInAction, makeAutoObservable } from 'mobx';

export interface IRootStore {
    isLoading: boolean;
}

export class RootStore implements IRootStore {
    isLoading: boolean;

    constructor() {
        makeAutoObservable(this, {
            isLoading: observable,
        });

        this.isLoading = false;
    }

    // public async fetchShopsManufactuteCount(): Promise<IShopsCount[]> {
    //     const data = await DashboardServiceInstanse.fetchShopsManufactuteCount();

    //     console.log(data);

    //     runInAction(() => {
    //         this.shopsCount = data;
    //     });

    //     return data;
    // }
}
