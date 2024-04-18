import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon, LucideIcon, MessageCircleWarningIcon, MessageSquareWarningIcon } from "lucide-react";

type Props = {
    message: string;
    IconElement?: LucideIcon;
}
export const ShowInformation = ({message, IconElement}: Props) => {
    return (
        <Alert variant="default">
            {/* <RocketIcon className="h-4 w-4" /> */}
            {/* <MessageSquareWarningIcon className="h-4 w-4" /> */}
            {/* <MessageCircleWarningIcon className="h-4 w-4" /> */}
            <AlertTriangleIcon className="h-4 w-4" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Alert>
    );
}


export const ShowWarning = ({message, IconElement}: Props) => {
    return (
        <Alert variant="destructive">
            {/* <RocketIcon className="h-4 w-4" /> */}
            <MessageSquareWarningIcon className="h-4 w-4" />
            {/* <MessageCircleWarningIcon className="h-4 w-4" /> */}
            {/* <AlertTriangleIcon className="h-4 w-4" /> */}
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Alert>
    );
}