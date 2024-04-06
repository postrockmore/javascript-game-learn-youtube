/* Класс для работы с событиями
 */
class Events
{
    callbacks = []
    nextId = 0

    /* Метод вызова события
     * @param eventName - название события
     * @param data - данные
     */
    emit( eventName, data )
    {
        this.callbacks.forEach(callback =>
        {
            if (callback.eventName === eventName) {
                callback.callback(data)
            }
        })
    }

    /*  Метод подписки на событие
     *  @param eventName - название события
     *  @param caller - объект, который подписывается на событие
     *  @param callback - функция обработчик
     */
    on( eventName, caller, callback )
    {
        this.nextId += 1

        this.callbacks.push({
            id: this.nextId,
            eventName,
            caller,
            callback
        })

        return this.nextId
    }

    // Метод отписки от события по ID
    off( id )
    {
        this.callbacks = this.callbacks.filter(
            callback => callback.id !== id
        )
    }

    // Метод отписки от события по объекту, который подписался
    unsubscribe( caller )
    {
        this.callbacks = this.callbacks.filter(
            callback => callback.caller !== caller
        )
    }
}

// Создаем один экземпляр класса событий
export const events = new Events()