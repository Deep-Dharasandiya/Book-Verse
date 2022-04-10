import { domain } from "../constant/NetworkDomain";
import { loadingOff, aleartOn } from "../context/actions/commonActions";
import NetInfo from "@react-native-community/netinfo";
export default async function postMethod(body,name) {
    const isConnect = await NetInfo.fetch();
    if (isConnect.isConnected) {
        return fetchData(body, name)
    } else {
        loadingOff();
        aleartOn("Your device was offline");
        return false;
    }
}

async function fetchData(body,name){
    const res = await fetch(`${domain}${name}`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    let response = false;
    if (res.status == 200) {
        response = await res.json();
        loadingOff();
        return response;
    } else {
        loadingOff();
        return response;
    }
}
