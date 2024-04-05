// Константы направлений
export const LEFT = 'LEFT'
export const RIGHT = 'RIGHT'
export const UP = 'UP'
export const DOWN = 'DOWN'

/* Класс для работы с вводом
 * С его помощью мы сможем обрабатывать нажатия клавиш
 * и настроить управление в игре
 */
export class Input
{
    constructor()
    {
        this.heldDirections = []

        document.addEventListener('keydown', e =>
        {
            if (e.code === 'ArrowUp' || e.code === 'KeyW') {
                this.onArrowPressed(UP)
            }

            if (e.code === 'ArrowDown' || e.code === 'KeyS') {
                this.onArrowPressed(DOWN)
            }

            if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
                this.onArrowPressed(LEFT)
            }

            if (e.code === 'ArrowRight' || e.code === 'KeyD') {
                this.onArrowPressed(RIGHT)
            }
        })

        document.addEventListener('keyup', e =>
        {
            if (e.code === 'ArrowUp' || e.code === 'KeyW') {
                this.onArrowReleased(UP)
            }

            if (e.code === 'ArrowDown' || e.code === 'KeyS') {
                this.onArrowReleased(DOWN)
            }

            if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
                this.onArrowReleased(LEFT)
            }

            if (e.code === 'ArrowRight' || e.code === 'KeyD') {
                this.onArrowReleased(RIGHT)
            }
        })
    }

    // Геттер получения первого направления движения
    get direction()
    {
        return this.heldDirections[0]
    }

    // Метод добавления направления движения в начало массива
    // Если его еще в нем нет
    onArrowPressed( direction )
    {
        if (this.heldDirections.includes(direction)) {
            return
        }

        this.heldDirections.unshift(direction)
    }

    // Метод удаления направления движения из массива
    onArrowReleased( direction )
    {
        this.heldDirections =
            this.heldDirections.filter(d => d !== direction)
    }
}