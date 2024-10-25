import { req } from "@/api/axios";
import { Event } from "@/types/Event";
import { Group } from "@/types/Group";
import { People } from "@/types/People";
import { getCookie } from "cookies-next";
// import { cookies } from "next/headers";

// ADMINISTRACAO
// ********post('/login', auth.login);
// ********get('/ping', auth.validate, (req, res) => { res.json({pong: true, admin: true})});
export const login = 
async (password: string): Promise<string | false> => {
    try {
        const json = await req.post('/admin/login', {password});
        return json.data.token ?? false;
    } catch (error) {
        return false;
    }
}

// ADMINISTRACAO ---> EVENTS
// router.get('/events', auth.validate, event.getAll);
// router.get('/events/:id', auth.validate, event.getEvent);
// router.post('/events', auth.validate, event.addEvent);
// router.put('/events/:id', auth.validate, event.updateEvent);
// router.delete('/events/:id', auth.validate, event.deleteEvent);
export const getAdminEvents = 
async (): Promise<Event[] | []> => {
    try {
        const token = getCookie('token');
        const json = await req.get('/admin/events/', {
            headers: {'Authorization': `Token ${token}`}
        });
        return json.data.events as Event[] ?? [];
    } catch (error) {
        return [];
    }
}

export const getAdminEvent = 
async (id: number): Promise<Event | false> => {
    try {
        const token = getCookie('token');
        const json = await req.get('/admin/events/'+id, {
            headers: {'Authorization': `Token ${token}`}
        });
        return json.data.events as Event ?? false;
    } catch (error) {
        return false;
    }
}

type AddEventData = {
    title: string;
    description: string;
    grouped: boolean;
}

export const addAdminEvent = 
async (data: AddEventData): Promise<Event | false> => {
    try {
        const token = getCookie('token');
        const json = await req.post('/admin/events/', data, 
            { headers: {'Authorization': `Token ${token}`} });
        return json.data.events as Event ?? false;
    } catch (error) {
        return false;
    }
}

type UpdateEventData = {
    title?: string;
    description?: string;
    grouped?: boolean;
    status?: boolean;
}

