<script>
    import { videoStreams } from "$lib/stores/videoStreams";
</script>

<nav class="w-full flex-grow max-w-[20rem] p-5 bg-[#87D68D] rounded-t-lg">
    <!-- Pages -->
    <section class="[&>*:nth-child(2)]:mt-[0.9375rem] [&>a]:mt-[0.625rem] [&>a:first-child]:mt-0">
        <p class="text-center text-lg font-bold">Pages</p>
        <a class="flex items-center gap-[0.625rem] rounded-lg w-full p-[0.625rem] bg-[#BCEBCB] hover:rounded-l-none hover:border-l-4 hover:border-current" href="/">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5" preserveAspectRatio="none">
                    <path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clip-rule="evenodd" />
                </svg>                  
            </span>
            Dashboard
        </a>
        <a class="flex items-center gap-[0.625rem] rounded-lg w-full p-[0.625rem] bg-[#BCEBCB] hover:rounded-l-none hover:border-l-4 hover:border-current" href="/interpret">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                    <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                </svg>
            </span>
            Interpret
        </a>
    </section>
    <hr class="my-[1.5625rem] w-full max-w-[9.375rem] mx-auto border-current opacity-50">
    <!-- Video Streams -->
    <section class="[&>*:nth-child(2)]:mt-[0.9375rem] [&>a]:mt-[0.625rem] [&>a:first-child]:mt-0 ">
        <div class="flex gap-x-2 justify-center items-center">
            <p class="text-center text-lg font-bold">Video Streams</p>
            <label class="cursor-pointer" for="add-stream-checkbox">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                </svg>
            </label>
        </div>
        {#if $videoStreams.length > 0}
            {#each $videoStreams as {streamName}}
                <a class="flex items-center gap-[0.625rem] rounded-lg w-full p-[0.625rem] bg-[#BCEBCB] hover:rounded-l-none hover:border-l-4 hover:border-current" href="/videostream/{streamName}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                        <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                    </svg>
                    {streamName}
                </a>
            {/each}
        {:else}
            <div class="[&>p]:mt-[0.625rem] [&>p:first-child]:mt-0 -z-10">
                {#each Array(5) as _, index}
                    {@const opacity = 1 - (.10 * (index + 5))}
                    <p class="flex items-center gap-[0.625rem] rounded-lg w-full p-[0.625rem] bg-[#BCEBCB]" style:opacity="{opacity}">
                        &nbsp;
                    </p>
                {/each}
            </div>
        {/if}
    </section>
</nav>