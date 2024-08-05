"use client"

import { ErrorItem, getErrorFromZod } from "@/lib/getErrorFromZod";
import { Event } from "@/types/Event";
import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ButtonDisabled, ItemButton, ShowButton, ShowButtonSubmit } from "@/components/helpers/ButtonHelpers";
import { Input } from "@/components/ui/input";
import { ModalTab } from "@/types/modalScreens";
import { LucideIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editAdminEvent } from "@/api/admin";
import { Checkbox } from "@/components/ui/checkbox";
import { InputField } from "@/components/helpers/InputHelpers";

type EditProps = {
    event: Event | undefined;
    refreshAction: () => void;
}

export const EventEdit = ({ event, refreshAction }: EditProps) => {
    const [tab, setTab] = useState<ModalTab>('info');

    if(!event) return null;

    // const handleAddButton = async() => {
    //     setError([]);
    //     const data = formSchema.safeParse({titleField, descriptionField, groupedField });
    //     if (!data.success) { return(setError(getErrorFromZod(data.error))); }
    //     setLoading(true);
    //     const eventItem = await addAdminEvent({
    //         title: data.data.titleField,
    //         description: data.data.descriptionField,
    //         grouped: data.data.groupedField
    //     });
    //     setLoading(false);
    //     if (eventItem) { refreshAction(); }
    // }

    return (
        <>
        <Card>
            <CardContent>
                <div className="flex text-center border-b border-gray-500 cursor-pointer">
                  <div 
                    onClick={() => setTab('info')} 
                    className={`flex-1 p-3 hover:bg-gray-700 ${tab=='info' ? 'bg-gray-600' : ''}`} 
                  >Informacoes</div>
                  <div 
                    onClick={() => setTab('groups')} 
                    className={`flex-1 p-3 hover:bg-gray-700 ${tab=='groups' ? 'bg-gray-600' : ''}`} 
                  >Grupos</div>
                  <div 
                    onClick={() => setTab('people')} 
                    className={`flex-1 p-3 hover:bg-gray-700 ${tab=='people' ? 'bg-gray-600' : ''}`} 
                  >Pessoas</div>
                </div>
                <div>
                    {tab === 'info'   && <TabInfo event={event} refreshAction={refreshAction} />}
                    {tab === 'groups' && <TabGroups event={event} refreshAction={refreshAction} />}
                    {tab === 'people' && <TabPeople event={event} refreshAction={refreshAction} />}
                </div>
            </CardContent>
        </Card>
        
      </>
    );
}

type TabProps = {
  event: Event | undefined;
  refreshAction: () => void;
}

export const TabInfo = ({ event, refreshAction }: TabProps) => {
  const [loading, setLoading] = useState(false);
  const [titleField, setTitleField] = useState(event?.title);
  const [descriptionField, setDescriptionField] = useState(event?.description);
  const [groupedField, setGroupedField] = useState(event?.grouped);
  const [statusField, setStatusField] = useState(event?.status);
  const [error, setError] = useState<ErrorItem[]>([]);

  if(!event) return null;

  useEffect(() => {
    setError([]);
    const data = formSchema.safeParse({ titleField, descriptionField, groupedField, statusField });
    if (!data.success){ setError(getErrorFromZod(data.error)) }
  },[titleField, descriptionField, groupedField, statusField]);

  const handleSaveButton = async() => {

      setLoading(true);
      // const eventItem = await deleteAdminEvent(event.id);
      setLoading(false);
      // if (eventItem) { refreshAction(); }
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
        <div className="flex flex-col ">
          <div className="flex items-start mt-4">
              <Label>Agrupar Sorteio?</Label>
              <Input 
                  type="checkbox" 
                  checked={groupedField} 
                  onChange={e => setGroupedField(!groupedField)} 
                  className="w-20 h-6 mt-3" 
                  // errorMessage={error.find(item => item.field === 'groupedField')?.message.toString} 
              />
          </div>
          <div className="flex items-start mt-4">
              <Label>Evento Liberado?</Label>
              <Input 
                  type="checkbox" 
                  checked={statusField} 
                  onChange={e => setStatusField(!statusField)} 
                  className="w-20 h-6 mt-3" 
                  // errorMessage={error.find(item => item.field === 'statusField')?.message.toString} 
              />
          </div>
        </div>
        <div className="flex flex-row items-center mt-6">
            <ShowButton label="Cancelar" onClick={refreshAction} />
            {loading && <ButtonDisabled /> }
            {!loading && <ShowButtonSubmit label="Adicionar" onClick={handleSaveButton} /> }
        </div>
      </CardContent>
    </Card>
  );
}

const formSchema = z.object({
  titleField: z.string().min(2, { message: "Preencha o titulo maior que 2 caracteres.", }).max(50),
  descriptionField: z.string().min(2, { message: "Preencha a descrição maior que 2 caracteres.", }).max(50),
  groupedField: z.boolean(),
  statusField: z.boolean(),
});

export const TabGroups = ({ event, refreshAction }: TabProps) => {
  const [loading, setLoading] = useState(false);

  if(!event) return null;

  // const handleConfirmButton = async() => {
  //     setLoading(true);
  //     const eventItem = await deleteAdminEvent(event.id);
  //     setLoading(false);
  //     if (eventItem) { refreshAction(); }
  // }

  return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>TabGroups!</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="flex text-center border-b border-gray-500 cursor-pointer">
              TabGroups Evento?
              </div>
              <div className="flex flex-row items-center mt-6">
                  <ShowButton label="Cancelar" onClick={refreshAction} />
                  {loading && <ButtonDisabled /> }
                  {!loading && <ShowButtonSubmit label="Confirmar" /> }
              </div>
          </CardContent>
        </Card>
      </>
  );
}

