"use client";

import { getAdminEvents } from "@/api/admin";
import { Event } from "@/types/Event";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  EventItem, 
  EventItemNotFound, 
  EventItemPhaceholder 
} from "@/components/admin/EventItem";
import { 
  CircleFadingPlus, 
  CircleFadingPlusIcon, 
  LucideCircleFadingPlus, 
  MessageCirclePlus, 
  PlusCircleIcon 
} from "lucide-react";
import { ItemButton } from "@/components/util/ItemButton";

export const AdminPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    const loadEvents = async () => {
        setLoading(true);
        const eventList = await getAdminEvents();
        setEvents(eventList);
        setLoading(false);
    }

    useEffect(() => {
        loadEvents();
    },[]);

    const handleSearchButton = async () => {
      // (cpf: string)
        // if (!cpf) return( alert('Nao foi informado um CPF'));
        // setLoading(true);
        // const cpfResult = await searchCPF(id, cpf);
        // setLoading(false);
        // if (!cpfResult) return ( alert('Nao Encontramos o seu CPF') );
        // setResult(cpfResult);
      return false;
    }

    return(
        <section className="bg-gray-900 p-5 rounded text-white w-full">
            <Card>
              <CardHeader className="p-3 flex flex-row items-center">
                <CardTitle className="flex-1">Eventos</CardTitle>
                {/* <PlusCircleIcon /> */}
                <ItemButton 
                  IconElement={PlusCircleIcon} 
                  onClick={handleSearchButton}
                />
              </CardHeader>
              
              {loading && <EventItemPhaceholder />}
              {!loading && events.length == 0 && <EventItemNotFound />  }
              
              <CardContent className="w-full my-3 flex-row items-center">
                {!loading && events.length > 0 && 
                  events.map( item => 
                    [
                      <EventItem item={item} refreshAction={loadEvents} openModal={()=>{}} />
                    ]
                  ) 
                }
              </CardContent>
                {/* <Table> */}
                  {/* <TableHeader> */}
                    {/* <TableRow> */}
                      {/* <TableHead>Eventos</TableHead> */}
                      {/* <TableHead>Descrição</TableHead> */}
                    {/* </TableRow> */}
                  {/* </TableHeader> */}
                  {/* <TableBody> */}
                    {/* {!loading && events.length > 0 &&  */}
                      {/* events.map( item =>  */}
                        {/* [ */}
                          {/* <TableRow> */}
                            {/* <TableCell><div key={item.id}>{item.title}</div></TableCell> */}
                            {/* <TableCell><div >{item.description}</div></TableCell> */}
                          {/* </TableRow> */}
                        {/* ] */}
                      {/* )  */}
                    {/* } */}
                  {/* </TableBody> */}
                {/* </Table> */}
                {/* <Card>Eventos</Card> */}
                {/* <Card> */}
                    {/* {loading && <div>Carregando ...</div>} */}
                    {/* {!loading && events.length > 0 && events.map( item => [<div key={item.id}>{item.title}</div>]) } */}
                    {/* {!loading && events.length == 0 && <CardTitle>Nao foi possivel carregar nenhum Evento</CardTitle>  } */}
                {/* </Card> */}
            </Card>
        </section>
    );
}