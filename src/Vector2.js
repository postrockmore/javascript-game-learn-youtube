/*
 * Класс для работы с векторами, позволяет описать горизонталь и вертикаль
 * Пример использования:
 * const position = new Vector2(16, 16)
 * console.log(position.x, position.y)
 */
export class Vector2
{
    constructor( x = 0, y = 0 )
    {
        this.x = x
        this.y = y
    }

    // Утилита дублирования вектора
    duplicate()
    {
        return new Vector2(this.x, this.y)
    }
}