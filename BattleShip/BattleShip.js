$(function () {
    createSeaTable();
    //testFire();
});

function testFire() {
    model.fire("53");
    model.fire("06");
    model.fire("16");
    model.fire("26");
    model.fire("34");
    model.fire("24");
    model.fire("44");
    model.fire("12");
    model.fire("11");
    model.fire("10");
}

function testView() {
    view.displayMiss("00");
    view.displayHit("34");
    view.displayMiss("55");
    view.displayHit("12");
    view.displayMiss("25");
    view.displayHit("26");

    view.displayMessage("Tap tap, is this thing on?");
}

/**
 * 创建格子
 */
function createSeaTable() {
    for (var i = 0; i < 7; i++) {
        var trHTML = "<tr>";
        for (var j = 0; j < 7; j++) {
            trHTML += "<td id='" + i + j + "' class=''></td>";
        }
        trHTML += "</tr>";
        $("#seaTable").append(trHTML);
    }
}

/**
 * model 对象
 */
var model = {
    /**
     * 游戏板网格大小
     */
    boardSize: 7,

    /**
     * 游戏包含的战舰数量
     */
    numShips: 3,

    /**
     * 击沉的战舰数
     */
    shipsSunk: 0,

    /**
     * 每艘战舰占据多少个单元格
     */
    shipLength: 3,

    /**
     * 战舰数组，目前有3个战舰，为了简化测试工作，位置是硬编码的。
     * 以后版本将随机生成战舰位置。
     */
    ships: [{
            locations: ["06", "16", "26"],
            hits: ["", "", ""]
        },
        {
            locations: ["24", "34", "44"],
            hits: ["", "", ""]
        },
        {
            locations: ["10", "11", "12"],
            hits: ["", "", ""]
        }
    ],

    /**
     * guess:  用户输入的坐标值
     */
    fire: function (guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                // 击中战舰，标记hit，并返回true
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false;
    },

    /**
     * 判断战舰是否被击沉
     */
    isSunk: function (ship) {
        for (var i = 0; i < this.shipLength; i++) {
            //只要有任何部位未被击中，战舰就还浮在水面上，因此返回false 。
            if (ship.hits[i] != "hit") {
                return false;
            }
        }
        //否则，战舰已被击沉，因此返回true。
        return true;
    }
}

/**
 * View 对象，负责界面更新
 */
var view = {
    displayMessage: function (msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },

    /**
     * location 是单元格的 id
     */
    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },

    /**
     * location 是单元格的 id
     */
    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
}

/**
 * 控制器对象
 */
var controller = {
    /**
     * 记录猜测次数
     */
    guesses: 0,

    /**
     * 对猜测位置进行处理，再将结果交给模型；检测游戏是否结束。
     */
    processGuess: function (guess) {},

    /**
     * 辅助方法
     */
    parseGuess: function (guess) {
        var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

        if (guess == null || guess.length != 2) {
            alert("Oops, please enter a letter and a number on the board.");
        } else {
            var firstChar = guess.charAt(0);
            var row = alphabet.indexOf(firstChar);
            var column = guess.charAt(1);
            if (isNaN(row) || isNaN(column)) {
                alert("Oops, that isn't on the board.");
            } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
                alert("Oops, that's off the board!");
            } else {
                return row + column;
            }
        }
        return null;
    }
}