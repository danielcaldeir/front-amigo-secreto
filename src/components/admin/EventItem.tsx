import { ShowWarning } from "@/components/helpers/AlertHelpers";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableRow 
} from "@/components/ui/table";
import { Event } from "@/types/Event";
import { ItemButton } from "../util/ItemButton";
import { LinkIcon, MessageSquareXIcon, PencilIcon, Trash2Icon, TrashIcon } from "lucide-react";

type EventItemProps = {
    item: Event;
    refreshAction: () => void;
    openModal: (event: Event) => void;
}
export const EventItem = ({item, refreshAction, openModal}: EventItemProps) => {
    const handleEditButton = () => openModal(item);
    const handleDeleteButton = () => {

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
                            <ItemButton IconElement={PencilIcon} label="" onClick={handleEditButton} />
                            <ItemButton IconElement={Trash2Icon} label="" onClick={handleDeleteButton} />
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