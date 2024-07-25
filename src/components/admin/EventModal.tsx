"use client"

import { ErrorItem } from "@/lib/getErrorFromZod";
import { Event } from "@/types/Event";
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ItemButton } from "@/components/helpers/ButtonHelpers";
import { Input } from "@/components/ui/input";
import { ModalTab } from "@/types/modalScreens";
import { LucideIcon } from "lucide-react";

type EditProps = {
    event: Event | undefined;
    refreshAction: () => void;
}

export const EventEdit = ({ event, refreshAction }: EditProps) => {
    const [tab, setTab] = useState<ModalTab>('info');
    const [titleField, setTitleField] = useState('');
    const [descriptionField, setDescriptionField] = useState('');
    const [groupedField, setGroupedField] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorItem[]>([]);

    if(!event) return null;

    // const handleAddButton = async() => {
    //     setError([]);
    //     const data = formSchema.safeParse({titleField, descriptionField, groupedField });
    //     if (!data.success) { return(setError(getErrorFromZod(data.error))); }
    //     setLoading(true);
    //     const eventItem = await addAdminEvent({
    //         title: data.data.titleField,
    //         description: data.data.descriptionField,
    //         grouped: data.data.groupedField
    //     });
    //     setLoading(false);
    //     if (eventItem) { refreshAction(); }
    // }

    return (
        <>
        {/* <Card> */}
            {/* <CardContent> */}
                {/* <div className="flex text-center border-b border-gray-500 cursor-pointer"></div> */}
                {/* <div> */}
                    {/* {tab === 'info'   && ''} */}
                    {/* {tab === 'groups' && ''} */}
                    {/* {tab === 'people' && ''} */}
                {/* </div> */}
            {/* </CardContent> */}
        {/* </Card> */}
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">info</TabsTrigger>
            <TabsTrigger value="groups">groups</TabsTrigger>
            <TabsTrigger value="people">people</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                {/* <CardDescription> */}
                  {/* Make changes to your account here. Click save when you're done. */}
                {/* </CardDescription> */}
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="groups">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                {/* <CardDescription> */}
                  {/* Change your password here. */}
                {/* </CardDescription> */}
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="people">
            <Card>
              <CardHeader>
                <CardTitle>People</CardTitle>
                {/* <CardDescription> */}
                  {/* Change your password here. */}
                {/* </CardDescription> */}
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </>
    );
}

type EditAlertDialogProps = {
  IconElement: LucideIcon;
  event?: Event;
  label?: string;
  title?: string;
  onClick?: () => void;
  refreshAction: () => void;
}

export function OpenEditAlertDialog({IconElement, event, label, title, onClick, refreshAction}: EditAlertDialogProps) {
  const handleADDEvent = async() => {
      const ping = await getAdminEvent(2);
      console.log("ADD Event: "+ping);
  }
  
  return (
      <AlertDialog>
          <AlertDialogTrigger asChild>
              <ItemButton IconElement={IconElement} onClick={onClick} label={label} />
          </AlertDialogTrigger>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>{title}</AlertDialogTitle>
                  <AlertDialogDescription>
                      <EventEdit event={event} refreshAction={refreshAction} />
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleADDEvent}>Continue</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
  );
}