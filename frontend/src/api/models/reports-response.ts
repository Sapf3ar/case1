export interface ReportsResponse {
    checkedCount: number;
    errorsCount: number;
    filesCount: number;
    id: number;
    matchCount: number;
    reference: string;
    files: ProcessedFile[];
}

export interface ProcessedFile {
    id: number;
    filename: string;
    isCheck: boolean;
    errors: Error[];
}

export interface Error {
    description: string;
    subject: string;
    id: number;
    line: number;
    match: number;
    page: number;
}
