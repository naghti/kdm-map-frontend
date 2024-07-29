import {$host} from "./index";

export const getAll = async (req, res) => {
    const {data} = await $host.get("api/points")
    return data
}
export const create = async (formData) => {
    try {
        const {data} = await $host.post("api/points", formData)
        return data
    } catch (e) {
        alert(e)
        console.log(e)
    }
}