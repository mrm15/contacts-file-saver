export const addApiUrlToLocalStorage = () => {
    if (window.location.hostname !== "localhost") {
        localStorage.setItem(
            "apiUrl",
            "/api"

        );
    } else {
        localStorage.setItem("apiUrl",
            // "http://localhost:3001/api"
            // "http://162.55.219.166/api/"
            "http://panel.tablocity.com/api"
        );
    }
};

export const prefixUrl = () => {
    if (
        localStorage.getItem("apiUrl") === null ||
        localStorage.getItem("apiUrl") === undefined
    ) {
        addApiUrlToLocalStorage();
    }
    // return window.location.hostname !== "localhost" ?
    //     'http://panel.tablocity.com/api/' :
    //     "http://localhost:3001/api/"
    // return 'http://panel.tablocity.com/api/'
    return 'http://localhost:3001/api/'
};