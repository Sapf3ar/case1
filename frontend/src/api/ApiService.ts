import axios, { AxiosResponse, ResponseType } from 'axios';
import { API_URL } from '../config';
import type { UploadFile } from 'antd';
import { UploadFileResponse } from './models';
import type { RcFile } from 'antd/es/upload/interface';

class ApiService {
    public async uploadFileList(fileList: UploadFile[]): Promise<UploadFileResponse> {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file as RcFile);
        });

        console.log(formData, fileList);

        const response = await axios.get(`./mock/upload-file-response.json`);
        // const response = await axios.post<UploadFileResponse>(`${API_URL}/upload`, formData);

        return response.data;
    }
}

export const ApiServiceInstanse = new ApiService();
