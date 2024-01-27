<script>
    import { videoStreams } from "$lib/stores/videoStreams";
</script>

<nav class="w-full flex-grow max-w-[20rem] p-5 bg-[#87D68D] rounded-t-lg">
    <!-- Navigate -->
    <section class="[&>*:nth-child(2)]:mt-[0.9375rem] [&>*]:mt-[0.625rem] [&>*:first-child]:mt-0">
        <p class="text-center text-lg font-bold">Navigate</p>
        <a class="flex items-center gap-[0.625rem] rounded-lg w-full p-[0.625rem] bg-[#BCEBCB] hover:rounded-l-none hover:border-l-4 hover:border-current" href="/">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5" preserveAspectRatio="none">
                    <path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clip-rule="evenodd" />
                </svg>                  
            </span>
            Dashboard
        </a>
        <label class="flex items-center gap-[0.625rem] rounded-lg w-full p-[0.625rem] bg-[#BCEBCB] hover:rounded-l-none hover:border-l-4 hover:border-current cursor-pointer" for="watch-stream-checkbox">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                    <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                </svg>              
            </span>
            Video Stream
        </label>
    </section>
</nav>