import { GameObject } from "../../GameObject.js";
import { Sprite } from "../../Sprite.js";
import { events } from "../../Events.js";
import { resources } from "../../Resources.js";
import { Vector2 } from "../../Vector2.js";

/* Класс предмета с которым будет взаимодействие
 *
 */
export class Rod extends GameObject
{
    constructor( x, y )
    {
        super({
            position: new  Vector2(x, y)
        });

        this.sprite = new Sprite({
            resource: resources.images.rod,
            position: new Vector2(0, -5),
        })
        this.addChild(this.sprite)

        events.on('HERO_POSITION', this, position => {
            const roundedPosX = Math.round(position.x)
            const roundedPosY = Math.round(position.y)

            if (roundedPosX === this.position.x && roundedPosY === this.position.y) {
                this.onCollideWithHero()
            }
        })
    }

    // Метод который вызовется если мы столкнулись с этим предметом
    onCollideWithHero() {
        this.destroy()

        events.emit('HERO_PICK_UP_ITEM', {
            image: resources.images.rod,
            position: this.position
        })
    }
}