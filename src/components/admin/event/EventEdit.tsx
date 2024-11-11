"use client"

import { Event } from "@/types/Event";
import { useState } from "react";
import { 
  Card, 
  CardContent, 
} from "@/components/ui/card";
import { ButtonDisabled, ShowButton, ShowButtonSubmit } from "@/components/helpers/ButtonHelpers";
import { Input } from "@/components/ui/input";
import { ModalTab } from "@/types/modalScreens";
import { z } from "zod";
import { TabInfo } from "@/components/admin/event/EventTabInfo";
import { TabGroups } from "@/components/admin/group/GroupTabInfo";
import { ShowWarning } from "@/components/helpers/AlertHelpers";
import { PeopleTabInfo } from "@/components/admin/people/PeopleTabInfo";
import { Group } from "@/types/Group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAdminEvent } from "@/api/admin";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

type EditProps = {
    event: Event | undefined;
    groups: Group[] | undefined;
    refreshAction: () => void;
}

export const EventEdit = ({ event, groups , refreshAction }: EditProps) => {
    const [tab, setTab] = useState<ModalTab>('info');

    if(!event) return null;
    if (!groups) return null;

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
                {tab === 'groups' && <TabGroups event={event} groups={groups} refreshAction={refreshAction} />}
                {tab === 'people' && <PeopleTabInfo event={event} groups={groups} refreshAction={refreshAction} />}
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

const formSchema = z.object({
  titleField: z.string().min(2, { message: "Preencha o titulo maior que 2 caracteres.", }).max(50),
  descriptionField: z.string().min(2, { message: "Preencha a descrição maior que 2 caracteres.", }).max(50),
  groupedField: z.boolean(),
  statusField: z.boolean(),
});



export const PeopleItemPhaceholder = () => {
  return (
      <div className="w-full h-16 border border-gray-700 rounded mb-3 
      bg-gradient-to-r from-gray-700 to-gray-950 animate-pulse">
      </div>
  );
}

export const PeopleItemNotFound = () => {
  return (
      <div className="text-center py-4 ">
          <ShowWarning message="Nao ha Pessoas neste Grupo!!!"/>
      </div>
  );
}

type EditAlertDialogProps = {
  // IconElement: LucideIcon;
  // label?: string;
  event?: Event | undefined;
  title: string;
  // onClick?: () => void;
  refreshAction: () => void;
}

export function ClickEditAlertDialog({ event, title, refreshAction}: EditAlertDialogProps) {
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
      values: {
          titleField: (event)?event.title:"",
          descriptionField: (event)?event.description:"",
          groupedField: (event)?event.grouped:false,
          statusField: (event)?event.status:false,
      }
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);
      clickEdit(values);
  }

  const clickEdit = async(data: z.infer<typeof formSchema>) => {
      // setError([]);
      // const data = formSchema.safeParse({titleField, descriptionField, groupedField });
      // if (!data.success) { return(setError(getErrorFromZod(data.error))); }
      setLoading(true);
      const eventItem = await updateAdminEvent((event)?event.id:0 ,{
          title: data.titleField,
          description: data.descriptionField,
          grouped: data.groupedField
      });
      setLoading(false);
      if (eventItem) { refreshAction(); }
  }
  return (
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
                    <Card className="flex flex-row mb-5 mt-3">
                      <Card className="flex-1">
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
                  </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                  {/* <DialogClose asChild> */}
                      {/* <ShowButton label="Resetar" onClick={refreshAction} /> */}
                  {/* </DialogClose> */}
                  {/* <AlertDialogCancel>Resetar</AlertDialogCancel> */}
                  {/* <AlertDialogAction>Adicionar</AlertDialogAction> */}
                  {loading && <ButtonDisabled /> }
                  {!loading && <ShowButtonSubmit label="Salvar" /> }
              </DialogFooter>
          </form>
      </Form>
  );
}