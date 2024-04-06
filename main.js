import './style.css'
import { resources } from "./src/Resources.js";
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./src/Vector2.js";
import { GameLoop } from "./src/GameLoop.js";
import { Input, DOWN, LEFT, RIGHT, UP } from "./src/Input.js";
import { gridCells, isSpaceFree } from "./src/helpers/grid.js";
import { moveTowards } from "./src/helpers/moveTowards.js";
import { walls } from "./src/levels/level_1.js";
import { Animations } from "./src/Animations.js";
import { FrameIndexPattern } from "./src/FrameIndexPattern.js";
import {
    STAND_DOWN,
    STAND_LEFT, STAND_RIGHT,
    STAND_UP,
    WALK_DOWN,
    WALK_LEFT,
    WALK_RIGHT,
    WALK_UP
} from "./src/objects/Hero/heroAnimations.js";

const canvas = document.querySelector('#game-canvas')
const ctx = canvas.getContext('2d')

// Переменная с классом ввода
const input = new Input()

// Спрайт неба
const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
})

// Спрайт земли
const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
})

// Герой
const hero = new Sprite({
    resource: resources.images.hero,
    frameSize: new Vector2(32, 32),
    hFrames: 3,
    vFrames: 8,
    frame: 1,
    position: new Vector2(
        gridCells(6),
        gridCells(5)
    ),
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

// Переменная в которой будет храниться целевая позиция для перемещения
const heroDestinationPosition = hero.position.duplicate()

// Переменная в которой будет находится направление героя
let heroFacing = DOWN

const shadow = new Sprite({
    resource: resources.images.shadow,
    frameSize: new Vector2(32, 32)
})

const update = ( deltaTime ) =>
{
    // Двигаем персонажа к целевой позиции
    const distance = moveTowards(hero, heroDestinationPosition, 1)

    // Проверяем не двигается ли персонаж сравнив дистанция до цели
    const hasArrived = distance <= 1

    // Если не двигается то позволяем сделать следующее движение
    if (hasArrived) {
        tryMove()
    }

    hero.step(deltaTime)
}

const tryMove = () =>
{
    if ( !input.direction) {
        // Тут мы можем запустить анимацию простоя в зависимости от направления
        if (heroFacing == DOWN) {
            hero.animations.play('standDown')
        }

        if (heroFacing == UP) {
            hero.animations.play('standUp')
        }

        if (heroFacing == LEFT) {
            hero.animations.play('standLeft')
        }

        if (heroFacing == RIGHT) {
            hero.animations.play('standRight')
        }
        return
    }

    let nextX = heroDestinationPosition.x
    let nextY = heroDestinationPosition.y
    const gridSize = gridCells(1)

    if (input.direction == DOWN) {
        nextY += gridSize
        hero.animations.play('walkDown')
    }

    if (input.direction == RIGHT) {
        nextX += gridSize
        hero.animations.play('walkRight')
    }

    if (input.direction == UP) {
        nextY -= gridSize
        hero.animations.play('walkUp')
    }

    if (input.direction == LEFT) {
        nextX -= gridSize
        hero.animations.play('walkLeft')
    }

    // Тут мы устанавливаем направление движения героя в зависимости от нажатия клавиш
    // Если клавиша не нажата то она остается прежней
    heroFacing = input.direction || heroFacing

    // Проврка на препятствия
    if (isSpaceFree(walls, nextX, nextY)) {
        heroDestinationPosition.x = nextX
        heroDestinationPosition.y = nextY
    }
}

const draw = () =>
{
    // Рисуем спрайты
    skySprite.drawImage(ctx, 0, 0)
    groundSprite.drawImage(ctx, 0, 0)

    // Смещаем спрайт героя в центр клетки
    const heroOffset = new Vector2(-8, -21)
    const heroPosX = hero.position.x + heroOffset.x
    const heroPosY = hero.position.y + heroOffset.y

    shadow.drawImage(ctx, heroPosX, heroPosY)
    hero.drawImage(ctx, heroPosX, heroPosY)
}

const gameLoop = new GameLoop(update, draw)
gameLoop.start()

