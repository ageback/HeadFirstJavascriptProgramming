/**
 * 获取 0~4 随机整数
 */
var randomLoc = Math.floor(Math.random() * 5);
/**
 * 用于存储战舰占据的各个单元格。
 */
var location1 = randomLoc;
var location2 = location1 + 1;
var location3 = location2 + 1;

/**
 * 存储用户猜测的变量
 */
var guess;

/**
 * 存储击中次数的变量
 */
var hits = 0;

/**
 * 存储猜测次数的变量
 */
var guesses = 0;

/**
 * 记录战舰是否被击沉的变量
 */
var isSunk = false;


while (!isSunk) {
    guess = prompt("Ready, aim, fire! (enter a number 0-6):");
    if (guess < 0 || guess > 6) {
        alert("Please enter a valid cell number!");
    } else {
        guesses = guesses + 1;

        if (guess == location1 || guess == location2 || guess == location3) {

            alert("HIT!");
            hits += 1;
            if (hits == 3) {
                isSunk = true;
                alert("You sank my battleship!");
            }

        } else {
            alert("MISS");
        }

    }
}

var stats = "You took " + guesses + " guesses to sink the battleship, " + "which means your shooting accuracy was " + (3 / guesses);
alert(stats);