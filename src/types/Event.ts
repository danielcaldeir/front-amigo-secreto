import { z } from "zod";

export type Event = {
    id: number;
    status: boolean;
    title: string;
    description: string;
    grouped: boolean;
}

// export type EventSchema = {
//     titleField: z.ZodString().min(2, { message: "Preencha o titulo maior que 2 caracteres.", }).max(50),
//     descriptionField: z.ZodString().min(2, { message: "Preencha a descrição maior que 2 caracteres.", }).max(50),
//     groupedField: z.ZodBoolean,
//     statusField: z.ZodBoolean,
// }