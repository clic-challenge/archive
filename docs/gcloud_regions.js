function getClosestGcpRegion() {
    const regions = ["asia", "us", "europe"];
    const regionOffsets = {
        "asia": "+05:30",
        "us": "-06:00",
        "europe": "+01:00",
    };

    let closestRegion = "";
    let minDiff = Number.MAX_SAFE_INTEGER;
    const localOffsetMinutes = -new Date().getTimezoneOffset();

    for (const region of regions) {
        const timeStr = regionOffsets[region];
        const sign = timeStr.startsWith("+") ? 1 : -1;
        const [hours, minutes] = timeStr.substring(1).split(":").map(Number);
        const targetOffsetMinutes = sign * (hours * 60 + minutes);
        const diff = Math.abs(localOffsetMinutes - targetOffsetMinutes);
        if (diff < minDiff) {
            minDiff = diff;
            closestRegion = region;
        }
    }

    return closestRegion;
}

document.addEventListener("readystatechange", event => {
    if (event.target.readyState === "interactive") {
        let regionSuffix = "_" + getClosestGcpRegion();
        if (regionSuffix != "_asia")
            regionSuffix = "";
        const links = document.getElementsByTagName("a");
        for (let link of links) {
            link.href = link.href.replace(
                /^https:\/\/storage.googleapis.com\/clic_datasets(_\w+)?/,
                "https://storage.googleapis.com/clic_datasets" + regionSuffix
            );
        }
    }
});
