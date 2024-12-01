class Tank {
    constructor(context, info,wh, x = 0, y = 0, sizex = 40, sizey = 40, speed = 1, skin, timeRech = 1) {
        this.context = context
        this.x = x
        this.y = y
        this.sizex = sizex
        this.sizey = sizey
        this.speed = speed
        this.skin = skin
        this.timeRech = timeRech
        this.info = info
        this.wh = wh

        this.src = this.skin[0]
        this.effectSrc = null
        this.effect = false
        this.left = false
        this.right = false
        this.up = false
        this.down = false
        this.fire = false
        this.recharge = false
        this.iKilled = false
        this.invulnerability = false

        this.positionWeapon = "up"
        this.arrFire = []
    }

    funRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    render() {
        const imgPlayer = new Image();
        imgPlayer.src = this.src
        this.context.drawImage(imgPlayer, this.x - (this.sizex / 2), this.y - (this.sizey / 2), this.sizex, this.sizey);
        if(this.effect && this.effectSrc){
            const effect = new Image();
            effect.src = this.effectSrc;
            this.context.drawImage(effect, this.x - (this.sizex / 2), this.y - (this.sizey / 2), this.sizex, this.sizey);
        }
    }

    temporaryArmor(t = 2) {
        this.invulnerability = true
        this.effect = true
        this.effectSrc = this.skin[5]
        const temporary = setTimeout(() => {
            this.invulnerability = false
            this.effect = false
            clearTimeout(temporary)
        }, t * 1000)
    }

    killed(thisIsInv = false, obj = { x: this.wh.w / 2, y: this.wh.h / 2 }) {
        this.src = this.skin[4]
        this.iKilled = true
        if(this.hp) {
            this.hp--
            this.info.renderInfo({hp: this.hp})
        }
        if("hp" in this && this.hp <= 0){
            this.info.outGameOver(this.info.timeStop() ,this.score,this.murders)
            return
        } else {
            const timeKill = setTimeout(() => {
                this.x = obj.x
                this.y = obj.y
                this.iKilled = false
                this.src = this.skin[0]
                if (thisIsInv) {
                    this.temporaryArmor(5)
                }             
                clearTimeout(timeKill)
            }, 1000)
        }
    }

    move() {
        if (!this.iKilled) {
            if (this.left) {
                if ((this.x - this.sizex / 2) <= 0) {
                    return
                } else {
                    this.x = this.x - this.speed
                    this.src = this.skin[2]
                    this.positionWeapon = "left"
                }
            }
            if (this.right) {
                if ((this.x + this.sizex / 2) >= this.wh.w) {
                    return
                } else {
                    this.x = this.x + this.speed
                    this.src = this.skin[3]
                    this.positionWeapon = "right"
                }
            }
            if (this.up) {
                if ((this.y - this.sizex / 2) <= 0) {
                    return
                } else {
                    this.y = this.y - this.speed
                    this.src = this.skin[0]
                    this.positionWeapon = "up"
                }
            }
            if (this.down) {
                if ((this.y + this.sizex / 2) >= this.wh.h) {
                    return
                } else {
                    this.y = this.y + this.speed
                    this.src = this.skin[1]
                    this.positionWeapon = "down"
                }
            }
        }
    }

    rechargeTime(time) {
        this.recharge = true
        const t = setTimeout(() => {
            this.recharge = false
            clearTimeout(t)
        }, time * 1000)
    }
    
    activeFire() {
        if (!this.recharge) {
            this.arrFire.push(new Missile(this.fireShotX(), this.fireShotY(), this.positionWeapon, 3))
            this.rechargeTime(this.timeRech)
            if(this.invulnerability){
                this.invulnerability = false
                this.effect = false
            }
        }
    }

    gunshot() {
        if (this.fire) {
            if (this.arrFire.length > 0) {
                for (let i = 0; i < this.arrFire.length; i++) {
                    let x = this.arrFire[i].x, y = this.arrFire[i].y
                    if (x > this.wh.w || x < 0 || y > this.wh.h || y < 0) { this.arrFire[i].remove = true }
                    if (this.arrFire[i].direction === "up") {
                        this.context.fillRect(x, y, 8, 8)
                        this.arrFire[i].y = y - this.arrFire[i].speed
                    }
                    if (this.arrFire[i].direction === "down") {
                        this.context.fillRect(x, y, 8, 8)
                        this.arrFire[i].y = y + this.arrFire[i].speed
                    }
                    if (this.arrFire[i].direction === "right") {
                        this.context.fillRect(x, y, 8, 8)
                        this.arrFire[i].x = x + this.arrFire[i].speed
                    }
                    if (this.arrFire[i].direction === "left") {
                        this.context.fillRect(x, y, 8, 8)
                        this.arrFire[i].x = x - this.arrFire[i].speed
                    }
                }
                this.arrFire = this.arrFire.filter((item) => !item.remove)
            }
        }
    }

    fireShotX() {
        if (this.positionWeapon === "up") {
            return this.x - 4
        }
        if (this.positionWeapon === "down") {
            return this.x - 4
        }
        if (this.positionWeapon === "right") {
            return this.x + 21
        }
        if (this.positionWeapon === "left") {
            return this.x - 29
        }
    }

    fireShotY() {
        if (this.positionWeapon === "up") {
            return this.y - 29
        }
        if (this.positionWeapon === "down") {
            return this.y + 21
        }
        if (this.positionWeapon === "right") {
            return this.y - 4
        }
        if (this.positionWeapon === "left") {
            return this.y - 4
        }
    }
}

