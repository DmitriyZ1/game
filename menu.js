import start from "./game.js"

const menuArr = [
    {
        title: "Привет",
        list: [
            { name: "Начать игру", command: "start" },
            { name: "Помощь", command: "help" }
        ]
    },
    {
        title: "Сложность",
        list: [
            { name: "Легко", command: "easy" },
            { name: "Нормально", command: "norm" },
            { name: "Сложно", command: "hard" },
            { name: "Очень сложно", command: "super hard" }
        ]
    },
    {
        title: "Количество врагов",
        count: 8,
    }
]

const menu = document.querySelector('.menu-content')
const list = document.querySelector('.list-menu')
const title = document.querySelector('.title-menu')
const runner = document.querySelector('#runner')
const range = document.querySelector('.range-menu')
const count = document.querySelector('.count')
const thumb = document.querySelector('.thumb-menu')
const block = document.querySelector('.menu')
const game = document.querySelector('.game-wrap')
const help = document.querySelector('.help')


class StartMenu {
    constructor(
        arrMenu = [],
        menuElemDOM = null,
        listDOM = null,
        titleDOM = null,
        runnerDOM = null,
        rangeDOM = null,
        countDOM = null,
        thumbDOM = null,
        menuBlockDOM = null,
        gemeDOM = null,
        funStart = null,
        helpDOM = null
    ) {
        this.arrMenu = arrMenu
        this.menuElemDOM = menuElemDOM
        this.listDOM = listDOM
        this.titleDOM = titleDOM
        this.runnerDOM = runnerDOM
        this.rangeDOM = rangeDOM
        this.countDOM = countDOM
        this.thumbDOM = thumbDOM
        this.countMenu = 0
        this.itemMenu = this.arrMenu[this.countMenu]
        this.menuBlockDOM = menuBlockDOM
        this.gameDOM = gemeDOM
        this._funStart = funStart
        this.setting = { speedMob: 0, timeRechMob: 0, numberMob: 4 }
        this.helpDOM = helpDOM
    }

    _renderMenu() {
        if (this.titleDOM && this.listDOM && this.runnerDOM && this.countDOM && this.thumbDOM) {
            if ("title" in this.itemMenu) {
                this.titleDOM.style.display = "block"
                this.titleDOM.innerHTML = ""
                this.titleDOM.innerText = this.itemMenu.title
            } else {
                this.titleDOM.style.display = "none"
            }
            if ("list" in this.itemMenu && this.itemMenu.list.length > 0) {
                this.listDOM.style.display = "block"
                this.runnerDOM.style.display = "block"
                this.listDOM.innerHTML = ""
                this.itemMenu.list.forEach(elem => {
                    const li = document.createElement('li')
                    li.classList.add('.item-menu')
                    li.innerText = elem.name
                    this.listDOM.append(li)
                })
            } else {
                this.listDOM.style.display = "none"
                this.runnerDOM.style.display = "none"
            }

            if ("count" in this.itemMenu) {
                this.thumbDOM.style.display = "block"
                this.rangeDOM.setAttribute('max', this.itemMenu.count)
                this._rangeInput()
            } else {
                this.thumbDOM.style.display = "none"
            }
        }
    }

    _rangeInput() {
        const range = this.rangeDOM
        const count = this.countDOM
        count.textContent = range.value
        if (range && count) {
            range.addEventListener("input", (e) => {
                let value = e.target.value
                if(value <= 4){
                    range.style.accentColor = "rgb(35, 255, 27)"
                } else if(value > 4 && value < 7){
                    range.style.accentColor = "rgb(240, 255, 27)"
                } else if(value >= 7){
                    range.style.accentColor = "rgb(255, 27, 27)"
                }
                count.textContent = value
                this.setting.numberMob = value
            })
        }
    }

    _clickMenu(d) {
        const comm = this.itemMenu.list.find(i => i.name === d).command
        switch (comm) {
            case "start":
                this.countMenu++
                this.itemMenu = this.arrMenu[this.countMenu]
                this._renderMenu()
                break
            case "help":
                this.helpDOM.style.display = "block"
                break
            case "easy":
                this.countMenu++
                this.itemMenu = this.arrMenu[this.countMenu]
                this.setting.speedMob = 0.5
                this.setting.timeRechMob = 3
                this._renderMenu()
                break
            case "norm":
                this.countMenu++
                this.itemMenu = this.arrMenu[this.countMenu]
                this.setting.speedMob = 1
                this.setting.timeRechMob = 2
                this._renderMenu()
                break
            case "hard":
                this.countMenu++
                this.itemMenu = this.arrMenu[this.countMenu]
                this.setting.speedMob = 2
                this.setting.timeRechMob = 1
                this._renderMenu()
                break
            case "super hard":
                this.countMenu++
                this.itemMenu = this.arrMenu[this.countMenu]
                this.setting.speedMob = 2.5
                this.setting.timeRechMob = 0.8
                this._renderMenu()
                break
            default:
                return
        }
    }

    _mouseControl() {
        const elemMenu = this.menuElemDOM
        const runner = this.runnerDOM
        function eventOver(e) {
            if (e.target.tagName === 'LI') {
                let yPosition = e.target.offsetTop
                runner.style.transform = `translateY(${yPosition}px)`
            }
        }
        function eventClick(e) {
            if (e.target.tagName === 'LI') {
                const text = e.target.innerText
                this._clickMenu(text)
            }
            if (e.target.id === "start-button") {
                this._removeMenu()
                this.gameDOM.style.display = "block"
                if(this._funStart){
                    this._funStart(this.setting)
                }
            }
            if (e.target.id === "help") {
                this.helpDOM.style.display = "none"
            }
        }
        if (elemMenu && runner) {
            elemMenu.addEventListener("mouseover", eventOver.bind(this))
            elemMenu.addEventListener("click", eventClick.bind(this))
        }
    }

    _removeMenu() {
        this.menuBlockDOM.remove()
    }

    letsGo(){
        this._renderMenu()
        this._mouseControl()
    }
}

const dom = new StartMenu(menuArr, menu, list, title, runner, range, count, thumb, block, game, start, help)

export default dom




