import { ShowWarning } from "@/components/helpers/AlertHelpers";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableRow 
} from "@/components/ui/table";
import { Event } from "@/types/Event";
import { ItemButton } from "@/components/util/ItemButton";
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
    LinkIcon, 
    LucideIcon, 
    MessageSquareXIcon, 
    PencilIcon, 
    Trash2Icon, 
    TrashIcon 
} from "lucide-react";
import { addAdminEvent, getAdminEvent } from "@/api/admin";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { ShowButtonReset, ShowButtonSubmit } from "../helpers/ButtonHelpers";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorItem, getErrorFromZod } from "@/lib/getErrorFromZod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

type EventItemProps = {
    item: Event;
    refreshAction: () => void;
    openModal: (event: Event) => void;
}

export const EventItem = ({item, refreshAction, openModal}: EventItemProps) => {
    const handleEditButton = () => openModal(item);
    const handleDeleteButton = () => {

    }
    return (
        <Table className="border p-3 mb-3 flex flex-col items-center rounded md:flex-row">
            <TableBody>
                <TableRow>
                    <TableCell><div key={item.id}>{item.title}</div></TableCell>
                    <TableCell>
                        <div className="flex items-center gap-1 mt-2 md:flex-row">
                            {item.status && 
                                <ItemButton 
                                    IconElement={LinkIcon} 
                                    label="" 
                                    href={`/events/${item.id}`} 
                                    target="_blank" 
                                />
                            }
                            <OpenEditAlertDialog IconElement={PencilIcon} label="" onClick={handleEditButton} />
                            {/* <ItemButton IconElement={PencilIcon} label="" onClick={handleEditButton} /> */}
                            <ItemButton IconElement={Trash2Icon} label="" onClick={handleDeleteButton} />
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export const EventItemPhaceholder = () => {
    return (
        <div className="w-full h-16 border border-gray-700 rounded mb-3 
        bg-gradient-to-r from-gray-700 to-gray-950 animate-pulse">
        </div>
    );
}

export const EventItemNotFound = () => {
    return (
        <div className="text-center py-4 ">
            <ShowWarning message="Nao ha eventos cadastrados!!!"/>
        </div>
    );
}

type AddProps = {
    refreshAction: () => void;
}

const formSchema = z.object({
    titleField: z.string().min(2, { message: "Preencha o titulo maior que 2 caracteres.", }).max(50),
    descriptionField: z.string().min(2, { message: "Preencha a descrição maior que 2 caracteres.", }).max(50),
    groupedField: z.boolean(),
});

// const [titleField, setTitleField] = useState('');
// const [descriptionField, setDescriptionField] = useState('');
// const [groupedField, setGroupedField] = useState(false);

export const EventADD = ({refreshAction }: AddProps) => {
    const [titleField, setTitleField] = useState('');
    const [descriptionField, setDescriptionField] = useState('');
    const [groupedField, setGroupedField] = useState(false);
    const [error, setError] = useState<ErrorItem[]>([]);

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
        // setLoading(true);
        // setWarning(false);
        // console.log(values.password);
        // clickLogin(values.password);
    }

    const handleAddButton = async() => {
        const data = formSchema.safeParse({titleField, descriptionField, groupedField });
        if (!data.success) { return(setError(getErrorFromZod(data.error))); }

        const eventItem = await addAdminEvent({
            title: data.data.titleField,
            description: data.data.descriptionField,
            grouped: data.data.groupedField
        });
        if (eventItem) { refreshAction(); }
    }

    return (
        <Card>
            <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                        <FormLabel>Será Agrupado?</FormLabel>
                                        <FormControl>
                                        <Input 
                                            type="checkbox" 
                                            checked={groupedField} 
                                            className="w-20 h-6 mt-3" 
                                            {...field} />
                                        </FormControl>
                                        {/* <FormDescription>This is your public display name.</FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <ShowButtonReset label="Cancelar" />
                            <ShowButtonSubmit label="Adicionar" />
                        </form>
                    </Form>
                <div className="flex flex-col items-start mt-4">
                    <Label>Titulo</Label>
                    <Input 
                        value={titleField} 
                        onChange={e => setTitleField(e.target.value)} 
                        placeholder="Digite o Titulo do Evento" 
                        onError={error.find(item => item.field === 'titleField')?.message.toString}
                    />
                </div>
                <div className="flex flex-col items-start mt-4">
                    <Label>Descrição</Label>
                    <Input 
                        value={descriptionField} 
                        onChange={e => setDescriptionField(e.target.value)} 
                        placeholder="Digite a descrição do Evento" 
                        onError={error.find(item => item.field === 'descriptionField')?.message.toString}
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
                <div className="flex flex-row items-center mt-6">
                    <ShowButtonReset label="Cancelar" onClick={refreshAction}/>
                    <ShowButtonSubmit label="Adicionar" onClick={handleAddButton}/>
                </div>
            </CardContent>
        </Card>
    );
}

type AlertDialogProps = {
    IconElement: LucideIcon;
    label?: string;
    title?: string;
    onClick?: () => void;
}

export function OpenADDAlertDialog({IconElement, label, title, onClick}: AlertDialogProps) {
    const handleADDEvent = async() => {
        const ping = await getAdminEvent(2);
        console.log("ADD Event: "+ping.valueOf);
    }
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <ItemButton IconElement={IconElement} label={label} />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        <EventADD refreshAction={ ()=>{} }/>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {/* <AlertDialogFooter> */}
                    {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                    {/* <AlertDialogAction onClick={handleADDEvent}>Continue</AlertDialogAction> */}
                {/* </AlertDialogFooter> */}
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function OpenEditAlertDialog({IconElement, label, onClick}: AlertDialogProps) {
    const handleADDEvent = async() => {
        // const ping = await getAdminEvent(2);
        // console.log("ADD Event: "+ping);
    }
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <ItemButton IconElement={IconElement} onClick={onClick} label={label} />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
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