export const updateAdminEvent = 
async (id:number, data: UpdateEventData): Promise<Event | false> => {
    try {
        const token = getCookie('token');
        const json = await req.put('/admin/events/'+id, data, 
            { headers: {'Authorization': `Token ${token}`} });
        if (json.data.success) {
            return json.data.events as Event ?? false;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export const deleteAdminEvent = 
async (id: number): Promise<true | false> => {
    try {
        const token = getCookie('token');
        const json = await req.delete('/admin/events/'+id, {
            headers: {'Authorization': `Token ${token}`}
        });
        return !json.data.error;
    } catch (error) {
        return false;
    }
}
// ADMINISTRACAO ---> GRUPOS
// router.get('/groups/:id_event', auth.validate, group.getAll);
// router.get('/groups/:id_event/:id_group', auth.validate, group.getGroup);
// router.post('/groups/:id_event', auth.validate, group.addGroup);
// router.put('/groups/:id_event/:id_group', auth.validate, group.updateGroup);
// router.delete('/groups/:id_event/:id_group', auth.validate, group.deleteGroup);
export const getAdminGroups = 
async (id_event:number ): Promise<Group[] | []> => {
    try {
        const token = getCookie('token');
        const json = await req.get('/admin/groups/'+id_event, {
            headers: {'Authorization': `Token ${token}`}
        });
        return json.data.groups as Group[] ?? [];
    } catch (error) {
        return [];
    }
}

export const getAdminGroup = 
async (id_event:number, id: number): Promise<Group | false> => {
    try {
        const token = getCookie('token');
        const json = await req.get('/admin/groups/'+id_event+'/'+id, {
            headers: {'Authorization': `Token ${token}`}
        });
        return json.data.groups as Group ?? false;
    } catch (error) {
        return false;
    }
}

type AddGroupData = {
    name: string;
}

export const addAdminGroup = 
async (id_event:number, data: AddGroupData): Promise<Group | false> => {
    try {
        const token = getCookie('token');
        const json = await req.post('/admin/groups/'+ id_event, data, 
            { headers: {'Authorization': `Token ${token}`} });
        return json.data.groups as Group ?? false;
    } catch (error) {
        return false;
    }
}

type UpdateGroupData = {
    name?: string;
}

export const updateAdminGroup = 
async (id_event:number, id:number, data: UpdateGroupData): Promise<Group | false> => {
    try {
        const token = getCookie('token');
        const json = await req.put('/admin/groups/'+id_event+'/'+id, data, 
            { headers: {'Authorization': `Token ${token}`} });
        // if (json.data.success) {
        return json.data.groups as Group ?? false;
        // } else {
            // return false;
        // }
    } catch (error) {
        return false;
    }
}

export const deleteAdminGroup = 
async (id_event:number, id: number): Promise<true | false> => {
    try {
        const token = getCookie('token');
        const json = await req.delete('/admin/groups/'+id_event+'/'+id, {
            headers: {'Authorization': `Token ${token}`}
        });
        return !json.data.error;
    } catch (error) {
        return false;
    }
}
// PEOPLES
// router.get('/peoples/group/:id_event/:id_group', auth.validate, people.getAll);
// router.get('/peoples/event/:id_event', auth.validate, people.getAll);
// router.get('/peoples/:id_event/:id_group/:id', auth.validate, people.getPeople);
// router.get('/peoples/id/:id_event/:id', auth.validate, people.getPeople);
// router.get('/peoples/cpf/:id_event/:cpf', auth.validate, people.getPeople);
// router.post('/peoples/:id_event/:id_group', auth.validate, people.addPeople);
// router.put('/peoples/:id_event/:id_group/:id', auth.validate, people.updatePeople);
// router.delete('/peoples/:id_event/:id_group/:id', auth.validate, people.deletePeople);
export const getAdminPeoples = 
async (id_event:number, id_group:number ): Promise<People[] | []> => {
    try {
        const token = getCookie('token');
        const json = await req.get('/admin/peoples/group/'+id_event+'/'+id_group, {
            headers: {'Authorization': `Token ${token}`}
        });
        return json.data.peoples as People[] ?? [];
    } catch (error) {
        return [];
    }
}

export const getAdminAllPeoples = 
async (id_event:number, id_group:number ): Promise<People[] | []> => {
    try {
        const token = getCookie('token');
        const json = await req.get('/admin/peoples/event/'+id_event, {
            headers: {'Authorization': `Token ${token}`}
        });
        return json.data.peoples as People[] ?? [];
    } catch (error) {
        return [];
    }
}

export const getAdminOnePeople = 
async (id_event:number, id_group:number, id:number ): Promise<People | false> => {
    try {
        const token = getCookie('token');
        const json = await req.get('/admin/peoples/'+id_event+'/'+id_group+'/'+id, {
            headers: {'Authorization': `Token ${token}`}
        });
        return json.data.peoples as People ?? false;
    } catch (error) {
        return false;
    }
}

export const getAdminPeopleID = 
async (id_event:number, id:number ): Promise<People | false> => {
    try {
        const token = getCookie('token');
        const json = await req.get('/admin/peoples/id/'+id_event+'/'+id, {
            headers: {'Authorization': `Token ${token}`}
        });
        return json.data.peoples as People ?? false;
    } catch (error) {
        return false;
    }
}

export const getAdminPeopleCPF = 
async (id_event:number, cpf:number ): Promise<People | false> => {
    try {
        const token = getCookie('token');
        const json = await req.get('/admin/peoples/cpf/'+id_event+'/'+cpf, {
            headers: {'Authorization': `Token ${token}`}
        });
        return json.data.peoples as People ?? false;
    } catch (error) {
        return false;
    }
}

type AddPeopleData = {
    name: string;
    cpf: string;
}

export const addAdminPeople = 
async (id_event:number, id_group:number, data: AddPeopleData): Promise<People | false> => {
    try {
        const token = getCookie('token');
        const json = await req.post('/admin/peoples/'+id_event+"/"+id_group, data, 
            { headers: {'Authorization': `Token ${token}`} });
        return json.data.people as People ?? false;
    } catch (error) {
        return false;
    }
}

type UpdatePeopleData = {
    name?: string;
    cpf?: string;
}

export const updateAdminPeople = 
async (id_event:number, id_group:number, id:number, data: UpdatePeopleData): Promise<People | false> => {
    try {
        const token = getCookie('token');
        const json = await req.put('/admin/peoples/'+id_event+'/'+id_group+'/'+id, data, 
            { headers: {'Authorization': `Token ${token}`} });
        return json.data.people as People ?? false;
    } catch (error) {
        return false;
    }
}

export const deleteAdminPeople = 
async (id_event:number, id_group:number, id: number): Promise<true | false> => {
    try {
        const token = getCookie('token');
        const json = await req.delete(`/admin/peoples/${id_event}/${id_group}/${id}`, {
            headers: {'Authorization': `Token ${token}`}
        });
        return !json.data.error;
    } catch (error) {
        return false;
    }
}