import { GameObject } from "../../GameObject.js";
import { Sprite } from "../../Sprite.js";
import { resources } from "../../Resources.js";
import { Vector2 } from "../../Vector2.js";
import { events } from "../../Events.js";

/* Класс инвентаря
 * Он работает на событиях, с героем на прямую он никак не связан
 */
export class Inventory extends GameObject
{
    constructor()
    {
        super({
            position: new Vector2(0, 2)
        });

        this.items = []
        this.nextId = 0

        events.on('HERO_PICK_UP_ITEM', this, () => {
            this.nextId += 1

            this.items.push({
                id: this.nextId,
                image: resources.images.rod
            })

            this.renderInventory()
        })

        // Пример удаления предмета
        //setTimeout(() => {
        //    this.removeFromInventory(-1)
        //}, 2000)

        this.renderInventory()
    }

    renderInventory()
    {
        this.children.forEach(child => child.destroy())

        this.items.forEach((item, index) => {
            const sprite = new Sprite({
                resource: item.image,
                position: new Vector2(index * 12, 0)
            })

            this.addChild(sprite)
        })
    }

    removeFromInventory(id)
    {
        this.items = this.items.filter(item => item.id !== id)

        this.renderInventory()
    }
}