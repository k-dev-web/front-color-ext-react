import {BehaviorSubject} from "rxjs";
import {Api} from "./api";


export const ColorsProvider = () => {
    const {get} = Api();
   /* const loaderSubject = new BehaviorSubject<any>({
        countColors: [],
        countSites: [],
        colorList: [],
        countItems: 1

    });*/
   // const loaderState = loaderSubject.asObservable();
    const getColors = async (page: number) => {
        let seq = await get('colors', {page: page});
        return seq
    }
    return { getColors}
}
