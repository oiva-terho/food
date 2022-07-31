async function getResource(url) {
    let result = await fetch(url);
    if (!result.ok) {
        throw new Error(`Could not fetch ${url}. Status ${result.status}`);
    }
    return await result.json();
}

export { getResource };
