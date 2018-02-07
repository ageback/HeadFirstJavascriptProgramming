$(function () {
    createSeaTable();
});

/**
 * 创建格子
 */
function createSeaTable()
{
    for (var i = 0; i < 7; i++) {
        var trHTML = "<tr>";
        for (var j = 0; j < 7; j++) {
            trHTML += "<td id='" + i + j + "' class=''></td>";
        }
        trHTML+="</tr>";
        $("#seaTable").append(trHTML);
    }
}