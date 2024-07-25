import { ShowWarning } from "@/components/helpers/AlertHelpers";
import { 
    OpenDelEventModal, 
    OpenModalAlertDialog 
} from "@/components/helpers/AlertDialogHelpers";
import { 
    ButtonDisabled, 
    ItemButton, 
    ShowButtonReset, 
    ShowButtonSubmit 
} from "@/components/helpers/ButtonHelpers";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Event } from "@/types/Event";
// import { ItemButton } from "@/components/util/ItemButton";
import { 
    LinkIcon, 
    LucideIcon, 
    MessageSquareXIcon, 
    PencilIcon, 
    Trash2Icon, 
    TrashIcon 
} from "lucide-react";
import { addAdminEvent, deleteAdminEvent, getAdminEvent } from "@/api/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
// import { Button } from "@/components/ui/button";
import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorItem, getErrorFromZod } from "@/lib/getErrorFromZod";
import { OpenEditAlertDialog } from "@/components/admin/AlertDialog";
// import { Checkbox } from "@/components/ui/checkbox";

type EventItemProps = {
    item: Event;
    refreshAction: () => void;
    openModal: (event: Event) => void;
}

export const EventItem = ({item, refreshAction, openModal}: EventItemProps) => {
    const handleEditButton = () => openModal(item);

    const handleDeleteButton = async () => {
        console.log("Deletando Item!!");
        if (confirm('Tem certeza que deseja excluir este Evento?')) {
            await deleteAdminEvent(item.id);
            refreshAction();
        }
    }

    return (
        <Table className="border p-3 mb-3 flex flex-col items-center rounded md:flex-row">
            <TableBody>
                <TableRow>
                    <TableCell><div key={item.id}>{item.title}</div></TableCell>
                    <TableCell>
                        <div className="flex items-center gap-1 mt-2 md:flex-row">
                            {item.status && 
                                <ItemButton 
                                    IconElement={LinkIcon} 
                                    label="" 
                                    href={`/events/${item.id}`} 
                                    target="_blank" 
                                />
                            }
                            <OpenEditAlertDialog 
                                IconElement={PencilIcon} 
                                label="" 
                                title="Editando um Evento" 
                                // onClick={handleEditButton} 
                                event={item} 
                                refreshAction={refreshAction} 
                            />
                            <ItemButton 
                                IconElement={PencilIcon} 
                                label="" 
                                onClick={handleEditButton} 
                            />
                            <OpenDelEventModal 
                                IconElement={Trash2Icon} 
                                event={item} 
                                label="" 
                                refreshAction={refreshAction} 
                            />
                            {/* <ItemButton IconElement={Trash2Icon} label="" onClick={handleDeleteButton} /> */}
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export const EventItemPhaceholder = () => {
    return (
        <div className="w-full h-16 border border-gray-700 rounded mb-3 
        bg-gradient-to-r from-gray-700 to-gray-950 animate-pulse">
        </div>
    );
}

export const EventItemNotFound = () => {
    return (
        <div className="text-center py-4 ">
            <ShowWarning message="Nao ha eventos cadastrados!!!"/>
        </div>
    );
}




