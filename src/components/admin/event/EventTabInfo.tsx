import { Event } from "@/types/Event";
import { useEffect, useState } from "react";
import { ErrorItem, getErrorFromZod } from "@/lib/getErrorFromZod";
import { 
    Card, 
    CardContent, 
    // CardDescription, 
    // CardHeader, 
    // CardTitle, 
    // CardFooter 
} from "@/components/ui/card";
import { z } from "zod";
import { updateAdminEvent } from "@/api/admin";
import { InputField } from "@/components/helpers/InputHelpers";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ButtonDisabled, ShowButtonSubmit } from "@/components/helpers/ButtonHelpers";
// import { ShowInformation } from "@/components/helpers/AlertHelpers";

type TabProps = {
    event: Event | undefined;
    refreshAction: () => void;
}

export const TabInfo = ({ event, refreshAction }: TabProps) => {
    const [loading, setLoading] = useState(false);
    const [titleField, setTitleField] = useState((event?.title) as string);
    const [descriptionField, setDescriptionField] = useState((event?.description) as string);
    const [groupedField, setGroupedField] = useState((event?.grouped) as boolean);
    const [statusField, setStatusField] = useState((event?.status) as boolean);
    const [error, setError] = useState<ErrorItem[]>([]);
  
    if(!event) return null;
  
    useEffect(() => {
      setError([]);
      const formSchema = z.object({
        titleField: z.string().min(2, { message: "Preencha o titulo maior que 2 caracteres.", }).max(50),
        descriptionField: z.string().min(2, { message: "Preencha a descrição maior que 2 caracteres.", }).max(50),
        groupedField: z.boolean(),
        statusField: z.boolean(),
      });
      const data = formSchema.safeParse({ titleField, descriptionField, groupedField, statusField });
      if (!data.success){ setError(getErrorFromZod(data.error)) }
    },[titleField, descriptionField, groupedField, statusField]);
  
    const handleSaveButton = async() => {
      setError([]);
      const data = formSchema.safeParse({titleField, descriptionField, groupedField, statusField });
      if (!data.success) { return(setError(getErrorFromZod(data.error))); }
  
        setLoading(true);
        const eventItem = await updateAdminEvent(event.id, {
          title: titleField,
          description: descriptionField,
          grouped: groupedField,
          status: statusField
        });
        setLoading(false);
        if (eventItem) { 
          refreshAction(); 
        } else {
          alert("Nao foi possivel realizar o sorteio neste grupo");
          // <ShowInformation message="Nao foi possivel realizar o sorteio neste grupo"/>
          setLoading(true);
          await updateAdminEvent(event.id, {
            status: !statusField
          });
          setLoading(false);
          refreshAction();
        }
    }

    const formSchema = z.object({
        titleField: z.string().min(2, { message: "Preencha o titulo maior que 2 caracteres.", }).max(50),
        descriptionField: z.string().min(2, { message: "Preencha a descrição maior que 2 caracteres.", }).max(50),
        groupedField: z.boolean(),
        statusField: z.boolean(),
    });
  
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
          <div className="flex flex-row mb-5 ">
            <div className="flex items-start m-5 ">
                <Label>Agrupar Sorteio?</Label>
                <Input 
                    type="checkbox" 
                    checked={groupedField} 
                    onChange={e => setGroupedField(!groupedField)} 
                    className="block w-10 h-6 mt-3" 
                    // errorMessage={error.find(item => item.field === 'groupedField')?.message.toString} 
                />
            </div>
            <div className="flex items-start m-5 ">
                <Label>Evento Liberado?</Label>
                <Input 
                    type="checkbox" 
                    checked={statusField} 
                    onChange={e => setStatusField(!statusField)} 
                    className="block w-10 h-6 mt-3" 
                    // errorMessage={error.find(item => item.field === 'statusField')?.message.toString} 
                />
            </div>
          </div>
          <div className="flex flex-row items-center mt-6">
              {/* <ShowButton label="Cancelar" onClick={refreshAction} /> */}
              {loading && <ButtonDisabled /> }
              {!loading && <ShowButtonSubmit label="Salvar" onClick={handleSaveButton} /> }
          </div>
        </CardContent>
      </Card>
    );
}

