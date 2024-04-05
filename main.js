import './style.css'
import { resources } from "./src/Resources.js";
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./src/Vector2.js";
import { GameLoop } from "./src/GameLoop.js";
import { Input, DOWN, LEFT, RIGHT, UP } from "./src/Input.js";
import { gridCells, isSpaceFree } from "./src/helpers/grid.js";
import { moveTowards } from "./src/helpers/moveTowards.js";
import { walls } from "./src/levels/level_1.js";

const canvas = document.querySelector('#game-canvas')
const ctx = canvas.getContext('2d')

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
    )
})

const heroDestinationPosition = hero.position.duplicate()

const shadow = new Sprite({
    resource: resources.images.shadow,
    frameSize: new Vector2(32, 32)
})

const input = new Input()

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
}

const tryMove = () =>
{
    if ( !input.direction) {
        return
    }

    let nextX = heroDestinationPosition.x
    let nextY = heroDestinationPosition.y
    const gridSize = gridCells(1)

    if (input.direction == DOWN) {
        nextY += gridSize
        hero.frame = 0
    }

    if (input.direction == RIGHT) {
        nextX += gridSize
        hero.frame = 3
    }

    if (input.direction == UP) {
        nextY -= gridSize
        hero.frame = 6
    }

    if (input.direction == LEFT) {
        nextX -= gridSize
        hero.frame = 9
    }

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

