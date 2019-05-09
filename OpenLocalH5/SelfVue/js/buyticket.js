$(document).ready(function () {
    // 返回
    $(".back_btn").on("click", function () {
        window.history.back(-1);
    });
    // 日期选择
    $(".showdateBox_div").on("click", function () {
        $(location).attr('href', 'btdate.html');
    });

    // 获取当前手机屏幕宽度
    var sWidth = $(window).width();
    var sHeiht = $(window).height();
    var bodyHeight = $(document.body).height();
    console.log("屏幕的宽度:"+sWidth);
    console.log("特定图片需要的高度:"+sWidth*(171/414.0));
    console.log("文档body的高度:"+bodyHeight);
    console.log("屏幕的高度:"+$(window).height());
    console.log("浏览器当前窗口文档body的总高度:"+$(document.body).outerHeight());
    var isNoTicket = true;
    if (isNoTicket === true) {

        var noTicketBoxdiv = $("<div></div>");
        $(noTicketBoxdiv).attr("id", "noTicketBox_div");
        noTicketBoxdiv.css({"background": "#F6F6F6",
            "width": "100%",
            // "height": sHeiht,
            "display": "flex",
            "flex-direction": "column",
            "justify-content": "center",
            "align-items": "center"
        });
        $("body").append(noTicketBoxdiv);

        // 暂无票
        var topBoxdiv = $("<div></div>");
        $(noTicketBoxdiv).append(topBoxdiv);
        topBoxdiv.addClass("topBox_div"); // 添加class类属性
        topBoxdiv.css({"width": "100%",
            "height": "60",
            "background": "#F6F6F6",
            "display": "flex",
            "flex-direction": "row",
            "justify-content": "center",
            "align-items": "center"
        });
        var nodataImg = $("<img>");
        var nodataStr = $("<p></p>");
        $(topBoxdiv).append(nodataImg);
        $(topBoxdiv).append(nodataStr);
        // nodataImg.src;
        nodataImg.attr('src', "../images/normal/zanwushuju.png");
        nodataStr.text("暂无票");
        nodataImg.css({"width": 48.6, "height": 30});
        nodataStr.css({"color": "#CDCDCD", "font-size": 16, "margin-left": 5});

        // 呼叫车辆
        var callcheBoxdiv = $("<div onclick=\"callche()\"></div>");
        $(noTicketBoxdiv).append(callcheBoxdiv);
        callcheBoxdiv.addClass("callcheBox_div"); // 添加class类属性
        callcheBoxdiv.css({"width": "100%",
            "height": "60",
            "background": "white",
            "display": "flex",
            "flex-direction": "row",
            "justify-content": "flex-start",
            "align-items": "center"
        });
        var callcheImg = $("<img>");
        var callcheStr = $("<p></p>");
        $(callcheBoxdiv).append(callcheImg);
        $(callcheBoxdiv).append(callcheStr);
        // nodataImg.src;
        callcheImg.attr('src', "../images/callche.png");
        callcheStr.text("呼叫车辆");
        callcheImg.css({"width": 23, "height": 23, "margin-left": 20});
        callcheStr.css({"color": "#CDCDCD", "font-size": 16, "margin-left": 5});

        // 发车班次
        var facheBoxdiv = $("<div onclick=\"fache()\"></div>");
        $(noTicketBoxdiv).append(facheBoxdiv);
        facheBoxdiv.addClass("facheBox_div"); // 添加class类属性
        facheBoxdiv.css({"width": "100%",
            "height": "60",
            "background": "white",
            "display": "flex",
            "flex-direction": "row",
            "justify-content": "flex-start",
            "align-items": "center"
        });
        var facheImg = $("<img>");
        var facheStr = $("<p></p>");
        $(facheBoxdiv).append(facheImg);
        $(facheBoxdiv).append(facheStr);
        // nodataImg.src;
        facheImg.attr('src', "../images/fachebc.png");
        facheStr.text("发车班次");
        facheImg.css({"width": 23, "height": 23, "margin-left": 20});
        facheStr.css({"color": "#CDCDCD", "font-size": 16, "margin-left": 5});
    }

    if (localStorage.year.length>0&&localStorage.month.length>0) {
        var weekArray = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var dateString = localStorage.year+"-"+localStorage.month+"-"+localStorage.day;
        console.log("返回的日期:"+dateString);
        var rDate = new Date(Date.parse(dateString.replace(/-/g, "/")));
        $(".week_p").text(localStorage.month+"月"+localStorage.day+"日"+weekArray[rDate.getDay()]+" |");
    }

})

function callche() {
    // 呼叫车辆
    $(location).attr('href', 'callche.html');
}
function fache() {
    // 发车班次
    $(location).attr('href', 'fachebc.html');
}