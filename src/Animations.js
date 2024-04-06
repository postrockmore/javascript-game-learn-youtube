/* Абстрактный класс управления анимациями
 * Передаем объект с анимациями и играем активную анимацию
 * Анимации должны быть FrameIndexPattern
 */
export class Animations
{
    constructor( patterns )
    {
        this.patterns = patterns
        this.activeKey = Object.keys(this.patterns)[0]
    }

    /* С помощью этого метода можно получить текущий кадр
     * из плеера активной анимации
     */
    get frame()
    {
        return this.patterns[this.activeKey].frame
    }

    /* Метод запуска анимации,
     * так же можно передать кадр с которого она начнется
     * и стартовое время с которого начнется анимация
     */
    play(key, startAtTime = 0) {
        if (this.activeKey == key) {
            return null
        }

        this.activeKey = key
        this.patterns[this.activeKey].currentTime = startAtTime
    }

    // Метод проигрывания анимации
    step(delta)
    {
        this.patterns[this.activeKey].step(delta)
    }
}