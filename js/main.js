v document.addEventListener("DOMContentLoaded", function() {
     const windows = {
        portfolio: {
            window: document.getElementById("portfolio-window"),
            header: document.getElementById("window-header"),
            folderButton: document.getElementById("folder-portfollio-button"),
            closeButton: document.getElementById("closeButton"),
            footer: document.getElementById("Portfolio-footer"),
        },
        moi: {
            window: document.getElementById("moi-window"),
            header: document.getElementById("moi-header"),
            folderButton: document.getElementById("folder-moi-button"),
            closeButton: document.getElementById("closeButtonMoi"),
            footer: document.getElementById("moi-footer"),
        },
        
        demineur: {
            window: document.getElementById("demineur-window"),
            header: document.getElementById("demineur-header"),
            folderButton: document.getElementById("demineurButton"),
            closeButton: document.getElementById("closeButtondemineur"),
            footer: document.getElementById("demineur-footer"),
        },
        pyngpong: {
            window: document.getElementById("pyng-pong-Window"),
            header: document.getElementById("pyng-pong-header"),
            folderButton: document.getElementById("pyng-pongButton"),
            closeButton: document.getElementById("closeButtonPyngPong"),
            footer: document.getElementById("pyng-pong-footer"),
        },
        graph: {
            window: document.getElementById("Graphical-Sort-Window"),
            header: document.getElementById("Graphical-Sort-header"),
            folderButton: document.getElementById("GaphicalSortButton"),
            closeButton: document.getElementById("closeButtonGraphicalSort"),
            footer: document.getElementById("gaphical-sort-footer"),
        },
        pressentation:{
            window: document.getElementById("press-window"),
            header: document.getElementById("press-header"),
            folderButton: document.getElementById("pressButton"),
            closeButton: document.getElementById("closeButtonpress"),
            footer: document.getElementById("press-footer"),
        },
    };

    function openWindow(window) {
        window.window.style.display = "block";
        window.footer.style.display = "block";
    }

    function closeWindow(window) {
        window.window.style.display = "none";
        window.footer.style.display = "none";
    }

    function handleWindowDrag(window, e) {
        window.isDragging = true;
        const boundingRect = window.window.getBoundingClientRect();
        window.xOffset = e.clientX - boundingRect.left;
        window.yOffset = e.clientY - boundingRect.top;
    }

    function handleWindowMove(window, e) {
        if (window.isDragging) {
            window.window.style.left = e.clientX - window.xOffset + "px";
            window.window.style.top = e.clientY - window.yOffset + "px";
        }
    }

    function handleWindowMouseUp(window) {
        window.isDragging = false;
    }

    for (const key in windows) {
        let window = windows[key];
        window.header.addEventListener("mousedown", (e) => handleWindowDrag(window, e));
        document.addEventListener("mousemove", (e) => handleWindowMove(window, e));
        document.addEventListener("mouseup", () => handleWindowMouseUp(window));

        window.folderButton.addEventListener("click", () => openWindow(window));
        window.closeButton.addEventListener("click", () => closeWindow(window));
    }

    function printHeure(){
        let date = new Date();
        let heureAcc = date.getHours();
        let minuteAcc = date.getMinutes();

        document.getElementById("hour-footer").innerHTML = heureAcc + ':' + minuteAcc;
    } setInterval(printHeure, 10000)
});

/* faire le blue */