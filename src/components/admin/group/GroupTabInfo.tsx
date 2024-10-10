import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonDisabled, ItemButton, ShowButton, ShowButtonSubmit } from "@/components/helpers/ButtonHelpers";
import { useEffect, useState } from "react";
import { Event } from "@/types/Event";
import { getAdminGroup, getAdminGroups } from "@/api/admin";
import { Group } from "@/types/Group";
// import { PencilIcon, PlusCircleIcon, Trash2Icon } from "lucide-react";
// import { EventItemNotFound, EventItemPhaceholder } from "@/components/admin/event/EventItem";
import { ShowWarning } from "@/components/helpers/AlertHelpers";
// import { OpenEditAlertDialog } from "@/components/admin/event/EventEditAlertDialog";
// import { OpenDelEventModal } from "@/components/helpers/AlertDialogHelpers";
// import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { GroupADD, OpenADDGroupDialog } from "@/components/admin/group/GroupAdd";
import { GroupItem } from "@/components/admin/group/GroupItem";
import GroupEdit from "@/components/admin/group/GroupEdit";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { SaveIcon } from "lucide-react";
import { Table, TableBody } from "@/components/ui/table";

type TabProps = {
  event?: Event | undefined;
  refreshAction: () => void;
}

export const TabGroups = ({ event, refreshAction }: TabProps) => {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  if(!event) return null;

  const handleEditButton = async (group: Group) => {
    console.log("Selecionando o Grupo!!");
    setSelectedGroup(group);
  }

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

  return ( 
    <Card>
      <CardHeader className="my-3 w-full flex flex-row items-center">
        {/* <CardTitle className="flex-1">TabGroups!</CardTitle> */}
        {!selectedGroup && 
          <GroupADD id_event={event.id} refreshAction={loadGroups}/>
        }
        {selectedGroup && 
          <GroupEdit group={selectedGroup} refreshAction={loadGroups}/> 
        }
      </CardHeader>
      <CardContent className="w-full my-3 flex-row items-center">
      {/* <CardContent> */}
        {/* {!selectedGroup && <GroupADD id_event={event.id} refreshAction={loadGroups}/> } */}
        {loading && 
          <>
            <GroupItemPhaceholder />
            <GroupItemPhaceholder />
          </>
        }
        {!loading && groups.length == 0 && <GroupItemNotFound />}
        {/* <div className="flex text-center border-b border-gray-500 cursor-pointer"> */}
        {!loading && groups.length > 0 && 
          groups.map( (item) => (
            <GroupItem 
              key={item.id} 
              item={item} 
              onEdit={handleEditButton} 
              refreshAction={loadGroups} 
            />
          ) )
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

export const TabGroupsDialog = ({ event, refreshAction }: TabProps) => {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  if(!event) return null;

  // const formSchema = z.object({
  //   titleField: z.string().min(2, { message: "Preencha o titulo maior que 2 caracteres.", }).max(50),
  //   descriptionField: z.string().min(2, { message: "Preencha a descrição maior que 2 caracteres.", }).max(50),
  //   groupedField: z.boolean(),
  //   statusField: z.boolean(),
  // });

  const handleEditButton = async (group: Group) => {
    console.log("Selecionando o Grupo!!");
    setSelectedGroup(group);
  }

  const loadGroups = async () => {
    setSelectedGroup(null);
    setLoading(true);
    const groupList = await getAdminGroups(event.id);
    console.log(groupList);
    setGroups(groupList);
    setLoading(false);
  }

  useEffect(() => {
    loadGroups();
  },[]);

  // const handleConfirmButton = async() => {
  //     setLoading(true);
  //     const eventItem = await deleteAdminEvent(event.id);
  //     setLoading(false);
  //     if (eventItem) { refreshAction(); }
  // }

  return (
    <Card>
      <CardHeader className="my-3 w-full flex flex-row items-center">
        {/* <CardTitle className="flex-1">TabGroups!</CardTitle> */}
        {!selectedGroup && 
          // <GroupADD id_event={event.id} refreshAction={loadGroups}/>
          <OpenADDGroupDialog IconElement={SaveIcon} id_event={event.id} refreshAction={loadGroups}/>
        }
        {selectedGroup && 
          <OpenGroupEditDialog group={selectedGroup} refreshAction={loadGroups}/> 
        }
      </CardHeader>
      <CardContent className="w-full my-3 flex-row items-center">
      {/* <CardContent> */}
        {/* {!selectedGroup && <GroupADD id_event={event.id} refreshAction={loadGroups}/> } */}
        {loading && 
          <>
            <GroupItemPhaceholder />
            <GroupItemPhaceholder />
          </>
        }
        {!loading && groups.length == 0 && <GroupItemNotFound />}
        {/* <div className="flex text-center border-b border-gray-500 cursor-pointer"> */}
        {/* <Table className="border p-3 mb-3 flex flex-col items-center rounded md:flex-row"> */}
          {/* <TableBody className="w-full items-center"> */}
            {!loading && groups.length > 0 && 
              groups.map( (item) => (
                <GroupItem 
                  key={item.id} 
                  item={item} 
                  onEdit={handleEditButton} 
                  refreshAction={loadGroups} 
                />
              ) )
            }
          {/* </TableBody> */}
        {/* </Table> */}
        
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