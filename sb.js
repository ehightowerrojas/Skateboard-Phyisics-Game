class Intro extends Phaser.Scene {
    constructor() {
        super("intro");
    }

    preload() {
        this.load.image('fullscreenIcon', 'assets/fullscreenIcon-removebg-preview.png');
        this.load.image('background', 'assets/photo-1475274047050-1d0c0975c63e.avif');
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
        let background = this.add.image(this.w/2, this.h/2, 'background').setDepth(-1).setScale(0.75);
        let introText1 = this.add.text(this.w/2, this.h/2 - 100, "Welcome to Skateboard Physics!", { fontSize: '64px Georgia', fill: '#fff' }).setOrigin(0.5);
        let introText2 = this.add.text(this.w/2, this.h/2 + 50, "Click to Start", { fontSize: '50px Georgia', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => {
                introText2.setStyle({ fill: '#ff0' });
            })
            .on('pointerout', () => {
                introText2.setStyle({ fill: '#fff' });
            })
            .on('pointerdown', () => {
                this.scene.start('pushing');
            });
        // End Start Game //
    }
}

class Pushing extends Phaser.Scene {
    constructor() {
        super("pushing");
    }

    preload()  {
        this.load.image('fullscreenIcon', 'assets/fullscreenIcon-removebg-preview.png');   
        this.load.image('background', 'assets/photo-1475274047050-1d0c0975c63e.avif');
        this.load.image('portal', 'assets/传送门Ai素材-05BLADESL203999340_POP_RMA.png');
    }
    create() {
        // General Purpose Stuff //
        console.log('Pushing Scene');

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.scale; 

        let background = this.add.image(this.w/2, this.h/2, 'background').setDepth(-1).setScale(0.75);

        this.player = this.add.rectangle(200, 935, 170, 50, 0x00ff00);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

        this.player.body.setMaxVelocity(350);

        this.player.body.setDragX(150); 
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.curb = this.add.rectangle(500, 990, 1000, 40, 0xaaaaaf);
        this.physics.add.existing(this.curb, true);
        this.physics.add.collider(this.player, this.curb);

        this.ground = this.add.rectangle(300, 1060, 1800, 100, 0x888888);
        this.physics.add.existing(this.ground, true);
        this.physics.add.collider(this.player, this.ground);
        // End General Purpose Stuff //

        // Portal //
        this.portal = this.physics.add.image(this.w - 400, this.h - 120, 'portal').setScale(.025);
        this.physics.add.existing(this.portal);
        this.portal.body.setAllowGravity(false);

        this.physics.add.overlap(this.player, this.portal, () => {
            console.log('collision!');
            this.tweens.add({
                targets: this.player,
                scale: 0,
                duration: 200,
            }),
            this.time.delayedCall(200, () => {
                this.scene.start('ollie');
            });
        }, null, this);
        // End Portal //
        
        // Text //
        let instructions = this.add.text(950, 300, "Press and hold space to push the board.\n\nTapping space is not encouraged, instead try to time your pushes to gain momentum.\n\nYour board will go left or right based on if the mouse is on the right or left of the player.", { fontSize: '40px Georgia', fill: '#fff' })
            .setOrigin(.5);
        // End Text //

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

    }

    update() {

        this.portal.angle += 1; 

        const pointer = this.input.activePointer;

        if (this.cursors.space.isDown) {
            if (pointer.x > this.player.x) {
                this.player.body.setAccelerationX(1000);
            } else {
                this.player.body.setAccelerationX(-1000);
            }
        } else {
            this.player.body.setAccelerationX(0);
        }
    }
}

class Ollie extends Phaser.Scene {
    constructor() {
        super("ollie");
    }
    
    preload()  {
        this.load.image('fullscreenIcon', 'assets/fullscreenIcon-removebg-preview.png');   
        this.load.image('background', 'assets/photo-1475274047050-1d0c0975c63e.avif');
        this.load.image('portal', 'assets/传送门Ai素材-05BLADESL203999340_POP_RMA.png');
    }
    create() {
        // General Purpose Stuff //
        console.log('Pushing Scene');

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.scale; 

        let background = this.add.image(this.w/2, this.h/2, 'background').setDepth(-1).setScale(0.75);

        this.player = this.add.rectangle(200, 935, 170, 50, 0x00ff00);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

        this.player.body.setMaxVelocity(350);

        this.player.body.setDragX(150); 
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        this.curb = this.add.rectangle(900, 990, 2050, 40, 0xaaaaaf);
        this.physics.add.existing(this.curb, true);
        this.physics.add.collider(this.player, this.curb);

        this.ground = this.add.rectangle(900, 1060, 2050, 100, 0x888888);
        this.physics.add.existing(this.ground, true);
        this.physics.add.collider(this.player, this.ground);
        // End General Purpose Stuff //

        // Obstacles //
        this.rail = this.add.rectangle(800, 900, 250, 20, 0xecc900);
        this.physics.add.existing(this.rail, true);
        this.physics.add.collider(this.player, this.rail);

        // Portal //
        this.portal = this.physics.add.image(this.w - 400, this.h - 300, 'portal').setScale(.025);
        this.physics.add.existing(this.portal);
        this.portal.body.setAllowGravity(false);

        this.physics.add.overlap(this.player, this.portal, () => {
            console.log('collision!'),
            this.tweens.add({
                targets: this.player,
                scale: 0,
                duration: 200,
            }),
            this.time.delayedCall(500, () => {
                this.scene.start('final');
            });
        }, null, this);
        // End Portal //
        
        // Text //
        let instructions = this.add.text(950, 300, "Now that you can push the board, the next step is to learn how to ollie.\n\nYou can ollie by pressing ‘f’", { fontSize: '40px Georgia', fill: '#fff' })
            .setOrigin(.5);
        // End Text //

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

    }

    update() {

        this.portal.angle += 1; 

        const pointer = this.input.activePointer;

        if (this.cursors.space.isDown) {
            if (pointer.x > this.player.x) {
                this.player.body.setAccelerationX(1000);
            } else {
                this.player.body.setAccelerationX(-1000);
            }
        } else {
            this.player.body.setAccelerationX(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyF) && this.player.body.blocked.down) {
            const baseJump = -300; 
            const speedMultiplier = 0.5; 
            
            const jumpBonus = Math.abs(this.player.body.velocity.x) * speedMultiplier;
            
            const finalJump = baseJump - jumpBonus;
            
            this.player.body.setVelocityY(finalJump);
        }
    }
}

class Final extends Phaser.Scene {
    constructor() {
        super("final");
    }
    create() {
        console.log('Final Scene')
    }
}
const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 720 },
            debug: false
        }
    },
    render: {
        pixelArt: false
    },
    scene: [Intro, Pushing, Ollie, Final],
    title: "Physics SB",
});