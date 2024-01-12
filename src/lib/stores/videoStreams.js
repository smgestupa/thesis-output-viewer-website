import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const videoStreams = writable(browser ? localStorage.getItem("videoStreams") : []);

videoStreams.subscribe((value) => {
    if (browser) {
        const currVideoStreams = JSON.parse(localStorage.getItem("videoStreams"));
        localStorage.setItem("videoStreams", JSON.stringify([...currVideoStreams, value]));
        console.log(currVideoStreams);
    }
});