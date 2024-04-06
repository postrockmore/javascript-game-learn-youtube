/* Абстрактный класс игрового объекта
 * Позволяет создавать полноценные объекты в игре с помощью наследования
 *
 */
import { Vector2 } from "./Vector2.js";

export class GameObject
{
    constructor( {
        position,
    } )
    {
        this.position = position || new Vector2(0, 0) // Позиция объекта в игре
        this.children = [] // Тут будут находится дочерние объекты
    }

    /* Метод шага который запускает такие же функции для всех дочерних объектов
     * Так же запускает шаг для самого объекта
     */
    stepEntry(delta, root)
    {
        this.children.forEach(child => child.stepEntry(delta, root))

        this.step(delta, root)
    }

    /* Метод игрового цикла без реализации, реализация будет в классах-наследниках
     * Этот метод будет вызываться каждый кадр
     */
    step (delta)
    {

    }

    /* Метод отображения объекта
     * Он так же запускает рисование для дочерних объектов
     * В этом методе сначала рисуется родительский объект
     * а затем дочерние, чтобы дочерние были на слой выше родителя
     * и родитель их не перекрывал собой
     */
    draw(ctx, x, y)
    {
        // Расчет места отображения
        const drawPosX = x + this.position.x
        const drawPosY = y + this.position.y

        this.drawImage(ctx, drawPosX, drawPosY)

        this.children.forEach(child => child.draw(ctx, drawPosX, drawPosY))
    }

    // Метод рисования без реализации, реализация будет в классах-наследниках, тк не всем объектам требуется отображения
    drawImage(ctx, x, y)
    {

    }

    addChild(gameObject)
    {
        this.children.push(gameObject)
    }

    removeChild(gameObject)
    {
        this.children = this.children.fillter(g => g !== gameObject)
    }
}