import { ItemButton } from "@/components/helpers/ButtonHelpers";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from "lucide-react";
import { TabInfoDialog } from "./EventEdit";
import { Event } from "@/types/Event";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type EditAlertDialogProps = {
  IconElement: LucideIcon;
  event?: Event;
  label?: string;
  title?: string;
  onClick?: () => void;
  refreshAction: () => void;
}

export function OpenEditAlertDialog({IconElement, event, label, title, onClick, refreshAction}: EditAlertDialogProps) {
  // const handleADDEvent = async() => {
  //     const ping = await getAdminEvent(2);
  //     console.log("ADD Event: "+ping);
  // }
  
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
                          <TabInfoDialog event={event} refreshAction={refreshAction} />
                        </TabsContent>
                        
                        <TabsContent value="groups">
                          <Card>
                            <CardHeader>
                              <CardTitle>Groups</CardTitle>
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

