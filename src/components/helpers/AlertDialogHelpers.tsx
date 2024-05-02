import { getAdminEvent } from "@/api/admin";
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
import { ItemButton } from "./ButtonHelpers";

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
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
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