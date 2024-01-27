<script>
    import { onMount, onDestroy } from "svelte";
    import { invalidateAll } from "$app/navigation";
    import { navigating } from "$app/stores";
    import { goto } from "$app/navigation";
    import { videoStreams } from "$lib/stores/videoStreams.js";
    import { io } from "socket.io-client";
    export let data;
    const { name } = data;

    console.log(name);

    let socket,
        loading = true,
        paused = true,
        record = false,
        totalObjects = 0,
        detectedLabels = [],
        latency = 0,
        image = "",
        consoleLogs = [];

    // const startVideoStream = () => {
    //     socket.on(`${name}_stream_test`, (data) => {
    //         const { information } = data;

    //         totalObjects = information["total_objects"];
    //         detectedLabels = information["detected_labels"];
    //         latency = information["latency"];

    //         image = data["image"];
    //     });

    //     paused = false;
    // }

    // const pauseVideoStream = () => {
    //     socket.off(`${name}_stream_test`);
    //     paused = true;
    // }

    // const recordVideoStream = async () => {
    //     const req = await fetch(`${name}/settings?record=true`);
        
    //     if (req.status === 200) {
    //         record = true;
    //         consoleLogs = [`Now recording camera ${name}.`, ...consoleLogs];
    //     } else {
    //         consoleLogs = [`Could not starting recording. Please try again later.`, ...consoleLogs];
    //     }
    // }

    onMount(() => {
        // invalidateAll();
    //     console.log("ON MOUNT");

    //     // const videoStream = $videoStreams.filter(
    //     //     (value) => value["streamName"] === name
    //     // )[0];

    //     // if (!videoStream) goto("/");

    //     // socket = io(videoStream["ipAddress"], {autoConnect: true});

    //     // socket.emit("videostreams_get", name, videoStream["ipAddress"]);

    //     // socket.on(`${name}_stream_test`, (data) => {
    //     //     const { information } = data;

    //     //     totalObjects = information["total_objects"];
    //     //     detectedLabels = information["detected_labels"];
    //     //     latency = information["latency"];

    //     //     image = data["image"];
    //     // });

    //     // socket.on(`${name}_console`, (data) => {
    //     //     consoleLogs = [data["message"], ...consoleLogs];
    //     // });

    //     // socket.on(`${name}_start`, (data) => {
    //     //     if (data === "true") {
    //     //         loading = false;
    //     //         paused = false;
    //     //     }
    //     // });

    //     // socket.on(`${name}_stop`, (data) => {
    //     //     if (data === "stop")
    //     //         paused = true;
    //     // });

        return () => {
            console.log("leave");
        }
    });

    $: {
        if ($navigating) {
            invalidateAll();
        }
    }

    // onDestroy(() => {
    //     if (socket) socket.disconnect();
    // });
</script>

<header>
    <h1 class="text-5xl font-bold">{data.name}</h1>
    <h2 class="text-[1.5rem]">Watch the video stream from the camera {data.name}.</h2>
</header>

<div class="flex-grow mt-[2.0625rem] px-5 pt-5 pb-10 bg-[#87D68D] rounded-t-lg [&>*]:mt-[1.5625rem] [&>*:first-child]:mt-0">
    <!-- Controls -->
    <section class="flex gap-x-5">
        <!-- <button class="block rounded border-b-4 border-[#006600] bg-[#009900] px-6 py-2 font-bold hover:border-[#009900] hover:bg-[#00B800] text-white disabled:border-gray-700 disabled:bg-gray-500" disabled={loading || !paused}>
            Start Video
        </button>
        <button class="rounded border-b-4 border-blue-700 bg-blue-500 px-6 py-2 font-bold hover:border-blue-500 hover:bg-blue-400 text-white disabled:border-gray-700 disabled:bg-gray-500" disabled={loading || paused}>
            Pause Video
        </button>
        <button class="rounded border-b-4 border-[#FF5147] bg-[#FF6961] px-6 py-2 font-bold hover:border-[#FF6961] hover:bg-[#FF8B85] text-white disabled:border-gray-700 disabled:bg-gray-500" disabled={loading || record}>
            Record Video
        </button> -->
    </section>
    <!-- Feed -->
    <div class="flex gap-x-5">
        <img class="bg-black w-full max-w-[50rem] h-[37.5rem]" src={image ? `data:image/jpeg;base64, ${image}` : "/favicon.png"} alt="">
        <section class="text-lg flex-grow">
            <p>{paused ? "The video stream is not running or currently paused." : `The modal has detected ${totalObjects} waste objects from the camera.`}</p>
            <ul class="detected-labels grid grid-cols-1 2xl:grid-cols-2 gap-y-5 mt-4 [&>li>span]:mr-4 [&>li>span]:px-2 [&>li>span]:py-1 [&>li>span]:font-bold empty:hidden">
                {#each detectedLabels as {label, count}}
                    {@const labelClass = label.toLowerCase().replaceAll(/([/]|\s)/g, "-")}
                    <li class="{labelClass}"><span class="capitalize mr-4 px-2 py-1 font-bold">{label}</span>{count}</li>
                {/each}
                <li class="paper-cardboard"><span class="capitalize mr-4 px-2 py-1 font-bold">Paper</span>0</li>
                <li class="paper-cardboard"><span class="capitalize mr-4 px-2 py-1 font-bold">Paper</span>0</li>
                <li class="paper-cardboard"><span class="capitalize mr-4 px-2 py-1 font-bold">Paper</span>0</li>
                <li class="paper-cardboard"><span class="capitalize mr-4 px-2 py-1 font-bold">Paper</span>0</li>
                <li class="paper-cardboard"><span class="capitalize mr-4 px-2 py-1 font-bold">Paper</span>0</li>
                <li class="paper-cardboard"><span class="capitalize mr-4 px-2 py-1 font-bold">Paper</span>0</li>
                <li class="paper-cardboard"><span class="capitalize mr-4 px-2 py-1 font-bold">Paper</span>0</li>
                <li class="paper-cardboard"><span class="capitalize mr-4 px-2 py-1 font-bold">Paper</span>0</li>
            </ul>
        </section>
    </div>
    <!-- Console -->
    <div class="flex flex-col w-full min-h-80 rounded-lg overflow-hidden">
        <p class="p-2 w-full bg-[#373F51] text-white font-bold">Console</p>
        <ul class="flex-grow h-0 bg-[#191C24] text-white overflow-y-auto px-2">
            {#each consoleLogs as log}
                <li class="p-2 pr-3 border-b border-b-[#373F51] break-all">{log}</li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .detected-labels > li.plastics > span {
        background-color: red;
    }

    .detected-labels > li.paper-cardboard > span {
        background-color: red;
    }
    
    .detected-labels > li.metals > span {
        background-color: red;
    }
    
    .detected-labels > li.glass > span {
        background-color: red;
    }
    
    .detected-labels > li.textile > span {
        background-color: red;
    }
    
    .detected-labels > li.leather > span {
        background-color: red;
    }
    
    .detected-labels > li.rubber > span {
        background-color: red;
    }
    
    .detected-labels > li.other-wastes > span {
        background-color: red;
    }
</style>