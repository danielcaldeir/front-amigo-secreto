"use client";

import { getAdminEvents } from "@/api/admin";
import { Event } from "@/types/Event";
import { useEffect, useState } from "react";
import { Card, CardTitle } from "../ui/card";

export const AdminPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    const loadEvents = async () => {
        setLoading(true);
        const eventList = await getAdminEvents();
        setEvents(eventList);
        setLoading(false);
    }

    useEffect(() => {
        loadEvents();
    },[]);

    const handleSearchButton = async (cpf: string) => {
        // if (!cpf) return( alert('Nao foi informado um CPF'));
        // setLoading(true);
        // const cpfResult = await searchCPF(id, cpf);
        // setLoading(false);
        // if (!cpfResult) return ( alert('Nao Encontramos o seu CPF') );
        // setResult(cpfResult);
    }

    return(
        <section className="bg-gray-900 p-5 rounded text-white w-full">
            <Card>
                <Card>Eventos</Card>
                <Card>
                    {loading && <div>Carregando ...</div>}
                    {!loading && events.length > 0 && events.map( item => [<div key={item.id}>{item.title}</div>]) }
                    {!loading && events.length == 0 && <CardTitle>Nao foi possivel carregar nenhum Evento</CardTitle>  }
                </Card>
            </Card>
        </section>
    );
}