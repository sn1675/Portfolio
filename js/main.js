class AppWindow extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const tpl = document.getElementById('win-template');
        if (!tpl) return;
        const node = tpl.content.firstElementChild.cloneNode(true);

        const winName = this.getAttribute('window') || 'window';
        const id = this.getAttribute('id') || `${winName}-window`;
        const title = this.getAttribute('title') || '';
        const img = this.getAttribute('img') || this.getAttribute('icon') || '';

        node.dataset.window = winName;
        node.id = id;

        const headerEl = node.querySelector('.header');
        if (headerEl) headerEl.id = `${winName}-header`;

        const closeBtn = node.querySelector('.close-button');
        if (closeBtn) closeBtn.id = `closeButton-${winName}`;

        const titleText = node.querySelector('.window-title-text') || node.querySelector('.title-text') || node.querySelector('.title p');
        let imgEl = node.querySelector('.imgTitle');

        if (img && !imgEl && titleText) {
            const createdImg = document.createElement('img');
            createdImg.className = 'imgTitle';
            try {
                createdImg.src = new URL(img, document.baseURI).href; // résout les chemins relatifs
            } catch (e) {
                createdImg.src = img;
            }
            createdImg.alt = title || '';
            createdImg.width = 20;
            createdImg.height = 20;
            createdImg.style.objectFit = 'cover';
            createdImg.style.marginRight = '8px';
            titleText.parentNode.insertBefore(createdImg, titleText);
            imgEl = createdImg;
        }

        if (titleText) titleText.textContent = title;
        if (imgEl && img) {
            try {
                imgEl.src = new URL(img, document.baseURI).href;
            } catch (e) {
                imgEl.src = img;
            }
        }

        const contentSlot = node.querySelector('.windowContent');
        if (contentSlot) {
            contentSlot.innerHTML = this.innerHTML;
        }

        this.replaceWith(node);
    }
}

customElements.define('app-window', AppWindow);

document.addEventListener("DOMContentLoaded", function() {
     const windows = {};

    document.querySelectorAll("[data-window]").forEach(el => {
         const name = el.dataset.window;

         windows[name] = {
             window: el,
             header: document.getElementById(`${name}-header`),
             folderButton: document.getElementById(`folder-${name}-button`),
             closeButton: document.getElementById(`closeButton-${name}`),
             footer: document.getElementById(`${name}-footer`),
         };
     });

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
    printHeure();
});