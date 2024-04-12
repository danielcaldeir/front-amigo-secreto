import { req } from "@/api/axios";
import { Event } from "@/types/Event";
import { ResultSearch } from "@/types/ResultSearch";

// *********get('/ping', (req, res) => { res.json({pong: true})});
// *********get('/events/:id', event.getEvent);
// *********get('/events/search/:id_event/:cpf', people.getSearch);
// router.get('/events/search/:id_event', people.getSearch);

export const getEvent = 
async (id: number): Promise<Event | false> => {
    const json = await req.get('/events/'+id);
    return json.data.events as Event ?? false;
}

export const searchCPF = 
async (eventID: number, cpf: string): Promise<ResultSearch | false> => {
    const json = await req.get('/events/search/'+eventID+'?cpf='+cpf);
    if (json.data.people && json.data.peopleMatched){
        return json.data as ResultSearch;
    }
    return false;
}