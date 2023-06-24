import axios from 'axios';
import { API_URL } from '../config';
import type { UploadFile } from 'antd';
import { ReportsResponse, UploadFileResponse } from './models';
import type { RcFile } from 'antd/es/upload/interface';

class ApiService {
    public async uploadFileList(fileList: UploadFile[]): Promise<UploadFileResponse> {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file as RcFile);
        });

        console.log(formData, fileList);

        // const response = await axios.get<UploadFileResponse>(`./mock/upload-file-response.json`);
        const response = await axios.post<UploadFileResponse>(`${API_URL}/upload`, formData);

        return response.data;
    }

    public async fetchReports(transactionId: string): Promise<ReportsResponse> {
        // const response = await axios.get<ReportsResponse>(`./reports-transaction.json`);
        const response = await axios.get<ReportsResponse>(`${API_URL}/reports/${transactionId}`);

        console.log(response.data);

        return response.data[0];
    }
}

export const ApiServiceInstanse = new ApiService();
