
class TimeGame{
    constructor(block){
        this.sec = 0
        this.min = 0
        this.hours = 0
        this.block = block

        this.interval;
    }

    _updateTime() {
        this.sec++
        if(this.sec === 60){
            this.min++
            this.sec = 0
        }
        if(this.min === 60){
            this.hours++
            this.min = 0
        }
        let secPrep = String(this.sec).length >= 2 ? String(this.sec) : `0${this.sec}` 
        let minPrep = String(this.min).length >= 2 ? String(this.min) : `0${this.min}` 
        let hoursPrep = String(this.hours).length >= 2 ? String(this.hours) : `0${this.hours}` 
       
        this.block.textContent = `${hoursPrep}:${minPrep}:${secPrep}`
    }

    startTime(){
        this.interval = setInterval(this._updateTime.bind(this), 1000);
    }

    stopTime(){
        if(this.interval){
            clearInterval(this.interval)
        }
        return {sec: this.sec, min:this.min, hours:this.hours}
    }
}


class InfoPanel{
    constructor(
        blockScore, 
        blockKills, 
        blockHP, 
        blockClock, 
        srcPicHP, 
        blockResult,
        blockOutTime,
        blockOutScore,
        blockOutKills,
        blockButtons
        ){
        this.blockScore = blockScore
        this.blockKills = blockKills
        this.blockHP = blockHP
        this.srcPicHP = srcPicHP
        this.time = new TimeGame(blockClock)
        this.blockResult = blockResult
        this.blockOutTime = blockOutTime
        this.blockOutScore = blockOutScore
        this.blockOutKills = blockOutKills
        this.blockButtons = blockButtons
    }

    renderInfo(obj){
        if(this.blockScore,  this.blockKills, this.blockHP){
            if('score' in obj){
                this.blockScore.textContent = obj.score
            }
            if('kills' in obj){
                this.blockKills.textContent = obj.kills
            }
            if('hp' in obj){
                this.blockHP.innerHTML = ''
                this.blockHP.appendChild(this._hpRender(obj.hp))
            }
        }
    }

    timeStart(){
        this.time.startTime()
    }

    timeStop(){
        return this.time.stopTime()
    }

    _hpRender(n){
        const hp = document.createElement('div')
        hp.classList.add('hp-line')
        for(let i = 0; i < n; i++){
            const pic = document.createElement('img')
            pic.classList.add('pic-hp')
            pic.setAttribute('src', this.srcPicHP)
            pic.setAttribute('alt', 'pic')
            hp.appendChild(pic)
        }
        return hp
    }

    outGameOver(time, score, kills){
        if(this.blockResult && this.blockOutTime && this.blockOutKills && this.blockOutScore && this.blockButtons){
            this.blockResult.style.display = "flex"
            this.blockOutTime.textContent = `${time.hours}:${time.min}:${time.sec}`
            this.blockOutKills.textContent = kills
            this.blockOutScore.textContent = score
            this.blockButtons.addEventListener('click', (e) => {
                if(e.target.id === "exit-menu"){
                    location.reload()
                }
            })
        }
    }
}

export default InfoPanel

