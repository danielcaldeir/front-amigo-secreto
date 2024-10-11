import { ShowWarning } from "@/components/helpers/AlertHelpers";
import { OpenDelEventModal } from "@/components/helpers/AlertDialogHelpers";
import { ItemButton } from "@/components/helpers/ButtonHelpers";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Event } from "@/types/Event";
import { LinkIcon, PencilIcon, Trash2Icon, } from "lucide-react";
import { AdminOpenDialog } from "@/components/admin/AdminOpenDialog";
import { ModalScreens } from "@/types/modalScreens";

type EventItemProps = {
    item: Event;
    refreshAction: () => void;
    openModal: (event: Event, screens: ModalScreens) => void;
}

export const EventItem = ({item, refreshAction, openModal}: EventItemProps) => {
    const handleEditButton = () => openModal(item, 'edit');
    const handleDelButton = () => openModal(item, 'del');

    return (
        <>
        {/* <Table className="border p-3 mb-3 flex flex-col items-center rounded md:flex-row"> */}
            {/* <TableBody className="w-full items-center"> */}
                <TableRow className="w-full items-center ">
                    <TableCell className="flex-1 p-3 mb-3 w-full">
                        <div key={item.id}>{item.title}</div>
                    </TableCell>
                    <TableCell className="flex-1 ">
                        <div className="flex items-center gap-1 mt-2 md:flex-row">
                            {item.status && 
                                <ItemButton 
                                    IconElement={LinkIcon} 
                                    label="" 
                                    href={`/events/${item.id}`} 
                                    target="_blank" 
                                />
                            }
                            <AdminOpenDialog 
                                IconElement={PencilIcon} 
                                label="" 
                                title="Editando um Evento" 
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
                            <ItemButton 
                                IconElement={Trash2Icon} 
                                label="" 
                                onClick={handleDelButton} 
                            />
                        </div>
                    </TableCell>
                </TableRow>
            {/* </TableBody> */}
        {/* </Table> */}
        </>
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
