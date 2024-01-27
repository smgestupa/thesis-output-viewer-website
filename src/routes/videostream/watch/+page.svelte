<script>
    import { onMount, onDestroy } from 'svelte';
    import { io } from "socket.io-client";
    export let data;

    const streamName = decodeURIComponent(data.streamName),
        ipAddress = decodeURIComponent(data.ipAddress),
        socket = io("http://127.0.0.1:5000", {forcenew: true});

    let loading = true,
        paused = false,
        recording = false,
        totalObjects = 0,
        detectedLabels = {},
        image = "",
        consoleLogs = [];

    const resumeVideoStream = () => {
        socket.on(`${streamName}_stream`, (data) => {
            const { information } = JSON.parse(data);

            totalObjects = information["total_objects"];
            detectedLabels = information["detected_labels"];

            image = JSON.parse(data)["image"];
        });

        consoleLogs = ["Video stream has been resumed.", ...consoleLogs];
        paused = false;
    }

    const pauseVideoStream = () => {
        socket.off(`${streamName}_stream`);

        consoleLogs = ["Video stream has been paused.", ...consoleLogs];
        paused = true;
    }

    const recordVideoStream = () => {
        socket.emit('videostreams_record', ipAddress);

        consoleLogs = ["Now recording video stream.", ...consoleLogs];
        recording = true;
    }

    onMount(() => {
        socket.connect();

        socket.emit("videostreams_get", streamName, ipAddress);

        socket.on(`${streamName}_stream`, (data) => {
            const { information } = JSON.parse(data);

            totalObjects = information["total_objects"];
            detectedLabels = information["detected_labels"];

            image = JSON.parse(data)["image"];
        });

        socket.on(`${streamName}_console`, (data) => {
            consoleLogs = [data["message"], ...consoleLogs];
        });

        socket.on(`${streamName}_start`, (data) => {
            if (data === "true") {
                loading = false;
                paused = false;
            }
        });

        socket.on(`${streamName}_stop`, (data) => {
            if (data === "stop")
                paused = true;
        });

        socket.on(`${streamName}_recording`, (data) => {
            if (data === "true") 
                recording = true;
            else 
                recording = false;
        })
    });

    onDestroy(() => {
        if (socket) socket.disconnect(); 
    })
</script>

<header>
    <h1 class="text-5xl font-bold">Watching {streamName}</h1>
    <h2 class="text-[1.5rem]">Watch the video stream from {ipAddress}.</h2>
</header>

<div class="flex-grow mt-[2.0625rem] px-5 pt-5 pb-10 bg-[#87D68D] rounded-t-lg [&>*]:mt-[1.5625rem] [&>*:first-child]:mt-0">
    <!-- Controls -->
    <section class="flex gap-x-5 mt-4">
        <button type="submit" class="block rounded border-b-4 border-[#006600] bg-[#009900] px-6 py-2 font-bold hover:border-[#009900] hover:bg-[#00B800] text-white disabled:border-gray-700 disabled:bg-gray-500 whitespace-nowrap" on:click={resumeVideoStream} disabled={loading || !paused}>
            Resume
        </button>
        <button class="rounded border-b-4 border-blue-700 bg-blue-500 px-6 py-2 font-bold hover:border-blue-500 hover:bg-blue-400 text-white disabled:border-gray-700 disabled:bg-gray-500" on:click={pauseVideoStream} disabled={loading || paused}>
            Pause
        </button>
        <div class="flex gap-x-3 items-center">
            <button class="rounded border-b-4 border-[#FF5147] bg-[#FF6961] px-6 py-2 font-bold hover:border-[#FF6961] hover:bg-[#FF8B85] text-white disabled:border-gray-700 disabled:bg-gray-500" on:click={recordVideoStream} disabled={loading || recording}>
                Record
            </button>
            <p>{recording ? "Stream is being recorded." : "Stream is not recorded."}</p>
        </div>
    </section>
    <!-- Feed -->
    <div class="flex gap-x-5">
        <img class="bg-black w-full max-w-[50rem] h-[37.5rem]" src={image ? `data:image/jpeg;base64, ${image}` : "/favicon.png"} alt="">
        <section class="text-lg flex-grow">
            <p>{paused ? "The video stream is not running or currently paused." : `The model has detected ${totalObjects} waste objects from the camera.`}</p>
            {#if !paused}
                <ul class="detected-labels grid grid-cols-1 2xl:grid-cols-2 gap-y-5 mt-4 [&>li>span]:mr-4 [&>li>span]:px-2 [&>li>span]:py-1 [&>li>span]:font-bold empty:hidden">
                    {#each Object.entries(detectedLabels) as [label, count]}
                        {@const labelClass = label.toLowerCase().replaceAll(/([/]|\s)/g, "-")}
                        <li class="{labelClass}"><span class="capitalize mr-4 px-2 py-1 font-bold">{label}</span>{count}</li>
                    {/each}
                </ul>
            {/if}
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