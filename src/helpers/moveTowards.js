/* Функция двигает объект к цели с задачей скорости
 * И возвращает расстояние до цели
 * В аргументах мы принимаем сам объект и воздействуем на него прямо тут
 */
export function moveTowards(obj, destination, speed)
{
    // Определяем расстояние до цели
    let dx = destination.x - obj.position.x
    let dy = destination.y - obj.position.y

    // Квадратный корень суммы квадратов своих аргументов
    let distance = Math.hypot(dx, dy)

    // Если дистанция меньше заданной скорости, то установим объект в цель
    if (distance <= speed) {
        obj.position.x = destination.x
        obj.position.y = destination.y
    } else { // Иначе двигаем объект в направлении цели
        // Нормализуем значения вектора разделив их на расстояние
        const normalizeX = dx / distance
        const normalizeY = dy / distance

        // Приблизим позицию объекта в соответствии с его скоростью
        obj.position.x += normalizeX * speed
        obj.position.y += normalizeY * speed

        // Пересчитаем расстояние до цели для возврата из функции,
        // т.к. в этой ветке условия мы передвинули позицию после расчетов
        dx = destination.x - obj.position.x
        dy = destination.y - obj.position.y
        distance = Math.hypot(dx, dy)
    }

    // Возвращаем расстояние до цели
    return distance
}