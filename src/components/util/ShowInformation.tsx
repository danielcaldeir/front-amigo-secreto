import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon, LucideIcon } from "lucide-react";

type Props = {
    // IconElement: LucideIcon;
    message: string;
}
export const ShowInformation = ({message}: Props) => {
    return (
        <Alert variant="destructive">
            {/* <RocketIcon className="h-4 w-4" /> */}
            {/* <MessageSquareWarningIcon className="h-4 w-4" /> */}
            {/* <MessageCircleWarningIcon className="h-4 w-4" /> */}
            <AlertTriangleIcon className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Alert>
    );
}