import { addAdminGroup } from "@/api/admin";
import { ErrorItem, getErrorFromZod } from "@/lib/getErrorFromZod";
import { useState } from "react";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InputField } from "@/components/helpers/InputHelpers";
import { ButtonDisabled, ShowButton, ShowButtonSubmit } from "@/components/helpers/ButtonHelpers";

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