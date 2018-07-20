var screenWidth = document.documentElement.clientWidth;
var screenHeight = document.documentElement.clientHeight;
var anim;

var app = new PIXI.Application(screenWidth, screenHeight, {
    backgroundColor: 0x1099bb
});
document.body.appendChild(app.view);

window.addEventListener('resize', resize);

PIXI.loader
    .add('./client/assets/sprite/fly.json')
    .load(onAssetsLoaded);

function onAssetsLoaded()
{
    // create an array of textures from an image path
    var frames = [];

    for (var i = 0; i < 4; i++) {

        // magically works since the spritesheet was loaded with the pixi loader
        frames.push(PIXI.Texture.fromFrame('fly' + i + '.png'));
    }

    // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
    anim = new PIXI.extras.AnimatedSprite(frames);

    /*
     * An AnimatedSprite inherits all the properties of a PIXI sprite
     * so you can change its position, its anchor, mask it, etc
     */
    anim.x = app.screen.width / 2;
    anim.y = app.screen.height / 2;
    anim.anchor.set(0.5);
    let k = (app.screen.height / 2) / 868;
    anim.scale.set(k);
    anim.animationSpeed = 0.4;
    anim.play();
    console.log(anim);

    app.stage.addChild(anim);

    let s = 0;
    // Animate the rotation
    app.ticker.add(function (delta) {
        s += 0.1;
        anim.y = app.screen.height * (0.5 + 0.1 * Math.cos(s));
    });
}

function resize() {
    // canvas自适应
    app.renderer.resize(window.innerWidth, window.innerHeight);
    // 元素位置自适应
    anim.x = app.screen.width / 2;
    anim.y = app.screen.height / 2;
    let k = (app.screen.height / 2) / 868;
    anim.scale.set(k);
}