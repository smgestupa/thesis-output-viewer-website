import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const videoStreams = writable(browser ? JSON.parse(localStorage.getItem("videoStreams")) || []: []);

videoStreams.subscribe((value) => {
    if (browser) {
        localStorage.setItem("videoStreams", JSON.stringify(value));
    }
});