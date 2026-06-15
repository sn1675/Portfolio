const COLS = [
    {x:12,w:115},{x:128,w:123},{x:252,w:122},{x:375,w:124},{x:500,w:123},
    {x:624,w:122},{x:747,w:124},{x:872,w:122},{x:995,w:124},{x:1120,w:120},
    {x:1241,w:124},{x:1366,w:125},{x:1492,w:121},{x:1614,w:123},{x:1738,w:124},
    {x:1863,w:124},{x:1988,w:122},{x:2111,w:123},{x:2235,w:123},{x:2359,w:123},
    {x:2483,w:124},{x:2608,w:123},{x:2732,w:123},{x:2856,w:124},{x:2981,w:123},
    {x:3105,w:123},{x:3229,w:119}
];

const ROWS = [
    {y:8,h:87},{y:96,h:90},{y:187,h:92},{y:280,h:99},{y:380,h:86},
    {y:467,h:99},{y:567,h:84},{y:652,h:93},{y:746,h:92},{y:839,h:92},
    {y:932,h:93},{y:1026,h:90},{y:1117,h:92},{y:1210,h:104},{y:1315,h:76},
    {y:1392,h:101},{y:1494,h:90},{y:1585,h:90},{y:1676,h:92},{y:1769,h:92},
    {y:1862,h:91},{y:1954,h:85},{y:2040,h:106},{y:2147,h:94},{y:2242,h:94},
    {y:2337,h:93},{y:2431,h:93},{y:2525,h:92},{y:2618,h:91},{y:2710,h:93},
    {y:2804,h:93},{y:2898,h:89},{y:2988,h:91},{y:3080,h:82}
];

class Clippy {
    constructor(canvasEl, textEl, bubbleEl) {
        this.canvas = canvasEl;
        this.ctx = canvasEl.getContext('2d');
        this.textEl = textEl;
        this.bubbleEl = bubbleEl;
        this.sprite = new Image();
        this.sprite.src = 'img/clippy.png';
        this.animations = {};
        this.currentTimer = null;
    }

    async loadAnimations() {
        const res = await fetch('js/clippy-animations.json');
        this.animations = await res.json();
        this.play('LookRight');
    }

    play(name) {
        const anim = this.animations.find(a => a.Name === name);
        if (!anim) return;
        clearTimeout(this.currentTimer);
        let i = 0;
        const step = () => {
            const frame = anim.Frames[i];
            const col = COLS[frame.ImagesOffsets.Column];
            const row = ROWS[frame.ImagesOffsets.Row];

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(
                this.sprite,
                col.x, row.y,   // position exacte dans le spritesheet
                col.w, row.h,   // taille exacte de cette frame
                0, 0, this.canvas.width, this.canvas.height
            );
            i++;
            if (i < anim.Frames.length) {
                this.currentTimer = setTimeout(step, frame.Duration);
            } else {
                this.play('Idle');
            }
        };
        step();
    }

    say(text, animName = 'Wave') {
        this.textEl.textContent = text;
        this.bubbleEl.classList.remove('hidden');
        this.play(animName);
    }

    hide() {
        this.bubbleEl.classList.add('hidden');
        this.play('Idle');
    }
}