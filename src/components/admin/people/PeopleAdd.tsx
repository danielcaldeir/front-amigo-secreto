import { addAdminPeople, updateAdminPeople } from "@/api/admin";
import { ButtonDisabled, ItemButtonDisabled, ItemButtonSubmit, ShowButtonSubmit } from "@/components/helpers/ButtonHelpers";
import { InputField } from "@/components/helpers/InputHelpers";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { escapeCPF } from "@/lib/escapeCPF";
import { ErrorItem, getErrorFromZod } from "@/lib/getErrorFromZod";
import { People } from "@/types/People";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  id_event: number;
  id_group: number;
  refreshAction: (id: number) => void;
}

const formSchema = z.object({
  nameField: z.string().min(2, { message: "Preencha o nome da pessoa.", }).max(50),
  cpfField: z.string().min(2, { message: "Preencha o cpf da pessoa.", }).max(50),
});

export const PeopleADD = ({ id_event, id_group, refreshAction}: Props) => {
  const [nameField, setNameField] = useState('');
  const [cpfField, setCpfField] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorItem[]>([]);
  
  const handleAddButton = async() => {
    setError([]);
    const data = formSchema.safeParse({ nameField, cpfField });
    if (!data.success) { return(setError(getErrorFromZod(data.error))); }

    setLoading(true);
    const newPeople = await addAdminPeople(id_event, id_group, {
      name: data.data.nameField,
      cpf: data.data.cpfField,
    });
    setLoading(false);
    if (newPeople) { 
      setNameField('');
      setCpfField('');
      refreshAction(id_group); 
    } else {
      alert('Nao foi possivel incluir a pessoa!');
    }
  }

  return ( 
    <>
      <Card className="w-full my-3 flex-col items-center">
        <CardHeader >
          <CardTitle>Nova Pessoa</CardTitle>
          <div className="flex flex-row mb-5 ">
            <div className="flex items-start m-1 ">
                <InputField 
                    value={cpfField} 
                    onChange={e => setCpfField(escapeCPF(e.target.value))} 
                    placeholder="CPF da Pessoa" 
                    disabled={loading}
                    errorMessage={error.find(item => item.field === 'cpfField')?.message} 
                />
            </div>
            <div className="flex items-start m-1 ">
                <InputField 
                    value={nameField} 
                    onChange={e => setNameField(e.target.value)} 
                    placeholder="Nome da Pessoa" 
                    disabled={loading}
                    errorMessage={error.find(item => item.field === 'nameField')?.message} 
                />
            </div>
          </div>
          {/* <div className="flex flex-col items-start mt-4"> */}
            {/* <Label>Nova Pessoa</Label> */}
          {/* </div> */}
          {/* <div className="flex flex-col items-start mt-4"> */}
            {/* <Label>Nova Pessoa</Label> */}
          {/* </div> */}
          <div className="flex flex-row items-center mt-6 m-3">
            {/* <ShowButton label="Cancelar" onClick={refreshAction} /> */}
            {loading && <ButtonDisabled /> }
            {!loading && <ShowButtonSubmit label="Adicionar" onClick={handleAddButton} /> }
          </div>
        </CardHeader>
      </Card>
    </>
  );
}

type AddPeopleDialogProps = {
  IconElement: LucideIcon;
  id_event: number;
  id_group: number;
  people: People | null;
  // label?: string;
  // title?: string;
  // onClick?: () => void;
  refreshAction: (id: number) => void;
}

// type AddPeopleData = {
//   name: string;
//   cpf: string;
// }

export function OpenADDPeopleDialog({IconElement, id_event, id_group, people, refreshAction}: AddPeopleDialogProps) {
  const [nameField, setNameField] = useState('');
  const [cpfField, setCpfField] = useState('');
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<ErrorItem[]>([]);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          nameField: "",
          cpfField: "",
      },
      values: {
        nameField: (people)?people.name:"",
        cpfField: (people)?((people.cpf===undefined)?"":people.cpf):"",
      }
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);
      // if (people) {
        // clickEdit(values);
      // } else {
        clickAdd(values);
      // }
  }

  const clickAdd = async(data: z.infer<typeof formSchema>) => {
      // setError([]);
      // const data = formSchema.safeParse({titleField, descriptionField, groupedField });
      // if (!data.success) { return(setError(getErrorFromZod(data.error))); }
      setLoading(true);
      const eventItem = await addAdminPeople(id_event, id_group, {
          name: data.nameField,
          cpf: data.cpfField,
      });
      setLoading(false);
      if (eventItem) { refreshAction(id_group); }
  }
  
  // const clickEdit = async(data: z.infer<typeof formSchema>) => {
  //   // setError([]);
  //   // const data = formSchema.safeParse({titleField, descriptionField, groupedField });
  //   // if (!data.success) { return(setError(getErrorFromZod(data.error))); }
  //   var updateGroup;
  //   if (people) {
  //     setLoading(true);
  //     updateGroup = await updateAdminPeople(id_event, id_group, people.id,  {
  //         name: data.nameField,
  //     });
  //     setLoading(false);
  //   } else {
  //     updateGroup = false;
  //   }
  //   console.log(updateGroup);
  //   if (updateGroup) { 
  //     refreshAction(); 
  //   } else {
  //     alert('Nao foi possivel alterar o grupo!');
  //   }
  // }

  return (
    <>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
            <CardHeader><CardTitle>Nova Pessoa</CardTitle></CardHeader>
            <CardFooter >
              <FormField 
                control={form.control} 
                name="cpfField"
                render={({ field }) => ( 
                    <FormItem> 
                        <FormLabel>CPF</FormLabel> 
                        <FormControl> 
                        <Input 
                            type="text" 
                            placeholder="CPF da Pessoa" 
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
                name="nameField"
                render={({ field }) => ( 
                    <FormItem> 
                        <FormLabel>Nome</FormLabel> 
                        <FormControl> 
                        <Input 
                            type="text" 
                            placeholder="Nome da Pessoa" 
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