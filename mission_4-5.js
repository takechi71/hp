function omikuji_show() {
	var omikuji = ["大吉", "吉", "中吉", "小吉", "末吉", "凶", "大凶"];
    
    var number = Math.random();
    number = number * omikuji.length;
    number = Math.floor(number);
    var message = omikuji[number];

    var object = document.getElementById("omikuji");
    object.innerText = message;
}