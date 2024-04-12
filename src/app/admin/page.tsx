import { pingAdmin } from "@/api/server";
import { AdminPage } from "@/components/admin/AdminPage";
import { Card, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

const Page = async () => {
    const logged = await pingAdmin();
    if (!logged) return redirect('/admin/login');
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-20">
            <Card>
                    {/* <p>ADM - Administracao do Amigo Secreto</p> */}
                    <AdminPage />
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