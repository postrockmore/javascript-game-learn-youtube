/*
 * Класс для загрузки ресурсов приложения
 */

class Resources
{
    constructor()
    {
        // Список того что мы планируем загрузить для приложения
        this.toLoad = {
            sky: "/sprites/sky.png",
            ground: "/sprites/ground.png",
            hero: "/sprites/hero-sheet.png",
            shadow: "/sprites/shadow.png",
            rod: "/sprites/rod.png"
        }

        this.images = {}

        // Загружаем все изображения
        Object.keys(this.toLoad).forEach(key =>
        {
            const image = new Image()
            image.src = this.toLoad[key]

            this.images[key] = {
                image: image,
                isLoaded: false // Флаг для того чтобы понять загружено ли изображение
            }

            // Событие загрузки изображения
            image.onload = () =>
            {
                this.images[key].isLoaded = true
            }
        })
    }
}

// Экземпляр ресурсов для 
//использования во всем приложении
export const resources = new Resources()