export const TabPeople = ({ event, refreshAction }: TabProps) => {
  const [loading, setLoading] = useState(false);

  if(!event) return null;

  // const handleConfirmButton = async() => {
  //     setLoading(true);
  //     const eventItem = await deleteAdminEvent(event.id);
  //     setLoading(false);
  //     if (eventItem) { refreshAction(); }
  // }

  return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>TabPeople!</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="flex text-center border-b border-gray-500 cursor-pointer">
              TabPeople Evento?
              </div>
              <div className="flex flex-row items-center mt-6">
                  <ShowButton label="Cancelar" onClick={refreshAction} />
                  {loading && <ButtonDisabled /> }
                  {!loading && <ShowButtonSubmit label="Confirmar" /> }
              </div>
          </CardContent>
        </Card>
      </>
  );
}

export const TabInfoDialog = ({ event, refreshAction }: TabProps) => {
  const [loading, setLoading] = useState(false);
  // const [titleField, setTitleField] = useState(event?.title);
  // const [descriptionField, setDescriptionField] = useState(event?.description);
  // const [groupedField, setGroupedField] = useState(event?.grouped);
  // const [statusField, setStatusField] = useState(event?.status);
  const [error, setError] = useState<ErrorItem[]>([]);

  if(!event) return null;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        titleField: event?.title,
        descriptionField: event?.description,
        groupedField: event?.grouped,
        statusField: event?.status,
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

    const eventItem = await editAdminEvent(event.id, {
        title: data.titleField,
        description: data.descriptionField,
        grouped: data.groupedField,
        status: data.statusField
    });
    setLoading(false);
    if (eventItem) { refreshAction(); }
  }

  // const handleConfirmButton = async() => {
  //     setLoading(true);
  //     const eventItem = await deleteAdminEvent(event.id);
  //     setLoading(false);
  //     if (eventItem) { refreshAction(); }
  // }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* <CardDescription> */}
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
                              className="outline-none bg-gray-500 text-white" 
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
                              className="outline-none bg-gray-500 text-white" 
                              {...field} />
                          </FormControl>
                          {/* <FormDescription>This is your public display name.</FormDescription> */}
                          <FormMessage />
                      </FormItem>
                    )}
                />
                <Card className="flex flex-row mb-5 mt-3">
                  <Card className="flex-1">
                    <FormField 
                        control={form.control}
                        name="groupedField"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel>Agrupar Sorteio?</FormLabel>
                              <FormControl>
                                  <Checkbox 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange} 
                                  />
                                  {/* <Input type="checkbox" checked={groupedField} className="w-20 h-6 mt-3" {...field} /> */}
                              </FormControl>
                              {/* <FormDescription>This is your public display name.</FormDescription> */}
                              <FormMessage />
                          </FormItem>
                        )}
                    />
                  </Card>
                  <Card className="flex-1">
                    <FormField 
                        control={form.control}
                        name="statusField"
                        render={({ field }) => (
                          <FormItem>
                              <FormLabel>Evento Liberado?</FormLabel>
                              <FormControl>
                                  <Checkbox 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange} 
                                  />
                                  {/* <Input type="checkbox" checked={groupedField} className="w-20 h-6 mt-3" {...field} /> */}
                              </FormControl>
                              {/* <FormDescription>This is your public display name.</FormDescription> */}
                              <FormMessage />
                          </FormItem>
                        )}
                    />
                  </Card>
                </Card>
                
            {/* </CardDescription> */}
            <Card className="flex flex-row flex-1 items-center mt-6">
              {/* <ShowButton label="Resetar" onClick={refreshAction} /> */}
              {loading && <ButtonDisabled /> }
              {!loading && <ShowButtonSubmit label="Salvar" /> }
            </Card>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

type EditAlertDialogProps = {
  IconElement: LucideIcon;
  event?: Event;
  label?: string;
  title?: string;
  onClick?: () => void;
  refreshAction: () => void;
}

export function OpenEditAlertDialog({IconElement, event, label, title, onClick, refreshAction}: EditAlertDialogProps) {
  // const handleADDEvent = async() => {
  //     const ping = await getAdminEvent(2);
  //     console.log("ADD Event: "+ping);
  // }
  
  return (
      <Dialog>
          <DialogTrigger asChild>
              <ItemButton IconElement={IconElement} onClick={onClick} label={label} />
          </DialogTrigger>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                  <DialogDescription>
                    <Tabs defaultValue="info" className="w-[400px]">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="info">info</TabsTrigger>
                        <TabsTrigger value="groups">groups</TabsTrigger>
                        <TabsTrigger value="people">people</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="info">
                        <TabInfoDialog event={event} refreshAction={refreshAction} />
                      </TabsContent>
                      
                      <TabsContent value="groups">
                        <Card>
                          <CardHeader>
                            <CardTitle>Groups</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="space-y-1">
                              <Label htmlFor="name">Name</Label>
                              <Input id="name" defaultValue="Pedro Duarte" />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="username">Username</Label>
                              <Input id="username" defaultValue="@peduarte" />
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button>Save changes</Button>
                          </CardFooter>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="people">
                        <Card>
                          <CardHeader>
                            <CardTitle>People</CardTitle>
                            {/* <CardDescription> */}
                              {/* Change your password here. */}
                            {/* </CardDescription> */}
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="space-y-1">
                              <Label htmlFor="current">Current password</Label>
                              <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="new">New password</Label>
                              <Input id="new" type="password" />
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button>Save password</Button>
                          </CardFooter>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                  {/* <DialogCancel >Cancel</DialogCancel> */}
                  {/* <DialogAction >Continue</DialogAction> */}
              </DialogFooter>
          </DialogContent>
      </Dialog>
  );
}