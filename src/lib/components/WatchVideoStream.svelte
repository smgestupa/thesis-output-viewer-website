<script>
    import { goto } from "$app/navigation";
    import { videoStreams } from "$lib/stores/videoStreams";
    let form;

    const watchVideoStream = (event) => {
        const formData = new FormData(event.target);

        const streamName = formData.get("watch-stream-name");
        const ipAddress = formData.get("watch-stream-ip-address");

        if (!streamName || !ipAddress)
            return; 

        goto(`/videostream/watch?name=${streamName}&ip=${ipAddress}`);
        
        document.getElementById("watch-stream-checkbox").checked = false;
        form.reset();
    }

    const closeModal = () => {
        form.reset();
    }
</script>

<input class="hidden" type="checkbox" id="watch-stream-checkbox">
<div id="watch-stream-modal" class="absolute hidden top-0 w-full h-full px-[3.125rem]">
    <label class="absolute top-0 left-0 block w-full h-full bg-black opacity-50 z-10" for="watch-stream-checkbox" on:click={closeModal}></label>
    <form bind:this={form} class="w-full h-fit max-w-2xl mx-auto mt-10 bg-[#87D68D] z-10 p-5 rounded-lg" on:submit|preventDefault={watchVideoStream}>
        <section class="flex items-center">
            <p class="text-2xl font-bold w-full">Watch a Video Stream</p>
            <label class="cursor-pointer" for="watch-stream-checkbox" on:click={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                </svg>     
            </label>
        </section>
        <section class="flex gap-x-2 mt-4 items-center">
            <p class="w-[25%]">Stream Name</p>
            <input type="text" name="watch-stream-name" class="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 mt-2" placeholder="Camera 1">
        </section>
        <section class="flex gap-x-2 mt-2 items-center">
            <p class="w-[25%]">IP Address</p>
            <input type="text" name="watch-stream-ip-address" class="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 mt-2" placeholder="http://127.0.0.1:8080/shot.jpg">
        </section>
        <button type="submit" class="ml-auto mt-8 block rounded border-b-4 border-[#A1E3B6] bg-[#BCEBCB] px-6 py-2 font-bold hover:border-[#BCEBCB] hover:bg-[#D0F1DA]">
            Watch
        </button>
    </form>
</div>

<style>
    #watch-stream-checkbox:checked + #watch-stream-modal {
        display: flex;
    }
</style>