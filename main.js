import './style.css'
import { resources } from "./src/Resources.js";
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./src/Vector2.js";
import { GameLoop } from "./src/GameLoop.js";
import { Input } from "./src/Input.js";
import { gridCells, } from "./src/helpers/grid.js";
import { GameObject } from "./src/GameObject.js";
import { Hero } from "./src/objects/Hero/Hero.js";
import { Camera } from "./src/Camera.js";
import { Rod } from "./src/objects/Rod/Rod.js";

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

// Земля
const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
})
mainScene.addChild(groundSprite)

// Герой
const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero)

const rod = new Rod(gridCells(7), gridCells(6))
mainScene.addChild(rod)

// Камера
const camera = new Camera()
mainScene.addChild(camera)

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
    // Очистка canvas от предыдещего кадра
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Рисуем небо отдельно чтобы камера его не двигала
    // Т.к. камера сдвигает всю сцену
    skySprite.drawImage(ctx, 0, 0)

    // Сохранение текущей позиции отображения
    ctx.save()

    // Смещение позиции отображения
    ctx.translate(camera.position.x, camera.position.y)

    // Рисуем главную сцену
    mainScene.draw(ctx, 0, 0)

    // Восстанавливаем позицию отображения
    ctx.restore()
}

// Игровой цикл воздействующий на функции update и draw
const gameLoop = new GameLoop(update, draw)

// Запуск игрового цикла
gameLoop.start()

