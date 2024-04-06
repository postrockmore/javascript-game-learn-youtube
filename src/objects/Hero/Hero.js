import { GameObject } from "../../GameObject.js";
import { Vector2 } from "../../Vector2.js";
import { DOWN, LEFT, RIGHT, UP } from "../../Input.js";
import { gridCells, isSpaceFree } from "../../helpers/grid.js";
import { walls } from "../../levels/level_1.js";
import { Sprite } from "../../Sprite.js";
import { resources } from "../../Resources.js";
import { Animations } from "../../Animations.js";
import { FrameIndexPattern } from "../../FrameIndexPattern.js";
import {
    STAND_DOWN,
    STAND_LEFT,
    STAND_RIGHT,
    STAND_UP,
    WALK_DOWN,
    WALK_LEFT,
    WALK_RIGHT,
    WALK_UP
} from "./heroAnimations.js";
import { moveTowards } from "../../helpers/moveTowards.js";

export class Hero extends GameObject
{
    constructor(x, y)
    {
        super({
            position: new Vector2(x, y),
        });

        this.shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32, 32),
            position: new Vector2(-8, -19),
        })
        this.addChild(this.shadow)
        
        this.body = new Sprite({
            resource: resources.images.hero,
            frameSize: new Vector2(32, 32),
            hFrames: 3,
            vFrames: 8,
            frame: 1,
            position: new Vector2(-8, -20),
            animations: new Animations({
                walkDown: new FrameIndexPattern(WALK_DOWN),
                walkUp: new FrameIndexPattern(WALK_UP),
                walkLeft: new FrameIndexPattern(WALK_LEFT),
                walkRight: new FrameIndexPattern(WALK_RIGHT),
                standDown: new FrameIndexPattern(STAND_DOWN),
                standUp: new FrameIndexPattern(STAND_UP),
                standLeft: new FrameIndexPattern(STAND_LEFT),
                standRight: new FrameIndexPattern(STAND_RIGHT),
            })
        })
        this.addChild(this.body)

        this.facingDirection = DOWN
        this.destinationPosition = this.position.duplicate()
    }

    step(delta, root)
    {
        // Двигаем персонажа к целевой позиции
        const distance = moveTowards(this, this.destinationPosition, 1)

        // Проверяем не двигается ли персонаж сравнив дистанция до цели
        const hasArrived = distance <= 1

        // Если не двигается то позволяем сделать следующее движение
        if (hasArrived) {
            this.tryMove(root)
        }
    }

    tryMove(root)
    {
        const { input } = root

        if ( !input.direction) {
            // Тут мы можем запустить анимацию простоя в зависимости от направления
            if (this.facingDirection == DOWN) {
                this.body.animations.play('standDown')
            }

            if (this.facingDirection == UP) {
                this.body.animations.play('standUp')
            }

            if (this.facingDirection == LEFT) {
                this.body.animations.play('standLeft')
            }

            if (this.facingDirection == RIGHT) {
                this.body.animations.play('standRight')
            }
            return
        }

        let nextX = this.destinationPosition.x
        let nextY = this.destinationPosition.y
        const gridSize = gridCells(1)

        if (input.direction == DOWN) {
            nextY += gridSize
            this.body.animations.play('walkDown')
        }

        if (input.direction == RIGHT) {
            nextX += gridSize
            this.body.animations.play('walkRight')
        }

        if (input.direction == UP) {
            nextY -= gridSize
            this.body.animations.play('walkUp')
        }

        if (input.direction == LEFT) {
            nextX -= gridSize
            this.body.animations.play('walkLeft')
        }

        // Тут мы устанавливаем направление движения героя в зависимости от нажатия клавиш
        // Если клавиша не нажата то она остается прежней
        this.facingDirection = input.direction || this.facingDirection

        // Проврка на препятствия
        if (isSpaceFree(walls, nextX, nextY)) {
            this.destinationPosition.x = nextX
            this.destinationPosition.y = nextY
        }
    }
}