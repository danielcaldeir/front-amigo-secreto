"use client"

import { ErrorItem } from "@/lib/getErrorFromZod";
import { Event } from "@/types/Event";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ModalTab } from "@/types/modalScreens";

type EditProps = {
    event: Event | undefined;
    refreshAction: () => void;
}

export const EventEdit = ({ event, refreshAction }: EditProps) => {
    const [tab, setTab] = useState<ModalTab>('info');
    const [titleField, setTitleField] = useState('');
    const [descriptionField, setDescriptionField] = useState('');
    const [groupedField, setGroupedField] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorItem[]>([]);

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
        <Card>
            <CardContent>
                <div className="flex flex-col items-start mt-4">
                    <Label>Titulo</Label>
                    <Input 
                        value={titleField} 
                        onChange={e => setTitleField(e.target.value)} 
                        placeholder="Digite o Titulo do Evento" 
                        disabled={loading}
                        onError={error.find(item => item.field === 'titleField')?.message.toString} 
                    />
                </div>
                <div className="flex flex-col items-start mt-4">
                    <Label>Descrição</Label>
                    <Input 
                        value={descriptionField} 
                        onChange={e => setDescriptionField(e.target.value)} 
                        placeholder="Digite a descrição do Evento" 
                        disabled={loading}
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
                    {/* <ShowButtonReset label="Cancelar" onClick={refreshAction}/> */}
                    {/* {loading && <ButtonDisabled /> } */}
                    {/* {!loading && <ShowButtonSubmit label="Adicionar" onClick={handleAddButton} /> } */}
                </div>
            </CardContent>
        </Card>
    );
}