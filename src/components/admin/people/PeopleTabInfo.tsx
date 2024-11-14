import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { People } from "@/types/People";
import { useEffect, useState } from "react";
import { PeopleItemNotFound, PeopleItemPhaceholder } from "@/components/admin/event/EventEdit";
import { Event } from "@/types/Event";
import { Group } from "@/types/Group";
import { getAdminGroup, getAdminGroups, getAdminPeoples } from "@/api/admin";
import { GroupItemNotFound, GroupItemPhaceholder } from "@/components/admin/group/GroupTabInfo";
import { GroupItem } from "@/components/admin/group/GroupItem";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { PeopleItem } from "@/components/admin/people/PeopleItem";
import { Table, TableBody } from "@/components/ui/table";
import { ComboboxDemo } from "@/components/util/ComboboxDemo";
import { SelectComboBox } from "@/components/helpers/ComboBoxHelpers";

type TabPeopleProps = {
  event: Event | undefined;
  groups?: Group[];
  refreshAction: () => void;
}

// const TabPeople= ({event, refreshAction}:TabPeopleProps) => {
//   return (
//     <Card>
//         ...
//     </Card>
//   );
// }
// export default TabPeople;


export const PeopleTabInfo = ({ event, groups, refreshAction }: TabPeopleProps) => {
  const [loading, setLoading] = useState(false);
  // GroupList
  // const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  // PeopleList
  const [peoples, setPeoples] = useState<People[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<People | null>(null);
  
  if(!event) return null;
  if(!groups) return null;
  const setGroups = (groupsList: Group[]) => {
    groups = groupsList;
  }
  
  const handleEditButton = async (people: People) => {
    console.log("Editando Item!!");
    setSelectedPeople(people);
    console.log(people);
  }
  
  const setSelectedGroupID = async (id: number) => {
    console.log("Selecionando o Group!!");
    // console.log(id);
    const group = await getAdminGroup(event.id, id);
    if (group) {
      setSelectedGroup(group);
    }
    loadPeoples(id);
  }

  const loadGroups = async () => {
    setSelectedGroup(null);
    setLoading(true);
    const groupList = await getAdminGroups(event.id);
    setGroups(groupList);
    setLoading(false);
  }
  
  // useEffect(() => {
  //   loadGroups();
  //   // loadPeoples();
  // },[]);

  const loadPeoples = async (id_group: number) => {
    setSelectedPeople(null);
    setPeoples([]);
    setLoading(true);
    // const peopleList = await getAdminPeople(event.id);
    const peopleList = await getAdminPeoples(event.id, id_group);
    setPeoples(peopleList);
    setLoading(false);
  }
  
  return (
    <>
    <Card>
        <CardHeader>
          <CardTitle>{selectedGroup?.name}</CardTitle>
          <CardDescription>
            { loading && <GroupItemPhaceholder /> }
            { !loading && groups.length == 0 && <GroupItemNotFound />}
            { !loading && groups.length > 0 && 
              <Select onValueChange={e => setSelectedGroupID(parseInt(e))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um grupo"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectGroup> */}
                    {/* <SelectLabel>Grupos</SelectLabel> */}
                  {groups.map( (item) => ( 
                    <SelectItem value={String(item.id)}>{item.name}</SelectItem>
                  ) )}
                  {/* </SelectGroup> */}
                </SelectContent>
              </Select>
            }
          </CardDescription>
        </CardHeader>
        {/* <select onChange={e => setSelectedGroupID(parseInt(e.target.value))} className="w-full bg-transparent text-white text-xl p-3 outline-none" > */}
          {/* <option value={0}>Selecione um grupo</option> */}
          {/* {groups.map( (item) => (  */}
            {/* <option key={item.id} value={item.id}>{item.name}</option>  */}
          {/* ) )} */}
        {/* </select> */}
        <CardContent className="w-full my-3 flex-row items-center">
          {selectedGroup && 
            <>
              {loading && 
                  <>
                  <PeopleItemPhaceholder />
                  <PeopleItemPhaceholder />
                  </>
              }
              {!loading && peoples.length == 0 && 
              <>
                {!selectedPeople && <>add</>
                // <PeopleADD id_event={event.id} refreshAction={loadGroups}/>
                }
                <PeopleItemNotFound />
              </>
              }
              {!loading && peoples.length > 0 && 
              <>
              {!selectedPeople && <>add</>
              // <PeopleADD id_event={event.id} refreshAction={loadGroups}/>
              }
              {selectedPeople && <>edit</>
              // <PeopleEdit event={event} group={selectedGroup} refreshAction={loadGroups}/>
              }
              <div className="flex text-center border-b border-gray-500 cursor-pointer">
                <Table className="border p-3 mb-3 flex flex-col items-center rounded md:flex-row">
                <TableBody className="w-full items-center">
                  {!loading && peoples.length > 0 && 
                  peoples.map( (item) => (
                      <PeopleItem key={item.id} item={item} onEdit={handleEditButton} refreshAction={loadGroups} />
                  ) )
                  }
                </TableBody>
                </Table>
              </div>
              </>
              }
            </>
          }
        </CardContent>
    </Card>
        {/* <Card> */}
        {/* <CardHeader> */}
            {/* <CardTitle>TabPeople!</CardTitle> */}
        {/* </CardHeader> */}
        {/* <CardContent> */}
            {/* <div className="flex text-center border-b border-gray-500 cursor-pointer"> */}
            {/* TabPeople Evento? */}
            {/* </div> */}
            {/* <div className="flex flex-row items-center mt-6"> */}
                {/* <ShowButton label="Cancelar" onClick={refreshAction} /> */}
                {/* {loading && <ButtonDisabled /> } */}
                {/* {!loading && <ShowButtonSubmit label="Confirmar" onClick={}/> } */}
            {/* </div> */}
        {/* </CardContent> */}
        {/* </Card> */}
    </>
  );
}

export const TabPeopleDialog = ({ event, groups, refreshAction }: TabPeopleProps) => {
  const [loading, setLoading] = useState(false);
  // const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [peoples, setPeoples] = useState<People[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<People | null>(null);

  if(!event) return null;
  if (!groups) return null;
  const setGroups = (groupsList: Group[]) => {
    groups = groupsList;
  }

  // const formSchema = z.object({
  //   titleField: z.string().min(2, { message: "Preencha o titulo maior que 2 caracteres.", }).max(50),
  //   descriptionField: z.string().min(2, { message: "Preencha a descrição maior que 2 caracteres.", }).max(50),
  //   groupedField: z.boolean(),
  //   statusField: z.boolean(),
  // });

  const handleEditButton = async (people: People) => {
    console.log("Editando Item!!");
    setSelectedPeople(people);
  }

  // const handleEditButton = async (group: Group) => {
  //   setLoading(true);
  //   const oneGroup = await getAdminGroup(event.id, group.id);
  //   setLoading(false);
  //   console.log(oneGroup);
  //   if(oneGroup){
  //     console.log("Selecionando o Grupo!!");
  //     setSelectedGroup(oneGroup);
  //   } else {
  //     console.log(selectedGroup);
  //     refreshAction();
  //   }
  // }

  const loadGroups = async () => {
    setSelectedGroup(null);
    setLoading(true);
    const groupList = await getAdminGroups(event.id);
    console.log(groupList);
    setGroups(groupList);
    setLoading(false);
  }

  const loadPeoples = async (id_group: number) => {
    setSelectedPeople(null);
    setLoading(true);
    // const peopleList = await getAdminPeople(event.id);
    const peopleList = await getAdminPeoples(event.id, id_group);
    setPeoples(peopleList);
    setLoading(false);
  }

  const setSelectedGroupID = async (id: number) => {
    console.log("Selecionando o Group!!");
    console.log(id);
    const group = await getAdminGroup(event.id, id);
    if (group) {
      setSelectedGroup(group);
    }
    loadPeoples(id);
  }

  // const handleConfirmButton = async() => {
  //     setLoading(true);
  //     const eventItem = await deleteAdminEvent(event.id);
  //     setLoading(false);
  //     if (eventItem) { refreshAction(); }
  // }

  return (
    <Card>
      <CardHeader className="my-3 w-full flex flex-row items-center">
        <CardTitle>{selectedGroup?.name}</CardTitle>
        <CardDescription>
          { loading && <GroupItemPhaceholder /> }
          { !loading && groups.length == 0 && <GroupItemNotFound />}
          {/* { !loading && groups.length > 0 && <ComboboxDemo />} */}
          { !loading && groups.length > 0 && 
            <SelectComboBox groups={groups} refreshAction={setSelectedGroupID} />
          }
          {/* { !loading && groups.length > 0 &&  */}
            {/* groups.map( (item) => ( */}
              {/* <GroupItem key={item.id} item={item} onEdit={handleEditButton} refreshAction={loadGroups} /> */}
            {/* ) ) */}
          {/* } */}
        </CardDescription>
        {/* {!selectedGroup &&  */}
          {/* <GroupADD id_event={event.id} refreshAction={loadGroups}/> */}
          {/* <OpenADDGroupDialog IconElement={SaveIcon} event={event} group={selectedGroup} refreshAction={loadGroups} /> */}
        {/* } */}
        {/* {selectedGroup &&  */}
          {/* <OpenADDGroupDialog IconElement={PencilIcon} event={event} group={selectedGroup} refreshAction={loadGroups} /> */}
          {/* <OpenGroupEditDialog IconElement={PencilIcon} event={event} group={selectedGroup} refreshAction={loadGroups}/>  */}
        {/* } */}
      </CardHeader>
      <CardContent className="w-full my-3 flex-row items-center">
      {/* <CardContent> */}
        {/* {!selectedGroup && <GroupADD id_event={event.id} refreshAction={loadGroups}/> } */}
        {loading && 
          <>
            <PeopleItemPhaceholder />
            <PeopleItemPhaceholder />
          </>
        }
        {!loading && peoples.length == 0 && <PeopleItemNotFound />}
        <div className="flex text-center border-b border-gray-500 cursor-pointer">
            <Table className="border p-3 mb-3 flex flex-col items-center rounded md:flex-row">
            <TableBody className="w-full items-center">
              {!loading && peoples.length > 0 && 
              peoples.map( (item) => (
                  <PeopleItem key={item.id} item={item} onEdit={handleEditButton} refreshAction={loadGroups} />
              ) )
              }
            </TableBody>
            </Table>
          </div>
      </CardContent>
    </Card>
  );
}