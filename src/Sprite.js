import { Vector2 } from "./Vector2.js";

/*
 * Класс для работы с спрайтами
 */
export class Sprite
{
    // Принимаем объект с настройками
    constructor( {
        resource, // Ресурс с изображением (экземпляр Resources)
        frameSize, // Размер кадра (например 16 пикселей)
        hFrames, // Количество кадров по горизонтали
        vFrames, // Количество кадров по вертикали
        frame, // Номер кадра по умолчанию
        scale, // Масштаб изображения
        position, // Начало координат
    } )
    {
        this.resource = resource
        this.frameSize = frameSize || new Vector2(16, 16)
        this.hFrames = hFrames || 1
        this.vFrames = vFrames || 1
        this.frame = frame || 0
        this.frameMap = new Map() // Создаем пустую коллекцию кадров
        this.scale = scale || 1
        this.position = position || new Vector2(0, 0)

        this.buildFrameMap()
    }

    /* Метод создания коллекции кадров из спрайт-листа
     * Для примера возьмем спрайт hero-sheet.png
     * У него много кадров и из этого мы будем делать коллекцию
     * которая позволит получить каждый отдельный кадр который нам будет нужен
     */
    buildFrameMap()
    {
        let frameCount = 0

        // Цикл по вертикали и горизонтали чтобы получить координы каждого кадра из спрайт-листа
        for (let v = 0; v < this.vFrames; v++) {
            for (let h = 0; h < this.hFrames; h++) {
                // Заполняем коллекцию кадров
                // arg1 - номер кадра (ключ по которому он будет доступен)
                // arg2 - координаты кадра в спрайте (ширина, высота)
                this.frameMap.set(frameCount, new Vector2(
                    this.frameSize.x * h,
                    this.frameSize.y * v
                ))

                frameCount += 1
            }
        }
    }

    /* Отрисовка спрайта
     * ctx - контекст
     * x - координата x на экране
     * y - координаты y на экране
     */
    drawImage( ctx, x, y )
    {
        // Если ресурс еще не загружен то выходим
        if ( !this.resource.isLoaded) {
            return null;
        }

        // Ищем координаты кадра в спрайте
        let frameCoordX = 0
        let frameCoordY = 0

        // Получаем координаты кадра из коллекции по номеру кадра
        // Это точечный кадр, т.е. динамический
        // Если мы будем менять номер кадра то мы будем менять координаты
        // И рисовать другой кадр
        const frame = this.frameMap.get(this.frame)

        // Если кадр найден в коллекции то берем координаты кадра из него
        if (frame) {
            frameCoordX = frame.x
            frameCoordY = frame.y
        }

        // Размеры кадра в переменной для удобства чтения далее
        const frameSizeX = this.frameSize.x
        const frameSizeY = this.frameSize.y

        // Рисуем спрайт
        ctx.drawImage(
            this.resource.image, // Экземпляр ресурса изображения из Resources
            frameCoordX, // Координата X кадра в спрайте
            frameCoordY, // Координата Y кадра в спрайте
            frameSizeX, // Ширина кадра
            frameSizeY, // Высота кадра
            x, // Координата X спрайта на экране
            y, // Координата Y спрайта на экране
            frameSizeX * this.scale, // Ширина спрайта с масштабированием
            frameSizeY * this.scale // Высота спрайта с масштабированием
        )
    }
}