/* Трек-листы анимации
 * Тут мы определяем объект анимации - ее время проигрывания
 * и какие кадры будудут использоваться в какой промежуток времени
 * В rootFrame мы передаем главный кадр относительно которого
 * мы будем определять остальные кадры из спрайта
 */
const makeWalkingFrames = (rootFrame = 0) => {
    return {
        duration: 400,
        frames: [
            {
                time: 0,
                frame: rootFrame + 1,
            },
            {
                time: 100,
                frame: rootFrame,
            },
            {
                time: 200,
                frame: rootFrame + 1,
            },
            {
                time: 300,
                frame: rootFrame + 2,
            },
        ]
    }
}

/* Определяем анимацию покоя тоже в отдельном методе
 * чтобы дальше было удобно выносить в константы
 * Анимацию покоя мы тоже вынесли в отдельный объект
 * даже если тут используется всего 1 кадр
 * т.к. в дальнейшем эта анимация может изменится на динамическую
 * Например когда персонаж стоит оно может проигрывать анимацию дыхания
 */
const makeStandingFrames = (rootFrame = 0) => {
    return {
        duration: 400,
        frames: [
            {
                time: 0,
                frame: rootFrame,
            }
        ]
    }
}

/* Константы которые будут хранить наши объекты анимации
 * Для дальнейшего использования
 * Мы меняем только наш корневой кадр и функция уже сама выберет остальные
 */
export const WALK_DOWN = makeWalkingFrames(0)
export const WALK_RIGHT = makeWalkingFrames(3)
export const WALK_UP = makeWalkingFrames(6)
export const WALK_LEFT = makeWalkingFrames(9)

export const STAND_DOWN = makeStandingFrames(1)
export const STAND_RIGHT = makeStandingFrames(4)
export const STAND_UP = makeStandingFrames(7)
export const STAND_LEFT = makeStandingFrames(10)