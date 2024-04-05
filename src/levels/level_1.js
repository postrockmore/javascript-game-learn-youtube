/*
 * Уровень 1
 * Описываем препятсвия в сетке
 */

// Создаем коллекцию в которой будут хранится препятсивя
export const walls = new Set()

walls.add('64,48') // Деревья

walls.add('64,64') // Блоки
walls.add('64,80')
walls.add('80,64')
walls.add('80,80')

walls.add('112,80') // Вода
walls.add('128,80')
walls.add('144,80')
walls.add('160,80')