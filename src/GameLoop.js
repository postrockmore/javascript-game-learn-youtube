/*
 * Класс для работы с игровым циклом
 * Принимает в себя функции обновления и отрисовки:
 * - Функция обновления будет использоваться для обработки логики игры
 *   и разных вычислений которые зависят от времени
 * - Функция отрисовки будет использоваться для отрисовки игровых элементов
 *   в которой не будет происходить никаких вычислений
 *
 * Это проявляется из за того что у нас может быть разное время между кадрами
 * и темп игры без этих реализаций будет сильно плавать (быстрее/медленнее)
 * на разных устройствах
 */
export class GameLoop
{
    constructor( update, render )
    {
        this.lastFrameTime = 0
        this.accumulatedTime = 0
        this.timeStep = 1000 / 60 // ~ 60FPS

        this.update = update
        this.render = render

        this.rafId = null // Идентификатор анимации
        this.isRunning = false // Флаг запуска игрового цикла
    }

    // Запуск игрового цикла
    mainLoop( timestamp )
    {
        if ( !this.isRunning) {
            return
        }

        // Расчет времени в секундах которое потребовалось для отрисовки последнего кадра
        // Это нужно для того чтобы игра не зависела от частоты кадра
        // Для этого мы берем текущее время и вычиаем из него время последнего кадра
        // Затем записываем в переменную времени проследнего кадра текущее время
        let deltaTime = timestamp - this.lastFrameTime
        this.lastFrameTime = timestamp

        // Накапливаемя время которое потребовалось на отрисовку последнего кадра
        this.accumulatedTime += deltaTime

        // Тут и происходит наш фикс независимоти от частоты кадра
        // Запускаем цикл пока у нас накопленное время которое потребовалось на отрисовку последнего кадра
        // больше чем наш FPS запускаем метод обновления и сбрасываем накопленное время
        // Так же в этот метод передаем переменную используя которую мы сможем достич плавности игры
        while (this.accumulatedTime >= this.timeStep) {
            this.update(this.timeStep)
            this.accumulatedTime -= this.timeStep
        }

        // Запускаем отрисовку
        this.render()

        // Сохраняем следующий шаг в переменную
        // чтобы в дальнейшем его можно было остановить по этому ID
        this.rafId = requestAnimationFrame(this.mainLoop.bind(this))
    }

    // Метод запуска игрового цикла
    start()
    {
        if ( !this.isRunning) {
            this.isRunning = true
            this.rafId = requestAnimationFrame(this.mainLoop.bind(this))
        }
    }

    // Метод остановки игрового цикла
    stop() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId)
            this.rafId = null
        }

        this.isRunning = false
    }
}