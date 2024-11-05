import { updateAdminEvent, updateAdminGroup } from "@/api/admin";
import { Event } from "@/types/Event";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ButtonDisabled, ItemButtonDisabled, ItemButtonSubmit, ShowButton, ShowButtonSubmit } from "@/components/helpers/ButtonHelpers";
import { Group } from "@/types/Group";
import { InputField } from "@/components/helpers/InputHelpers";
import { Label } from "@/components/ui/label";
import { ErrorItem, getErrorFromZod } from "@/lib/getErrorFromZod";
import { DialogClose } from "@/components/ui/dialog";
import { LucideIcon } from "lucide-react";

type EditProps = {
  group: Group | undefined;
  refreshAction: () => void;
}

export const GroupEdit = ({ group, refreshAction }: EditProps) => {
  const [nameField, setNameField] = useState(group?.name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorItem[]>([]);

  if(!group) return null;

  const handleEditButton = async() => {
    setError([]);
    const data = formSchema.safeParse({ nameField });
    if (!data.success) { return(setError(getErrorFromZod(data.error))); }

    setLoading(true);
    const updateGroup = await updateAdminGroup(group?.id_event, group?.id, {
      name: nameField,
    });
    setLoading(false);
    console.log(updateGroup);
    if (updateGroup) { 
      setNameField('');
      refreshAction(); 
    } else {
      alert('Nao foi possivel alterar o grupo!');
    }
  }

  return ( 
    <Card className="w-full my-3 flex-col items-center">
      <CardContent >
        <div className="flex flex-col items-start mt-4">
            <Label>Editar Grupo</Label>
            <InputField 
                value={nameField} 
                onChange={e => setNameField(e.target.value)} 
                placeholder="Digite o Nome do Grupo" 
                disabled={loading}
                errorMessage={error.find(item => item.field === 'nameField')?.message} 
            />
        </div>
        <div className="flex flex-row items-center mt-6 m-3">
            <ShowButton label="Cancelar" onClick={refreshAction} />
            {loading && <ButtonDisabled /> }
            {!loading && <ShowButtonSubmit label="Salvar" onClick={handleEditButton} /> }
        </div>
      </CardContent>
    </Card> 
  );
}

// export const GroupEdit;

type TabProps = {
  IconElement: LucideIcon;
  event: Event | undefined;
  group: Group | undefined;
  refreshAction: () => void;
}

const formSchema = z.object({
  nameField: z.string().min(2, { message: "Preencha o titulo maior que 2 caracteres.", }).max(50),
});
  
// export const OpenGroupEditDialog = ({ IconElement, event, group, refreshAction }: TabProps) => {
//     const [loading, setLoading] = useState(false);
//     if(!event) return null;
//     if(!group) return null;
//     // 1. Define your form.
//     const form = useForm<z.infer<typeof formSchema>>({
//       resolver: zodResolver(formSchema),
//       defaultValues: {
//           nameField: group?.name,
//       },
//     });
//     // 2. Define a submit handler.
//     function onSubmit(values: z.infer<typeof formSchema>) {
//       // Do something with the form values.
//       // ✅ This will be type-safe and validated.
//       console.log(values);
//       // setLoading(true);
//       clickAdd(values);
//     }
//     const clickAdd = async(data: z.infer<typeof formSchema>) => {
//       // setError([]);
//       // const data = formSchema.safeParse({titleField, descriptionField, groupedField });
//       // if (!data.success) { return(setError(getErrorFromZod(data.error))); }
//       setLoading(true);
//       const updateGroup = await updateAdminGroup(group.id_event, group.id, {
//           name: data.nameField,
//       });
//       setLoading(false);
//       console.log(updateGroup);
//       if (updateGroup) { 
//         refreshAction(); 
//       } else {
//         alert('Nao foi possivel alterar o grupo!');
//       }
//     }
//     return (
//       <Card>
//         {/* <CardContent className="flex flex-row flex-1 items-center mt-6"> */}
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//               {/* <CardDescription > */}
//               <CardFooter>
//                 <FormField 
//                     control={form.control} 
//                     name="nameField"
//                     render={({ field }) => ( 
//                       <FormItem> 
//                           <FormLabel>Novo Grupo</FormLabel> 
//                           <FormControl> 
//                           <Input 
//                               type="text" 
//                               placeholder="Digite o Titulo do Evento" 
//                               className="outline-none bg-gray-500 text-white" 
//                               {...field} /> 
//                           </FormControl> 
//                           {/* <FormDescription>This is your public display name.</FormDescription>  */}
//                           <FormMessage /> 
//                       </FormItem> 
//                     )} 
//                 /> 
//                 {loading && <ItemButtonDisabled /> }
//                 {/* {!loading && <ShowButtonSubmit label="Adicionar" /> } */}
//                 {!loading && <ItemButtonSubmit IconElement={IconElement} /> }
//               </CardFooter>
//               {/* </CardDescription> */}
//             </form>
//           </Form>
//         {/* </CardContent> */}
//       </Card>
//     );
// }