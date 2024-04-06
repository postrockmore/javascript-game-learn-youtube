import './style.css'
import { resources } from "./src/Resources.js";
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./src/Vector2.js";
import { GameLoop } from "./src/GameLoop.js";
import { Input } from "./src/Input.js";
import { gridCells, } from "./src/helpers/grid.js";
import { GameObject } from "./src/GameObject.js";
import { Hero } from "./src/objects/Hero/Hero.js";


// Берем canvas на котором будем рисовать
const canvas = document.querySelector('#game-canvas')
const ctx = canvas.getContext('2d')

// Главная сцена, все что мы будем видеть на экране
// Это дочерние объекты этой сцены
const mainScene = new GameObject({
    position: new Vector2(0, 0)
})

// Небо
const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
})
mainScene.addChild(skySprite)

// Земля
const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
})
mainScene.addChild(groundSprite)

// Герой
const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero)

// Добавляем в главную сцену наш ввод
mainScene.input = new Input()

// В этой функции мы будем вызывать методы step у главной сцены
// и всех дочерних объектов
// Этот метод будет вызываться каждый кадр
const update = ( delta ) =>
{
    mainScene.stepEntry(delta, mainScene)
}

// Это метод рисования объектов, он независит от update и FPS
// И вызывается на столько быстро на сколько это возможно
const draw = () =>
{
    mainScene.draw(ctx, 0, 0)
}

// Игровой цикл воздействующий на функции update и draw
const gameLoop = new GameLoop(update, draw)

// Запуск игрового цикла
gameLoop.start()

