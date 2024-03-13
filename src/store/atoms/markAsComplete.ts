import {atom} from "recoil";

interface markAsCompleteParams {
    isValid : boolean
    path? : string,
    isCompleted? : boolean
}

export const markAsCompleteAtom = atom<markAsCompleteParams>({
    key : "markAsCompleteAtom",
    default : {isValid : false}
})