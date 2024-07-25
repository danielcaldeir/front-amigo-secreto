// import { addAdminEvent, getAdminEvent } from "@/api/admin";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { LucideIcon } from "lucide-react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
import { z } from "zod";
// import { ButtonDisabled, ItemButton, ShowButtonSubmit } from "@/components/helpers/ButtonHelpers";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Event } from "@/types/Event";
// import { EventEdit } from "@/components/admin/EventModal";

const formSchema = z.object({
    titleField: z.string().min(2, { message: "Preencha o titulo maior que 2 caracteres.", }).max(50),
    descriptionField: z.string().min(2, { message: "Preencha a descrição maior que 2 caracteres.", }).max(50),
    groupedField: z.boolean(),
});


