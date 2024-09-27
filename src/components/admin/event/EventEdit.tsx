"use client"

// import { ErrorItem, getErrorFromZod } from "@/lib/getErrorFromZod";
import { Event } from "@/types/Event";
import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  // CardDescription, 
  CardHeader, 
  CardTitle, 
  // CardFooter 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  // FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
import { ButtonDisabled, ItemButton, ShowButton, ShowButtonSubmit } from "@/components/helpers/ButtonHelpers";
import { Input } from "@/components/ui/input";
import { ModalTab } from "@/types/modalScreens";
// import { LucideIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { updateAdminEvent } from "@/api/admin";
import { TabInfo } from "@/components/admin/event/EventTabInfo";
import { TabGroups } from "@/components/admin/GroupTabInfo";

type EditProps = {
    event: Event | undefined;
    refreshAction: () => void;
}

export const EventEdit = ({ event, refreshAction }: EditProps) => {
    const [tab, setTab] = useState<ModalTab>('info');

    if(!event) return null;

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

const formSchema = z.object({
  titleField: z.string().min(2, { message: "Preencha o titulo maior que 2 caracteres.", }).max(50),
  descriptionField: z.string().min(2, { message: "Preencha a descrição maior que 2 caracteres.", }).max(50),
  groupedField: z.boolean(),
  statusField: z.boolean(),
});

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

