$(function () {
    createSeaTable();
    testView();

});

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