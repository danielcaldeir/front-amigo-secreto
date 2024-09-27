import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonDisabled, ItemButton, ShowButton, ShowButtonSubmit } from "@/components/helpers/ButtonHelpers";
import { useEffect, useState } from "react";
import { Event } from "@/types/Event";
import { getAdminGroup, getAdminGroups } from "@/api/admin";
import { Group } from "@/types/Group";
import { PencilIcon, PlusCircleIcon, Trash2Icon } from "lucide-react";
import { EventItemNotFound, EventItemPhaceholder } from "@/components/admin/EventItem";
import { ShowWarning } from "@/components/helpers/AlertHelpers";
import { OpenEditAlertDialog } from "@/components/admin/EventEdit";
import { OpenDelEventModal } from "@/components/helpers/AlertDialogHelpers";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { GroupADD } from "./GroupAdd";

type TabProps = {
  event?: Event | undefined;
  refreshAction: () => void;
}

export const TabGroups = ({ event, refreshAction }: TabProps) => {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  if(!event) return null;

  const loadGroups = async () => {
    setSelectedGroup(null);
    setLoading(true);
    const groupList = await getAdminGroups(event.id);
    setGroups(groupList);
    setLoading(false);
  }

  useEffect(() => {
    loadGroups();
  },[]);

  // const handleADDButton = async() => {
  //   const ping = await getAdminGroup(event.id, 0);
  //   console.log("ADD Event: "+ping);
  // }

  return ( 
    <Card>
      <CardHeader className="my-3 w-full flex flex-row items-center border">
        {/* <CardTitle className="flex-1">TabGroups!</CardTitle> */}
        {!selectedGroup && 
          <GroupADD id_event={event.id} refreshAction={loadGroups}/>
        }
        {/* <ItemButton IconElement={PlusCircleIcon} label="" onClick={ handleADDButton } /> */}
      </CardHeader>
      <CardContent className="w-full my-3 flex-row items-center">
        {loading && 
          <>
            <GroupItemPhaceholder />
            <GroupItemPhaceholder />
          </>
        }
        {!loading && groups.length == 0 && <GroupItemNotFound />}
        {/* <div className="flex text-center border-b border-gray-500 cursor-pointer"> */}
          {!loading && groups.length > 0 && 
            groups.map( (item) => 
              (<GroupItem key={item.id} item={item} />)
            )
          }
        {/* </div> */}
        {/* <div className="flex flex-row items-center mt-6"> */}
          {/* <ShowButton label="Cancelar" onClick={refreshAction} /> */}
          {/* {loading && <ButtonDisabled /> } */}
          {/* {!loading && <ShowButtonSubmit label="Confirmar" /> } */}
        {/* </div> */}
      </CardContent>
    </Card>
  );
}
 
export const GroupItemPhaceholder = () => {
  return (
      <div className="w-full h-16 border border-gray-700 rounded mb-3 
      bg-gradient-to-r from-gray-700 to-gray-950 animate-pulse">
      </div>
  );
}

export const GroupItemNotFound = () => {
  return (
      <div className="text-center py-4 ">
          <ShowWarning message="Nao ha grupos neste evento!!!"/>
      </div>
  );
}

type GroupItemProps = {
  item: Group;
  // refreshAction: () => void;
  // openModal: (event: Event, screens: ModalScreens) => void;
}

export const GroupItem = ({ item }: GroupItemProps) => {
  // const handleEditButton = () => openModal(item, 'edit');
  // const handleDelButton = () => openModal(item, 'del');

  const handleDeleteButton = async () => {
      console.log("Deletando Item!!");
      if (confirm('Tem certeza que deseja excluir este Evento?')) {
          // await deleteAdminEvent(item.id);
          // refreshAction();
      }
  }

  const handleEditButton = async () => {
    console.log("Editando Item!!");
    if (confirm('Tem certeza que deseja excluir este Evento?')) {
        // await deleteAdminEvent(item.id);
        // refreshAction();
    }
  }

  return (
      <Table className="border p-3 mb-3 flex flex-col items-center rounded md:flex-row">
          <TableBody>
              <TableRow>
                  <TableCell>
                    <div key={item.id}>{item.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 mt-2 md:flex-row">
                      <ItemButton 
                        IconElement={PencilIcon} 
                        label="" 
                        onClick={ handleEditButton } 
                      />
                      <ItemButton 
                        IconElement={Trash2Icon} 
                        label="" 
                        onClick={ handleDeleteButton } 
                      />
                    </div>
                  </TableCell>
                  {/* <TableCell> */}
                      {/* <div className="flex items-center gap-1 mt-2 md:flex-row"> */}
                          {/* { item.status && <ItemButton IconElement={LinkIcon} href={`/events/${item.id}`} target="_blank" /> } */}
                          {/* <OpenEditAlertDialog IconElement={PencilIcon} title="Editando um Evento" event={item} refreshAction={refreshAction} /> */}
                          {/* <ItemButton IconElement={PencilIcon} onClick={handleEditButton} /> */}
                          {/* <OpenDelEventModal IconElement={Trash2Icon} event={item} refreshAction={refreshAction} /> */}
                          {/* <ItemButton IconElement={Trash2Icon} onClick={handleDelButton} /> */}
                      {/* </div> */}
                  {/* </TableCell> */}
              </TableRow>
          </TableBody>
      </Table>
  );
}

