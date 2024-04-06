import { events } from "./Events.js";
import { GameObject } from "./GameObject.js";
import { Vector2 } from "./Vector2.js";

export class Camera extends GameObject
{
    constructor()
    {
        super({
        });

        events.on('HERO_POSITION', this, position => {
            const objectHalf = 8
            const canvasW = 320
            const canvasH = 180
            const halfW = - objectHalf + (canvasW / 2)
            const halfH = - objectHalf + (canvasH / 2)

            this.position = new Vector2(
                -position.x + halfW,
                -position.y + halfH
            )
        })
    }
}