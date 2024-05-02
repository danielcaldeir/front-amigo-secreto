import { ZodError } from "zod";

export type ErrorItem = {
    field: string;
    message: string;
}

export const getErrorFromZod = (error: ZodError) => {
    const errorList: ErrorItem[] = [];
    for (let index in error.errors) {
        errorList.push({
            field: error.errors[index].path[0].toString(),
            message: error.errors[index].message
        });
    }
    return errorList;
}