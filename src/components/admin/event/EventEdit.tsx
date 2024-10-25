"use client"

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
// import { ButtonDisabled, ItemButton, ShowButton, ShowButtonSubmit } from "@/components/helpers/ButtonHelpers";
// import { Input } from "@/components/ui/input";
import { ModalTab } from "@/types/modalScreens";
import { z } from "zod";
import { TabInfo } from "@/components/admin/event/EventTabInfo";
import { TabGroups } from "@/components/admin/group/GroupTabInfo";
import { ShowWarning } from "@/components/helpers/AlertHelpers";
import TabPeople, { PeopleTabInfo } from "@/components/admin/people/PeopleTabInfo";

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
                {tab === 'people' && <PeopleTabInfo event={event} refreshAction={refreshAction} />}
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