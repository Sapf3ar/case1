import React from 'react';
// import { Error } from '../api/models/reports-response.ts';

interface Error {
    description: string;
    subject: string;
    id: number;
    line: number;
    match: number;
    page: number;
}

type Props = {
    errors: Error[];
    refference: string;
};

const FileErrors = ({ errors, refference }: Props) => {
    return (
        <div>
            {errors.map((error) => {
                return <div key={error.id}>{error.description}</div>;
            })}
        </div>
    );
};

export default FileErrors;
