/* Плеер анимации
 * Передаем ему конфиг анимации, например из heroAnimations.js
 */

export class FrameIndexPattern
{
    constructor(animationConfig)
    {
        this.currentTime = 0
        this.animationConfig = animationConfig
        this.duration = animationConfig.duration || 500
    }

    // Позволяет получить нужный кадр по текущему времени
    get frame()
    {
        const { frames } = this.animationConfig

        for (let i = frames.length - 1; i >= 0; i--) {
            if (this.currentTime >= frames[i].time) {
                return frames[i].frame
            }
        }

        throw "Кадра по текущему времени не существует"
    }

    // Счетчик времени анимации и ее зацикливание
    step(delta)
    {
        this.currentTime += delta

        if (this.currentTime >= this.duration) {
            this.currentTime = 0
        }
    }
}