"use client";

import { getAdminEvents } from "@/api/admin";
import { Event } from "@/types/Event";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  EventADD,
  EventItem, 
  EventItemNotFound, 
  EventItemPhaceholder, 
  OpenADDAlertDialog
} from "@/components/admin/EventItem";
import { EventEdit } from "@/components/admin/EventModal";
import { PlusCircleIcon } from "lucide-react";
import { ModalScreens } from "@/types/modalScreens";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { OpenModalAlertDialog } from "@/components/helpers/AlertDialogHelpers";
import { ModalDemo } from "@/components/util/ModalDemo";
import { ItemButton } from "@/components/helpers/ButtonHelpers";

export const AdminPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalScreen, setModalScreen] = useState<ModalScreens>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event>();

    const loadEvents = async () => {
        setModalScreen(null);
        setLoading(true);
        const eventList = await getAdminEvents();
        setEvents(eventList);
        setLoading(false);
    }

    useEffect(() => {
        loadEvents();
    },[]);

    const editEvent = (event: Event) => {
      setSelectedEvent(event);
      setModalScreen('edit');
    }

    const handleADDEvent = () => {
      // const ping = await getAdminEvent(2);
      console.log("Click ADD Event: ");
    }

    return(
        <section className="bg-gray-900 p-5 rounded text-white w-full">
            <Card>
              <CardHeader className="p-3 flex flex-row items-center">
                <CardTitle className="flex-1">Eventos</CardTitle>
                {/* <PlusCircleIcon /> */}
                <OpenADDAlertDialog 
                  IconElement={PlusCircleIcon} 
                  onClick={ handleADDEvent } 
                  title="Criar um Novo Evento"
                  refreshAction={loadEvents}
                />
                {/* <ItemButton IconElement={PlusCircleIcon} label="" onClick={ () => setModalScreen('add') } /> */}
              </CardHeader>
              
              {loading && <EventItemPhaceholder />}
              {!loading && events.length == 0 && <EventItemNotFound />  }
              
              <CardContent className="w-full my-3 flex-row items-center">
                {!loading && events.length > 0 && 
                  events.map( (item) => 
                    (
                      <EventItem 
                        key={item.id}
                        item={item} 
                        refreshAction={loadEvents} 
                        openModal={(event) => editEvent(event)} 
                      />
                    )
                  ) 
                }
              </CardContent>
                {/* <Card>Eventos</Card> */}
                {/* <Card> */}
                    {/* {loading && <div>Carregando ...</div>} */}
                    {/* {!loading && events.length > 0 && events.map( item => [<div key={item.id}>{item.title}</div>]) } */}
                    {/* {!loading && events.length == 0 && <CardTitle>Nao foi possivel carregar nenhum Evento</CardTitle>  } */}
                {/* </Card> */}
            </Card>
            <Card>
              {modalScreen && 
                <ModalDemo onClose={ ()=>setModalScreen(null) } >
                  {/* Tipo: {modalScreen} */}
                  {modalScreen == 'add' && <EventADD refreshAction={loadEvents} />}
                  {modalScreen == 'edit' && <EventEdit event={selectedEvent} refreshAction={loadEvents} />}
                </ModalDemo>
              }
            </Card>
        </section>
    );
}