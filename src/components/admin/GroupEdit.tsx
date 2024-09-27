import { updateAdminGroup } from "@/api/admin";
import { Event } from "@/types/Event";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { ButtonDisabled, ShowButtonSubmit } from "../helpers/ButtonHelpers";
import { Group } from "@/types/Group";

function GroupEdit() {
    return (  );
}

export default GroupEdit;

type TabProps = {
  event: Event | undefined;
  group: Group | undefined;
  refreshAction: () => void;
}

const formSchema = z.object({
  nameField: z.string().min(2, { message: "Preencha o titulo maior que 2 caracteres.", }).max(50),
});
  
export const TabGroupDialog = ({ event, group, refreshAction }: TabProps) => {
    const [loading, setLoading] = useState(false);
  
    if(!event) return null;
    if(!group) return null;
  
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          nameField: group?.name,
      },
    });
  
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);
      // setLoading(true);
      clickAdd(values);
    }
  
    const clickAdd = async(data: z.infer<typeof formSchema>) => {
      // setError([]);
      // const data = formSchema.safeParse({titleField, descriptionField, groupedField });
      // if (!data.success) { return(setError(getErrorFromZod(data.error))); }
  
      setLoading(true);
      const eventItem = await updateAdminGroup(event.id, group.id, {
          name: data.nameField,
          // description: data.descriptionField,
          // grouped: data.groupedField,
          // status: data.statusField
      });
      setLoading(false);
      if (eventItem) { 
        refreshAction(); 
      } else {
        alert("Nao foi possivel realizar o sorteio neste grupo");
        // <ShowInformation message="Nao foi possivel realizar o sorteio neste grupo"/>
        // setLoading(true);
        // await updateAdminGroup(event.id, {
        //   status: !data.statusField
        // });
        // setLoading(false);
        // refreshAction();
      }
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
                      name="nameField"
                      render={({ field }) => ( 
                        <FormItem> 
                            <FormLabel>Novo Grupo</FormLabel> 
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
                  {/* <FormField  */}
                      {/* control={form.control} */}
                      {/* name="descriptionField" */}
                      {/* render={({ field }) => ( */}
                        {/* <FormItem> */}
                            {/* <FormLabel>Descrição</FormLabel> */}
                            {/* <FormControl> */}
                            {/* <Input type="text" placeholder="Digite a descrição do Evento" className="outline-none bg-gray-500 text-white" {...field} /> */}
                            {/* </FormControl> */}
                            {/* <FormDescription>This is your public display name.</FormDescription> */}
                            {/* <FormMessage /> */}
                        {/* </FormItem> */}
                      {/* )} */}
                  {/* /> */}
                  {/* <Card className="flex flex-row mb-5 mt-3"> */}
                    {/* <Card className="flex-1"> */}
                      {/* <FormField  */}
                          {/* control={form.control} */}
                          {/* name="groupedField" */}
                          {/* render={({ field }) => ( */}
                            {/* <FormItem> */}
                                {/* <FormLabel>Agrupar Sorteio?</FormLabel> */}
                                {/* <FormControl> */}
                                    {/* <Checkbox checked={field.value} onCheckedChange={field.onChange} /> */}
                                    {/* <Input type="checkbox" checked={groupedField} className="w-20 h-6 mt-3" {...field} /> */}
                                {/* </FormControl> */}
                                {/* <FormDescription>This is your public display name.</FormDescription> */}
                                {/* <FormMessage /> */}
                            {/* </FormItem> */}
                          {/* )} */}
                      {/* /> */}
                    {/* </Card> */}
                    {/* <Card className="flex-1"> */}
                      {/* <FormField  */}
                          {/* control={form.control} */}
                          {/* name="statusField" */}
                          {/* render={({ field }) => ( */}
                            {/* <FormItem> */}
                                {/* <FormLabel>Evento Liberado?</FormLabel> */}
                                {/* <FormControl> */}
                                    {/* <Checkbox checked={field.value} onCheckedChange={field.onChange} /> */}
                                    {/* <Input type="checkbox" checked={groupedField} className="w-20 h-6 mt-3" {...field} /> */}
                                {/* </FormControl> */}
                                {/* <FormDescription>This is your public display name.</FormDescription> */}
                                {/* <FormMessage /> */}
                            {/* </FormItem> */}
                          {/* )} */}
                      {/* /> */}
                    {/* </Card> */}
                  {/* </Card> */}
                  
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