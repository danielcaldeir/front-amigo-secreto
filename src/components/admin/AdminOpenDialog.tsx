import { ItemButton } from "@/components/helpers/ButtonHelpers";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon, PencilRulerIcon } from "lucide-react";
// import { TabInfoDialog } from "@/components/admin/event/EventTabInfo";
import { Event } from "@/types/Event";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { TabGroupsDialog } from "@/components/admin/group/GroupTabInfo";
import { useEffect, useState } from "react";
import { getAdminEvent, getAdminGroups } from "@/api/admin";
import { Group } from "@/types/Group";
import { ClickEditAlertDialog } from "@/components/admin/event/EventEdit";
import { TabPeopleDialog } from "@/components/admin/people/PeopleTabInfo";

type OpenDialogProps = {
  IconElement: LucideIcon;
  event?: Event;
  label?: string;
  title?: string;
  onClick?: () => void;
  refreshAction: () => void;
}

export function AdminOpenDialog({IconElement, event, label, title, onClick, refreshAction}: OpenDialogProps) {
  const [loading, setLoading] = useState(false);
  // const [events, setEvents] = useState<Event[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  // const loadEvent = async (eventId: number) => {
  //   // setModalScreen(null);
  //   setLoading(true);
  //   const eventList = await getAdminEvent(eventId);
  //   setEvents(eventList);
  //   setLoading(false);
  // }

  const loadGroups = async (eventID: number) => {
    // setSelectedGroup(null);
    setLoading(true);
    const groupList = await getAdminGroups(eventID);
    setGroups(groupList);
    setLoading(false);
  }

  useEffect(() => {
    if (event){
      // loadEvent(event.id);
      loadGroups(event.id)
    }
  },[event]);

  return (
      <Dialog>
        <DialogTrigger asChild>
          <ItemButton IconElement={IconElement} onClick={onClick} label={label} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                  <Tabs defaultValue="info" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="info">info</TabsTrigger>
                      <TabsTrigger value="groups">groups</TabsTrigger>
                      <TabsTrigger value="people">people</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="info">
                      {/* <TabInfoDialog event={event} refreshAction={refreshAction} /> */}
                      <ClickEditAlertDialog event={event} title="Editar um Evento" refreshAction={refreshAction} />
                    </TabsContent>
                    
                    <TabsContent value="groups">
                      <TabGroupsDialog event={event} groups={groups} refreshAction={refreshAction} />
                    </TabsContent>
                    
                    <TabsContent value="people">
                      <TabPeopleDialog event={event} groups={groups} refreshAction={refreshAction}/>
                      {/* <Card> */}
                        {/* <CardHeader> */}
                          {/* <CardTitle>People</CardTitle> */}
                          {/* <CardDescription> */}
                            {/* Change your password here. */}
                          {/* </CardDescription> */}
                        {/* </CardHeader> */}
                        {/* <CardContent className="space-y-2"> */}
                          {/* <div className="space-y-1"> */}
                            {/* <Label htmlFor="current">Current password</Label> */}
                            {/* <Input id="current" type="password" /> */}
                          {/* </div> */}
                          {/* <div className="space-y-1"> */}
                            {/* <Label htmlFor="new">New password</Label> */}
                            {/* <Input id="new" type="password" /> */}
                          {/* </div> */}
                        {/* </CardContent> */}
                        {/* <CardFooter> */}
                          {/* <Button>Save password</Button> */}
                        {/* </CardFooter> */}
                      {/* </Card> */}
                    </TabsContent>
                  </Tabs>
                </DialogDescription>
          </DialogHeader>
          {/* <DialogFooter> */}
                    {/* <DialogCancel >Cancel</DialogCancel> */}
                    {/* <DialogAction >Continue</DialogAction> */}
          {/* </DialogFooter> */}
        </DialogContent>
      </Dialog>
    );
}