class Player extends Tank {
    constructor(context,info,wh,x = 0, y = 0, sizex = 40, sizey = 40, speed = 1, skin, timeRech, hp) {
        super(context,info,wh,x, y, sizex, sizey, speed, skin, timeRech)
        this.downKey = false
        this.hp = hp
        this.murders = 0
        this.score = 0
    }

    progress(){
        this.murders++
        this.score = this.score + 100
        this.info.renderInfo({kills:this.murders, score: this.score})
    }

    keyGo(down, key) {
        if (down) {
            this.downKey = true
            if (key === "ArrowLeft") { this.left = true }
            if (key === "ArrowRight") { this.right = true }
            if (key === "ArrowUp") { this.up = true }
            if (key === "ArrowDown") { this.down = true }
            if (key === " ") {
                this.fire = true;
                this.activeFire()
            }
        } else if (!down) {
            this.downKey = false
            if (key === "ArrowLeft") { this.left = false }
            if (key === "ArrowRight") { this.right = false }
            if (key === "ArrowUp") { this.up = false }
            if (key === "ArrowDown") { this.down = false }
        }
    }
}

class Mob extends Tank {
    constructor(context,info,wh,x = 0, y = 0, sizex = 40, sizey = 40, speed = 1, skin, purpose, timeRech) {
        super(context,info,wh,x, y, sizex, sizey, speed, skin, timeRech)
        this.purpose = purpose
        this.action = false
        this.plane = false
    }

    choosingTrajectory() {
        let xtr = Math.abs(this.x - this.purpose.x), ytr = Math.abs(this.y - this.purpose.y)
        if (xtr > ytr) {
            return false
        } else {
            return true
        }
    }

    timerAction() {
        this.action = true
        const ogogo = setTimeout(() => {
            if (this.action) {
                this.action = false
                this.plane = this.choosingTrajectory()
            }
            clearTimeout(ogogo)
        }, this.funRandom(1, 4) * 1000)
    }

    revival() {
        let randomnum = this.funRandom(0, 20)
        if (randomnum > 0 && randomnum <= 5) {
            return { x: this.sizex / 2, y: this.sizey / 2 }
        } else if (randomnum > 5 && randomnum <= 10) {
            return { x: this.sizex / 2, y: this.wh.h - this.sizey / 2 }
        } else if (randomnum > 10 && randomnum <= 15) {
            return { x: this.wh.w - this.sizey / 2, y: this.wh.h - this.sizey / 2 }
        } else if (randomnum > 15) {
            return { x: this.wh.w - this.sizey / 2, y: this.sizey / 2 }
        }
    }

    intelligence() {
        let closerX = Math.abs(this.x - this.purpose.x), closerY = Math.abs(this.y - this.purpose.y)
        if (closerX < this.sizex && closerY < this.sizey && !this.purpose.iKilled && !this.purpose.invulnerability && !this.iKilled) {
            this.purpose.killed(true)
        }
        if (this.purpose.arrFire.length > 0) {
            for (let item of this.purpose.arrFire) {
                let fireFlyX = Math.abs(this.x - item.x - 4), fireFlyY = Math.abs(this.y - item.y - 4)
                if (fireFlyX < 24 && fireFlyY < 24 && !this.iKilled) {
                    item.remove = true
                    this.killed(false, this.revival())
                    this.purpose.progress()
                }
            }
        }
        if ((!this.iKilled) &&
            ((this.positionWeapon === "up" && Math.abs(this.x - this.purpose.x) < 40 && (this.y - this.purpose.y) > 0) ||
                (this.positionWeapon === "down" && Math.abs(this.x - this.purpose.x) < 40 && (this.y - this.purpose.y) < 0) ||
                (this.positionWeapon === "right" && Math.abs(this.y - this.purpose.y) < 40 && (this.x - this.purpose.x) < 0) ||
                (this.positionWeapon === "left" && Math.abs(this.y - this.purpose.y) < 40 && (this.x - this.purpose.x) > 0))) {
            this.fire = true;
            this.activeFire()
        }
        if (this.arrFire.length > 0) {
            for (let item of this.arrFire) {
                let fireFlyX = Math.abs(this.purpose.x - item.x - 4), fireFlyY = Math.abs(this.purpose.y - item.y - 4)
                if (fireFlyX < 24 && fireFlyY < 24 && !this.purpose.iKilled && !this.purpose.invulnerability) {
                    item.remove = true
                    this.purpose.killed(true)
                }
            }
        }

        if (!this.action) {
            if (this.plane) {
                this.right = false
                this.left = false
                if (this.y > this.purpose.y) {
                    this.up = true
                    this.down = false
                    this.timerAction()
                }
                if (this.y < this.purpose.y) {
                    this.down = true
                    this.up = false
                    this.timerAction()
                }
            } else {
                this.up = false
                this.down = false
                if (this.x < this.purpose.x) {
                    this.right = true
                    this.left = false
                    this.timerAction()
                }
                if (this.x > this.purpose.x) {
                    this.left = true
                    this.right = false
                    this.timerAction()
                }
            }
        }
    }
}

class Missile {
    constructor(x, y, direction, speed) {
        this.id = this.idgenerator()
        this.x = x
        this.y = y
        this.direction = direction
        this.speed = speed
        this.remove = false
    }

    idgenerator() {
        return Math.random().toString(36).substring(3, 10);
    }
}

export {Player, Mob, Missile}