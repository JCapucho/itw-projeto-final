var API_URL = "http://192.168.160.58/Olympics/api"

function addInfiniteViewController(controller) {
    window.addEventListener("scroll", function() {
        const scrollTarget = window.scrollY + 1.5 * window.innerHeight;
        if(scrollTarget >= document.documentElement.scrollHeight) {
            controller()
        }
    });
}
