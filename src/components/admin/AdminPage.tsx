"use client";

import { deleteAdminEvent, getAdminEvents } from "@/api/admin";
import { Event } from "@/types/Event";
import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  EventItem, 
  EventItemNotFound, 
  EventItemPhaceholder, 
} from "@/components/admin/event/EventItem";
import { 
  ButtonDisabled, 
  ItemButton, 
  ShowButton, 
  ShowButtonSubmit 
} from "@/components/helpers/ButtonHelpers";
import { EventADD, OpenADDAlertDialog } from "@/components/admin/event/EventAdd";
import { EventEdit } from "@/components/admin/event/EventEdit";
import { PlusCircleIcon } from "lucide-react";
import { ModalScreens } from "@/types/modalScreens";
import { ModalDemo } from "@/components/util/ModalDemo";

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

    const editEvent = (event: Event, screens: ModalScreens) => {
      setSelectedEvent(event);
      setModalScreen(screens);
    }

    // const handleADDEvent = () => {
    //   // const ping = await getAdminEvent(2);
    //   console.log("Click ADD Event: ");
    // }

    return(
        <section className="bg-gray-900 p-5 rounded text-white w-full">
            <Card>
              <CardHeader className="p-3 flex flex-row items-center">
                <CardTitle className="flex-1">Eventos</CardTitle>
                {/* <PlusCircleIcon /> */}
                <OpenADDAlertDialog 
                  IconElement={PlusCircleIcon} 
                  // onClick={ handleADDEvent } 
                  title="Criar um Novo Evento"
                  refreshAction={loadEvents}
                />
                <ItemButton 
                  IconElement={PlusCircleIcon} 
                  label="" 
                  onClick={ () => setModalScreen('add') } 
                />
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
                        openModal={(event, screens) => editEvent(event, screens)} 
                      />
                    )
                  ) 
                }
              </CardContent>
            </Card>
            <Card>
              {modalScreen && 
                <ModalDemo onClose={ ()=>setModalScreen(null) } >
                  {/* Tipo: {modalScreen} */}
                  {modalScreen == 'add' && <EventADD refreshAction={loadEvents} />}
                  {modalScreen == 'edit' && <EventEdit event={selectedEvent} refreshAction={loadEvents} />}
                  {modalScreen == 'del' && <EventDel event={selectedEvent} refreshAction={loadEvents} />}
                </ModalDemo>
              }
            </Card>
        </section>
    );
}

type DelProps = {
  event: Event | undefined;
  refreshAction: () => void;
}

export const EventDel = ({ event, refreshAction }: DelProps) => {
  const [loading, setLoading] = useState(false);

  if(!event) return null;

  const handleConfirmButton = async() => {
      setLoading(true);
      const eventItem = await deleteAdminEvent(event.id);
      setLoading(false);
      if (eventItem) { refreshAction(); }
  }

  return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Exclusao de Evento!</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="flex text-center border-b border-gray-500 cursor-pointer">
              Tem certeza que deseja excluir este Evento?
              </div>
              <div className="flex flex-row items-center mt-6">
                  <ShowButton label="Cancelar" onClick={refreshAction} />
                  {loading && <ButtonDisabled /> }
                  {!loading && <ShowButtonSubmit label="Confirmar" onClick={handleConfirmButton} /> }
              </div>
          </CardContent>
        </Card>
      </>
  );
}