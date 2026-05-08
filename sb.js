class Intro extends Phaser.Scene {
    constructor() {
        super("intro");
    }

    preload() {
        this.load.image('fullscreenIcon', 'assets/fullscreenIcon-removebg-preview.png');
        console.log('loaded fullscreenIcon');
    }
    
    create() {
        // General Purpose Stuff //
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.scale; 

        console.log('Intro Scene');
        // End General Purpose Stuff //

        // Fullscreen Setup //
        let fullscreenIcon = this.add.image(1840, 1000, 'fullscreenIcon')
            .setDepth(11)
            .setScale(0.25)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => {
                fullscreenIcon.scale = 0.3;
            })
            .on('pointerout', () => {
                fullscreenIcon.scale = 0.25;
            })
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });
        // End Fullscreen Setup //

        // Start Game //
        let introText1 = this.add.text(this.w/2, this.h/2 - 100, "Welcome to Skateboard Physics!", { fontSize: '64px Georgia', fill: '#fff' }).setOrigin(0.5);
        let introText2 = this.add.text(this.w/2, this.h/2 + 50, "Click to Start", { fontSize: '32px Georgia', fill: '#fff' }).setOrigin(0.5);

        this.input.on('pointerdown', () => {
            this.scene.start('pushing');
        });
        // End Start Game //
    }
}

class Pushing extends Phaser.Scene {
    constructor() {
        super("pushing");
    }

    create() {
        console.log('Pushing Scene');
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    render: {
        pixelArt: false
    },
    scene: [Intro, Pushing],
    title: "Physics SB",
});