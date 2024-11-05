import { addAdminGroup, updateAdminGroup } from "@/api/admin";
import { ErrorItem, getErrorFromZod } from "@/lib/getErrorFromZod";
import { useState } from "react";
import { z } from "zod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InputField } from "@/components/helpers/InputHelpers";
import { 
  ButtonDisabled, 
  ItemButtonDisabled, 
  ItemButtonSubmit, 
  ShowButton, 
  ShowButtonSubmit 
} from "@/components/helpers/ButtonHelpers";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideIcon } from "lucide-react";
import { Event } from "@/types/Event";
import { Group } from "@/types/Group";

type AddProps = {
  id_event: number;
  refreshAction: () => void;
}
  
const formSchema = z.object({
  nameField: z.string().min(2, { message: "Preencha o nome do grupo.", }).max(50),
});
  
export const GroupADD = ({ id_event, refreshAction }: AddProps) => {
  const [nameField, setNameField] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorItem[]>([]);
  
  const handleAddButton = async() => {
    setError([]);
    const data = formSchema.safeParse({ nameField });
    if (!data.success) { return(setError(getErrorFromZod(data.error))); }

    setLoading(true);
    const newGroup = await addAdminGroup(id_event, {
      name: data.data.nameField,
    });
    setLoading(false);
    if (newGroup) { 
      setNameField('');
      refreshAction(); 
    } else {
      alert('Nao foi possivel incluir o grupo!');
    }
  }
  
  return (
    <>
    <Card className="w-full my-3 flex-col items-center">
      <CardContent >
        <div className="flex flex-col items-start mt-4">
            <Label>Novo Grupo</Label>
            <InputField 
                value={nameField} 
                onChange={e => setNameField(e.target.value)} 
                placeholder="Digite o Nome do Grupo" 
                disabled={loading}
                errorMessage={error.find(item => item.field === 'nameField')?.message} 
            />
        </div>
        <div className="flex flex-row items-center mt-6 m-3">
            {/* <ShowButton label="Cancelar" onClick={refreshAction} /> */}
            {loading && <ButtonDisabled /> }
            {!loading && <ShowButtonSubmit label="Adicionar" onClick={handleAddButton} /> }
        </div>
      </CardContent>
    </Card>
    </>
  );
}

type AddGroupDialogProps = {
  IconElement: LucideIcon;
  id_event?: number;
  event: Event;
  group: Group | null;
  label?: string;
  title?: string;
  onClick?: () => void;
  refreshAction: () => void;
}

export function OpenADDGroupDialog({IconElement, event, group, refreshAction}: AddGroupDialogProps) {
  const [nameField, setNameField] = useState('');
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<ErrorItem[]>([]);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          nameField: "",
      },
      values: {
        nameField: (group)?group.name:"",
      }
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);
      if (group) {
        clickEdit(values);
      } else {
        clickAdd(values);
      }
  }

  const clickAdd = async(data: z.infer<typeof formSchema>) => {
      // setError([]);
      // const data = formSchema.safeParse({titleField, descriptionField, groupedField });
      // if (!data.success) { return(setError(getErrorFromZod(data.error))); }
      setLoading(true);
      const eventItem = await addAdminGroup(event.id, {
          name: data.nameField,
      });
      setLoading(false);
      if (eventItem) { refreshAction(); }
  }
  
  const clickEdit = async(data: z.infer<typeof formSchema>) => {
    // setError([]);
    // const data = formSchema.safeParse({titleField, descriptionField, groupedField });
    // if (!data.success) { return(setError(getErrorFromZod(data.error))); }
    var updateGroup;
    if (group) {
      setLoading(true);
      updateGroup = await updateAdminGroup(group.id_event, group.id, {
          name: data.nameField,
      });
      setLoading(false);
    } else {
      updateGroup = false;
    }
    console.log(updateGroup);
    if (updateGroup) { 
      refreshAction(); 
    } else {
      alert('Nao foi possivel alterar o grupo!');
    }
  }

  return (
    <>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
            <CardFooter>
              <FormField 
                control={form.control} 
                name="nameField"
                render={({ field }) => ( 
                    <FormItem> 
                        <FormLabel>Novo Grupo</FormLabel> 
                        <FormControl> 
                        <Input 
                            type="text" 
                            placeholder="Digite o Nome do Grupo" 
                            className="outline-none bg-gray-300 text-white" 
                            {...field} /> 
                        </FormControl> 
                        {/* <FormDescription>This is your public display name.</FormDescription>  */}
                        <FormMessage /> 
                    </FormItem> 
                )} 
              /> 
              {loading && <ItemButtonDisabled /> }
              {/* {!loading && <ShowButtonSubmit label="Adicionar" /> } */}
              {!loading && <ItemButtonSubmit IconElement={IconElement} /> }
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}