import { deleteAdminEvent, deleteAdminPeople, getAdminEvent } from "@/api/admin";
import { Event } from "@/types/Event";
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
import { LucideIcon } from "lucide-react";
import { ItemButton } from "@/components/helpers/ButtonHelpers";
import { People } from "@/types/People";

type AlertDialogProps = {
    IconElement: LucideIcon;
    label?: string;
    onClick?: () => void;
}

export function OpenModalAlertDialog({IconElement, label, onClick}: AlertDialogProps) {
    const handleADDEvent = async() => {
        const ping = await getAdminEvent(2);
        console.log("ADD Event: "+ping);
    }
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <ItemButton IconElement={IconElement} onClick={onClick} label={label} />
                {/* <Button variant="ghost" size="icon" className="cursor-pointer"> */}
                {/* <div className="p-3 flex flex-col justify-center items-center gap-2 md:flex-row"> */}
                    {/* <div><IconElement /></div> */}
                    {/* {label && <div>{label}</div>} */}
                {/* </div> */}
                {/* </Button> */}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja excluir este Item?</AlertDialogTitle>
                    {/* <AlertDialogDescription> */}
                        {/* This action cannot be undone. This will permanently delete your */}
                        {/* account and remove your data from our servers. */}
                    {/* </AlertDialogDescription> */}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleADDEvent}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

type AlertDialogEventProps = {
    IconElement: LucideIcon;
    label?: string;
    onClick?: () => void;
    event: Event;
    refreshAction: () => void;
    // openModal?: (event: Event) => void;
}

export function OpenDelEventModal({IconElement, event, refreshAction, label, onClick}: AlertDialogEventProps) {
    const handleDelEvent = async() => {
        console.log("Handle Del Event Item!!");
        // if (confirm('Tem certeza que deseja excluir este Evento?')) {
            await deleteAdminEvent(event.id);
            refreshAction();
        // }
    }
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <ItemButton IconElement={IconElement} onClick={onClick} label={label} />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja excluir este Evento?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelEvent}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

type AlertDialogPeopleProps = {
    IconElement: LucideIcon;
    label?: string;
    onClick?: () => void;
    people: People;
    refreshAction: () => void;
    // openModal?: (event: Event) => void;
}

export function OpenDelPeopleModal({IconElement, people, refreshAction, label, onClick}: AlertDialogPeopleProps) {
    const handleDelPeople = async() => {
        console.log("Handle Del People Item!!");
        if (confirm('Tem certeza que deseja excluir este Evento?')) {
            // await deleteAdminPeople(1,2,people.id);
            refreshAction();
        }
    }
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <ItemButton IconElement={IconElement} onClick={onClick} label={label} />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja excluir esta Pessoa?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelPeople}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}