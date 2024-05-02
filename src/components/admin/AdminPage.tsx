"use client";

import { getAdminEvent, getAdminEvents } from "@/api/admin";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, 
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, 
  AlertDialogTitle, AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { OpenModalAlertDialog } from "@/components/helpers/AlertDialogHelpers";
import { ModalDemo } from "../util/ModalDemo";
import { ItemButton } from "../helpers/ButtonHelpers";

export const AdminPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalScreen, setModalScreen] = useState<ModalScreens>(null);

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

    // const openModalDialog = async () => {
    //   return (
    //     <Dialog>
    //       <DialogTrigger asChild>
    //         <Button variant="outline">Edit Profile</Button>
    //       </DialogTrigger>
    //       <DialogContent className="sm:max-w-[425px]">
    //         <DialogHeader>
    //           <DialogTitle>Edit profile</DialogTitle>
    //           <DialogDescription>
    //             Make changes to your profile here. Click save when you're done.
    //           </DialogDescription>
    //         </DialogHeader>
    //         <div className="grid gap-4 py-4">
    //           <div className="grid grid-cols-4 items-center gap-4">
    //             <Label htmlFor="name" className="text-right">
    //               Name
    //             </Label>
    //             <Input id="name" value="Pedro Duarte" className="col-span-3" />
    //           </div>
    //           <div className="grid grid-cols-4 items-center gap-4">
    //             <Label htmlFor="username" className="text-right">
    //               Username
    //             </Label>
    //             <Input id="username" value="@peduarte" className="col-span-3" />
    //           </div>
    //         </div>
    //         <DialogFooter>
    //           <Button type="submit">Save changes</Button>
    //         </DialogFooter>
    //       </DialogContent>
    //     </Dialog>
    //   )
    // }

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
                {/* <OpenADDAlertDialog  */}
                  {/* IconElement={PlusCircleIcon}  */}
                  {/* onClick={ handleADDEvent }  */}
                  {/* title="Criar um Novo Evento" */}
                {/* /> */}
                <ItemButton IconElement={PlusCircleIcon} label="" onClick={ () => setModalScreen('add') } />
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
                  {modalScreen == 'edit' && <div></div>}
                </ModalDemo>
              }
            </Card>
        </section>
    );
}