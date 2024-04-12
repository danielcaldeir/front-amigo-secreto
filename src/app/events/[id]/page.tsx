import { getEvent } from "@/api/site";
import { Search } from "@/components/site/Search";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect } from "next/navigation";


type Props = {
    params: {
        id: string;
    } 
}

const Page = async ({params}: Props) => {
    const idEvent = parseInt(params.id);
    const eventItem = await getEvent(idEvent);
    if (!eventItem) return redirect('/');
    if (!eventItem.status) return redirect('/');

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <Card className="w-full">
                <CardHeader className="outline-none items-center">
                    {/* <Link href="/"> */}
                        {/* <h1 className="text-xl text-red-200 font-semibold text-center"> */}
                            {/* <span >Amigo</span> Secreto */}
                        {/* </h1> */}
                    {/* </Link> */}
                    <CardTitle>{eventItem.title}</CardTitle>
                    <CardDescription>{eventItem.description}</CardDescription>
                </CardHeader>
            </Card>
            <Card>
                {/* <p>Home - Amigo Secreto</p> */}
                <Search id={eventItem.id}/>
            </Card>
            <Card>
                <CardFooter>
                    <Label>Criado por Daniel Caldeira</Label>
                </CardFooter>
            </Card>
        </main>
    );
}

export default Page;