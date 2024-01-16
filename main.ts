namespace SpriteKind {
    export const UI = SpriteKind.create()
}
function InitKeys () {
    for (let index = 0; index <= keypadList.length - 1; index++) {
        mySprite = sprites.create(keypadList[index], SpriteKind.UI)
        mySprite.left = index % 7 * 23
        mySprite.top = Math.floor(index / 7) * 31
    }
}
function UpdateCursor () {
    cursorSprite.left = curX * 23
    cursorSprite.top = curY * 31
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    curX = Math.max(0, curX - 1)
    UpdateCursor()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (curX == 6) {
        curY = Math.min(2, curY + 1)
    } else {
        curY = Math.min(3, curY + 1)
    }
    UpdateCursor()
})
sprites.onCreated(SpriteKind.UI, function (sprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
})
function clearScreen () {
    sprite_list = sprites.allOfKind(SpriteKind.UI)
    for (let value of sprite_list) {
        value.destroy()
    }
}
function InitCursor () {
    cursorSprite = sprites.create(img`
        8 8 8 8 8 . . . . . . . . . . 8 8 8 8 8
        8 8 8 8 8 . . . . . . . . . . 8 8 8 8 8
        8 8 . . . . . . . . . . . . . . . . 8 8
        8 8 . . . . . . . . . . . . . . . . 8 8
        8 8 . . . . . . . . . . . . . . . . 8 8
        8 8 . . . . . . . . . . . . . . . . 8 8
        . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . .
        8 8 . . . . . . . . . . . . . . . . 8 8
        8 8 . . . . . . . . . . . . . . . . 8 8
        8 8 . . . . . . . . . . . . . . . . 8 8
        8 8 . . . . . . . . . . . . . . . . 8 8
        8 8 . . . . . . . . . . . . . . . . 8 8
        . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . . . . . .
        8 8 . . . . . . . . . . . . . . . . 8 8
        8 8 . . . . . . . . . . . . . . . . 8 8
        8 8 . . . . . . . . . . . . . . . . 8 8
        8 8 8 8 8 . . . . . . . . . . 8 8 8 8 8
        8 8 8 8 8 . . . . . . . . . . 8 8 8 8 8
    `, SpriteKind.UI)
    UpdateCursor()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    current = curY * 7 + curX
    Selections[current] = Selections[current] * -1
    if (Selections[current] == 1) {
        if (SelectedCount == 4) {
            Selections[current] = Selections[current] * -1
        } else {
            SelectedCount += 1
            keypadList[current].replace(0, 7)
        }
    } else {
        SelectedCount += -1
        keypadList[current].replace(7, 0)
    }
    clearScreen()
    InitKeys()
    InitCursor()
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (curY < 3) {
        curX = Math.min(6, curX + 1)
    } else {
        curX = Math.min(5, curX + 1)
    }
    UpdateCursor()
})
function InitArray () {
    Selections = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    curY = Math.max(0, curY - 1)
    UpdateCursor()
})
let SelectedCount = 0
let Selections: number[] = []
let current = 0
let sprite_list: Sprite[] = []
let cursorSprite: Sprite = null
let mySprite: Sprite = null
let curY = 0
let curX = 0
let list: number[] = []
curX = 0
curY = 0
scene.setBackgroundImage(bgImage)
InitArray()
InitKeys()
InitCursor()
