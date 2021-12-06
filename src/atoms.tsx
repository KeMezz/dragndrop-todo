import { atom } from "recoil";

export enum categories {
    "SCHEDULED",
    "DOING",
    "DONE"
}

export interface toDoInterface {
    id: number,
    text: string,
}

interface toDoStateInterface {
  [key: string]: toDoInterface[];
}

export const toDosState = atom<toDoStateInterface>({
  key: "toDosState",
  default: localStorage.getItem("toDos")
    ? JSON.parse(localStorage.getItem("toDos") as any)
    : {
        SCHEDULED: [],
        DOING: [],
        DONE: [],
      },
});