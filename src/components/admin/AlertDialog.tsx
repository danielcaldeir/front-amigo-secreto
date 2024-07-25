import { addAdminEvent, getAdminEvent } from "@/api/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { 
    Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { ButtonDisabled, ItemButton, ShowButtonSubmit } from "@/components/helpers/ButtonHelpers";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Event } from "@/types/Event";
import { EventEdit } from "@/components/admin/EventModal";

type AlertDialogProps = {
    IconElement: LucideIcon;
    event?: Event;
    label?: string;
    title?: string;
    onClick?: () => void;
    refreshAction: () => void;
}

const formSchema = z.object({
    titleField: z.string().min(2, { message: "Preencha o titulo maior que 2 caracteres.", }).max(50),
    descriptionField: z.string().min(2, { message: "Preencha a descrição maior que 2 caracteres.", }).max(50),
    groupedField: z.boolean(),
});

export function OpenADDAlertDialog({IconElement, label, title, onClick, refreshAction}: AlertDialogProps) {
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<ErrorItem[]>([]);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            titleField: "",
            descriptionField: "",
            groupedField: false,
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        setLoading(true);
        clickAdd(values);
    }

    const clickAdd = async(data: z.infer<typeof formSchema>) => {
        // setError([]);
        // const data = formSchema.safeParse({titleField, descriptionField, groupedField });
        // if (!data.success) { return(setError(getErrorFromZod(data.error))); }

        const eventItem = await addAdminEvent({
            title: data.titleField,
            description: data.descriptionField,
            grouped: data.groupedField
        });
        setLoading(false);
        if (eventItem) { refreshAction(); }
    }
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <ItemButton IconElement={IconElement} onClick={onClick} label={label} />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <AlertDialogHeader>
                            <AlertDialogTitle>{title}</AlertDialogTitle>
                            <AlertDialogDescription>
                                <FormField 
                                    control={form.control} 
                                    name="titleField"
                                    render={({ field }) => ( 
                                        <FormItem> 
                                            <FormLabel>Titulo</FormLabel> 
                                            <FormControl> 
                                            <Input 
                                                type="text" 
                                                placeholder="Digite o Titulo do Evento" 
                                                className="outline-none bg-gray-300 text-white" 
                                                {...field} /> 
                                            </FormControl> 
                                            {/* <FormDescription>This is your public display name.</FormDescription>  */}
                                            <FormMessage /> 
                                        </FormItem> 
                                    )} 
                                /> 
                                <FormField 
                                    control={form.control}
                                    name="descriptionField"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descrição</FormLabel>
                                            <FormControl>
                                            <Input 
                                                type="text" 
                                                placeholder="Digite a descrição do Evento" 
                                                className="outline-none bg-gray-300 text-white" 
                                                {...field} />
                                            </FormControl>
                                            {/* <FormDescription>This is your public display name.</FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={form.control}
                                    name="groupedField"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Checkbox 
                                                    checked={field.value} 
                                                    onCheckedChange={field.onChange} 
                                                />
                                                {/* <Input type="checkbox" checked={groupedField} className="w-20 h-6 mt-3" {...field} /> */}
                                            </FormControl>
                                            <FormLabel>Será Agrupado?</FormLabel>
                                            {/* <FormDescription>This is your public display name.</FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Resetar</AlertDialogCancel>
                            {/* <AlertDialogAction>Adicionar</AlertDialogAction> */}
                            {loading && <ButtonDisabled /> }
                            {!loading && <ShowButtonSubmit label="Adicionar" /> }
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function OpenEditAlertDialog({IconElement, event, label, title, onClick, refreshAction}: AlertDialogProps) {
    const handleADDEvent = async() => {
        const ping = await getAdminEvent(2);
        console.log("ADD Event: "+ping);
    }
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <ItemButton IconElement={IconElement} onClick={onClick} label={label} />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        <EventEdit event={event} refreshAction={refreshAction} />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleADDEvent}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}