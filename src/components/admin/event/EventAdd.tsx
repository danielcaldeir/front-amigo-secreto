import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { InputField } from "@/components/helpers/InputHelpers";
import { 
    ButtonDisabled, 
    ItemButton, 
    ShowButton, 
    ShowButtonSubmit 
} from "@/components/helpers/ButtonHelpers";
import { 
    Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger, 
    DialogClose
  } from "@/components/ui/dialog";
import { useState } from "react";
import { addAdminEvent } from "@/api/admin";
import { LucideIcon } from "lucide-react";
import { z } from "zod";
import { ErrorItem, getErrorFromZod } from "@/lib/getErrorFromZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type AddProps = {
    refreshAction: () => void;
}

const formSchema = z.object({
    titleField: z.string().min(2, { message: "Preencha o titulo maior que 2 caracteres.", }).max(50),
    descriptionField: z.string().min(2, { message: "Preencha a descrição maior que 2 caracteres.", }).max(50),
    groupedField: z.boolean(),
});


export const EventADD = ({ refreshAction }: AddProps) => {
    const [titleField, setTitleField] = useState('');
    const [descriptionField, setDescriptionField] = useState('');
    const [groupedField, setGroupedField] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorItem[]>([]);

    const handleAddButton = async() => {
        setError([]);
        const data = formSchema.safeParse({titleField, descriptionField, groupedField });
        if (!data.success) { return(setError(getErrorFromZod(data.error))); }

        setLoading(true);
        const eventItem = await addAdminEvent({
            title: data.data.titleField,
            description: data.data.descriptionField,
            grouped: data.data.groupedField
        });
        setLoading(false);
        if (eventItem) { refreshAction(); }
    }

    return (
        <Card>
            <CardContent>
                <div className="flex flex-col items-start mt-4">
                    <Label>Titulo</Label>
                    <InputField 
                        value={titleField} 
                        onChange={e => setTitleField(e.target.value)} 
                        placeholder="Digite o Titulo do Evento" 
                        disabled={loading}
                        errorMessage={error.find(item => item.field === 'titleField')?.message} 
                    />
                </div>
                <div className="flex flex-col items-start mt-4">
                    <Label>Descrição</Label>
                    <InputField 
                        value={descriptionField} 
                        onChange={e => setDescriptionField(e.target.value)} 
                        placeholder="Digite a descrição do Evento" 
                        disabled={loading}
                        errorMessage={error.find(item => item.field === 'descriptionField')?.message} 
                    />
                </div>
                <div className="flex flex-row items-start mt-4">
                    <Label>Será Agrupado?</Label>
                    <Input 
                        type="checkbox" 
                        checked={groupedField} 
                        onChange={e => setGroupedField(!groupedField)} 
                        className="w-20 h-6 mt-3" 
                        onError={error.find(item => item.field === 'groupedField')?.message.toString} 
                    />
                </div>
                <div className="flex flex-row items-center mt-6 m-3">
                    <ShowButton label="Cancelar" onClick={refreshAction} />
                    {loading && <ButtonDisabled /> }
                    {!loading && <ShowButtonSubmit label="Adicionar" onClick={handleAddButton} /> }
                </div>
            </CardContent>
        </Card>
    );
}

type AddAlertDialogProps = {
    IconElement: LucideIcon;
    label?: string;
    title?: string;
    onClick?: () => void;
    refreshAction: () => void;
}

export function OpenADDAlertDialog({IconElement, label, title, onClick, refreshAction}: AddAlertDialogProps) {
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
        <Dialog>
            <DialogTrigger asChild>
                <ItemButton IconElement={IconElement} onClick={onClick} label={label} />
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>
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
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <ShowButton label="Resetar" onClick={refreshAction} />
                            </DialogClose>
                            {/* <AlertDialogCancel>Resetar</AlertDialogCancel> */}
                            {/* <AlertDialogAction>Adicionar</AlertDialogAction> */}
                            {loading && <ButtonDisabled /> }
                            {!loading && <ShowButtonSubmit label="Adicionar" /> }
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}