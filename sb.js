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
        let introText1 = this.add.text(this.w/2, this.h/2 - 50, "Welcome to Skateboard Physics, by Evangel!", { fontSize: '64px Georgia', fill: '#fff' }).setOrigin(0.5);
        let introText2 = this.add.text(this.w/2, this.h/2 + 100, "Click to Start", { fontSize: '50px Georgia', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => {
                introText2.setStyle({ fill: '#ff0' });
            })
            .on('pointerout', () => {
                introText2.setStyle({ fill: '#fff' });
            })
            .on('pointerdown', () => {
                this.scene.start('loadingScene1');
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
        this.load.image('player', 'assets/45f18edae2d5d54fe594e7d365fd8dff-skateboard-side-view.png');
    }
    create() {
        // General Purpose Stuff //
        console.log('Pushing Scene');

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.scale; 

        let background = this.add.image(this.w/2, this.h/2, 'background').setDepth(-1).setScale(0.75);

        this.player = this.add.image(200, 955, 'player')
            .setScale(0.4)
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
                this.scene.start('loadingScene2');
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
        this.load.image('player', 'assets/45f18edae2d5d54fe594e7d365fd8dff-skateboard-side-view.png');
    }
    create() {
        // General Purpose Stuff //
        console.log('Pushing Scene');

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.scale; 

        let background = this.add.image(this.w/2, this.h/2, 'background').setDepth(-1).setScale(0.75);

        this.player = this.add.image(200, 935, 'player')
            .setScale(.4)
        this.player.setDepth(2);
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
        this.rail = this.add.rectangle(800, 990, 250, 200, 0xecc900)
            .setDepth(-1);
        this.physics.add.existing(this.rail, true);
        this.physics.add.collider(this.player, this.rail);

        this.rail2 = this.add.rectangle(1200, 980, 250, 200, 0xecc900)
            .setDepth(-1);
        this.physics.add.existing(this.rail2, true);
        this.physics.add.collider(this.player, this.rail2);

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
                this.scene.start('loadingScene3');
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
    
    preload()  {
        this.load.image('fullscreenIcon', 'assets/fullscreenIcon-removebg-preview.png');   
        this.load.image('background', 'assets/photo-1475274047050-1d0c0975c63e.avif');
        this.load.image('portal', 'assets/传送门Ai素材-05BLADESL203999340_POP_RMA.png');
        this.load.image('player', 'assets/45f18edae2d5d54fe594e7d365fd8dff-skateboard-side-view.png');
        this.load.image('movingPlatform', 'assets/movingPlatform.jpg')
    }
    create() {
        // General Purpose Stuff //
        console.log('Pushing Scene');

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.scale; 

        let background = this.add.image(this.w/2, this.h/2, 'background').setDepth(-1).setScale(0.75);

        this.player = this.add.image(200, 935, 'player')
            .setScale(.4);
        this.player.setDepth(2);
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
        this.rail = this.add.rectangle(800, 992, 250, 200, 0xecc900)
            .setDepth(-1);
        this.physics.add.existing(this.rail, true);
        this.physics.add.collider(this.player, this.rail);

        this.rail5 = this.add.rectangle(1100, 902, 500, 20, 0xecc900)
            .setDepth(-1);
        this.physics.add.existing(this.rail5, true);
        this.physics.add.collider(this.player, this.rail5);

        this.rail7 = this.add.rectangle(1450, 955, 250, 200, 0xecc900)
            .setDepth(-1);
        this.physics.add.existing(this.rail7, true);
        this.physics.add.collider(this.player, this.rail7);

        this.rail8 = this.add.rectangle(1750, 955, 400, 350, 0xecc900)
            .setDepth(-1);
        this.physics.add.existing(this.rail8, true);
        this.physics.add.collider(this.player, this.rail8);

        this.movingPlatform = this.physics.add.image(400, 300, 'movingPlatform')
            .setScale(.2)
            .setDepth(-1);

        this.movingPlatform.body.setAllowGravity(false);
        this.movingPlatform.setImmovable(true);

        this.physics.add.collider(this.player, this.movingPlatform);

        this.tweens.add({
            targets: this.movingPlatform,
            y: 1080,
            duration: 5000,
            yoyo: true,
            loop: -1,
            ease: "Linear"
        });

        // End Obstacles //
        
        // Text //
        let instructions = this.add.text(950, 300, "You can do tricks by spinning your mouse!\n\n...have fun!", { fontSize: '40px Georgia', fill: '#fff' })
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

        // Player Tricks //
        if (!this.player.body.touching.down) {
            
            const pointer = this.input.activePointer;
            
            let angle = Phaser.Math.Angle.Between(
                this.player.x, 
                this.player.y, 
                pointer.worldX, 
                pointer.worldY
            );

            // 4. Apply the rotation (Phaser uses radians for .rotation)
            this.player.setRotation(angle);
            
        } else {
            // Optional: Reset rotation to 0 when landing
            this.player.setRotation(0);
        }
        // End Player Tricks //

    }
}

class LoadingScene1 extends Phaser.Scene {
    constructor() {
        super("loadingScene1")
    } 

    preload() {
        this.load.image('background', 'assets/photo-1475274047050-1d0c0975c63e.avif');
        this.load.image('fullscreenIcon', 'assets/fullscreenIcon-removebg-preview.png');   
        this.load.image('player', 'assets/45f18edae2d5d54fe594e7d365fd8dff-skateboard-side-view.png');
        this.load.image('loading', 'assets/loading.jpg');

        this.load.on('progress', (value) => {
            console.log(Math.floor(value * 100) + '%');
        });
    }

    create() {

        this.add.rectangle(1920/2, 1080/2, 1920, 1080, 0xffffff);
        this.add.text(25, 625, 'Loading first skate park...', { fontSize: '40px Georgia', color: '#000000'});
        this.loading = this.add.image(-200, 870, 'loading')
            .setScale(.75); 

        this.tweens.add({
            targets: this.loading,
            x: 2500,
            duration: 1500,
            ease: 'Sine.InOut'
        })

        this.time.delayedCall(1500, () => {
            this.scene.start('pushing'); 
        });
    }
}

class LoadingScene2 extends Phaser.Scene {
    constructor() {
        super("loadingScene2")
    } 

    preload() {
        this.load.image('background', 'assets/photo-1475274047050-1d0c0975c63e.avif');
        this.load.image('fullscreenIcon', 'assets/fullscreenIcon-removebg-preview.png');   
        this.load.image('player', 'assets/45f18edae2d5d54fe594e7d365fd8dff-skateboard-side-view.png');
        this.load.image('loading', 'assets/loading.jpg');

        this.load.on('progress', (value) => {
            console.log(Math.floor(value * 100) + '%');
        });
    }

    create() {

        this.add.rectangle(1920/2, 1080/2, 1920, 1080, 0xffffff);
        this.add.text(25, 625, 'Loading your second skate park...', { fontSize: '40px Georgia', color: '#000000'});
        this.loading = this.add.image(-200, 870, 'loading')
            .setScale(.75);

        this.tweens.add({
            targets: this.loading,
            x: 2500,
            duration: 1500,
            ease: 'Sine.InOut'
        })

        this.time.delayedCall(1500, () => {
            this.scene.start('ollie'); 
        });
    }
}

class LoadingScene3 extends Phaser.Scene {
    constructor() {
        super("loadingScene3")
    } 

    preload() {
        this.load.image('background', 'assets/photo-1475274047050-1d0c0975c63e.avif');
        this.load.image('fullscreenIcon', 'assets/fullscreenIcon-removebg-preview.png');   
        this.load.image('player', 'assets/45f18edae2d5d54fe594e7d365fd8dff-skateboard-side-view.png');
        this.load.image('loading', 'assets/loading.jpg');

        this.load.on('progress', (value) => {
            console.log(Math.floor(value * 100) + '%');
        });
    }

    create() {

        this.add.rectangle(1920/2, 1080/2, 1920, 1080, 0xffffff);
        this.add.text(25, 625, 'Loading the final skate park...', { fontSize: '40px Georgia', color: '#000000'});
        this.loading = this.add.image(-200, 870, 'loading')
            .setScale(.75);

        this.tweens.add({
            targets: this.loading,
            x: 2500,
            duration: 1500,
            ease: 'Sine.InOut'
        })

        this.time.delayedCall(1500, () => {
            this.scene.start('final'); 
        });
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
            gravity: { y: 780 },
            debug: false
        }
    },
    scene: [Intro, LoadingScene1, Pushing, LoadingScene2, Ollie, LoadingScene3, Final],
    title: "Physics SB",
});