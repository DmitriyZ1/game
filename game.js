const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')
import { Player, Mob } from "./tanks.js"
import InfoPanel from "./game-info.js"
const whCanvas = { w: 640, h: 480 }

const infoScore = document.querySelector('.score-span'),
infoKills = document.querySelector('.kills-span'),
infoHP = document.querySelector('.info-hp'),
blockTime = document.querySelector('.time'),
blockOver = document.querySelector('.result'),
outTimeResult = document.querySelector('#out-teme-result'),
outScoreResult = document.querySelector('#out-score-result'),
outKillsResult = document.querySelector('#out-kills-result'),
resultButtons = document.querySelector('.result-buttons')

const infoBlock = new InfoPanel(
    infoScore, 
    infoKills, 
    infoHP, 
    blockTime, 
    "./pic/t1up.png", 
    blockOver, 
    outTimeResult,
    outScoreResult,
    outKillsResult, 
    resultButtons
)

canvas.width = whCanvas.w
canvas.height = whCanvas.h

const model1 = ["./pic/t1up.png", "./pic/t1down.png", "./pic/t1left.png", "./pic/t1right.png", "./pic/boom1.png", "./pic/armor.png"]
const model2 = ["./pic/t2up.png", "./pic/t2down.png", "./pic/t2left.png", "./pic/t2right.png", "./pic/boom1.png", "./pic/armor.png"]
const model3 = ["./pic/t3up.png", "./pic/t3down.png", "./pic/t3left.png", "./pic/t3right.png", "./pic/boom1.png", "./pic/armor.png"]

function funRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function start(obj) {
    const sizeTank = {w: 40, h:40}
    const speedPlaer = 2
    const speedMob = obj.speedMob
    const timeRechPlayer = 1
    const timeRechMob = obj.timeRechMob
    const hpPlayer = 3
    const modelsMob = [model2, model3]

    function randomModelMob(models){
        return models[funRandom(0,1)]
    }
   
    const pers = new Player(ctx,infoBlock,whCanvas,whCanvas.w / 2, whCanvas.h / 2, sizeTank.w, sizeTank.h, speedPlaer, model1, timeRechPlayer, hpPlayer)
    
    const arrMobs = []
    
    let xSpan = sizeTank.w / 2
    let ySpan = sizeTank.h / 2 
    
    for (let i = 0; i < obj.numberMob; i++) {
        arrMobs.push(new Mob(ctx,infoBlock,whCanvas,xSpan, ySpan, sizeTank.w, sizeTank.h, speedMob, randomModelMob(modelsMob), pers, timeRechMob))
        xSpan = xSpan + sizeTank.w * 2
    }
    arrMobs.push(pers)
    infoBlock.timeStart()
    infoBlock.renderInfo({score: 0, kills: 0, hp: hpPlayer})
    
    function gameProces(arr) {
        for (let item of arr) {
            item.render()
            item.move()
            item.gunshot()
            if (item.constructor.name === "Mob") {
                item.intelligence()
            }
        }
    }

    requestAnimationFrame(tick);
    function tick() {
        requestAnimationFrame(tick);
        ctx.clearRect(0, 0, whCanvas.w, whCanvas.h)
        gameProces(arrMobs)
    }

    document.addEventListener('keydown', (e) => {
        pers.keyGo(true, e.key)
        if(e.code === "x") return
    })

    document.addEventListener('keyup', (e) => {
        pers.keyGo(false, e.key)
    })
}

export default start