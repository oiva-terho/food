async function getResource(url) {
    let result = await fetch(url);
    if (!result.ok) {
        throw new Error(`Could not fetch ${url}. Status ${result.status}`);
    }
    return await result.json();
}

const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
    });
    return await result.json();
};

export { getResource };
export { postData };