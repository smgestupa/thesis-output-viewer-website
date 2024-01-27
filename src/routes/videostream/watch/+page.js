export async function load({ url }) {
    let streamName = url.searchParams.get("name");
    let ipAddress = url.searchParams.get("ip");

    return { streamName, ipAddress }
}