import {$host} from "./index";

export const checkPass = async (pass) => {
    try {
        const {data} = await $host.post("api/admin/checkPass", pass)
        return data
    } catch (e) {
        alert(e)
        console.log(e)
    }
}

export const deletePoint = async (id) => {
    try {
        const {data} = await $host.post("api/admin/delete", id)
        return data
    } catch (e) {
        alert(e)
        console.log(e)
    }
}