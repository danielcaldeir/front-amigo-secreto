import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { req } from "@/api/axios";

export const pingAdmin = async () => {
    try {
        const token = getCookie('token', { cookies });
        await req.get('/admin/ping', {
            headers: {'Authorization': `Token ${token}`}
        });
        return true;
    } catch (error) {
        return false;
    }
}

export const ping = async () => {
    try {
        const pong = await req.get('/ping');
        return pong;
    } catch (error) {
        return false;
    }
}