import {$host} from "./index";

export const getVisits = async (req, res) => {
    const {data} = await $host.get("api/visitors")
    return data[0].amount
}
