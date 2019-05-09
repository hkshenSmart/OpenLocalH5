$(function () {
    $(".back_btn").on("click", function () {
        window.history.back(-1);
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
    var isNodata = false;
    if (isNodata === false) {
        var nodataBoxdiv = $("<div></div>");
        $(nodataBoxdiv).attr("id", "nodataBox_div");
        nodataBoxdiv.css({"background": "#EFF3F4",
            "width": "100%",
            "height": sHeiht,
            "display": "flex",
            "flex-direction": "row",
            "justify-content": "center",
            "align-items": "center"
        });
        $("body").append(nodataBoxdiv);

        var centerbgdiv = $("<div></div>");
        $(nodataBoxdiv).append(centerbgdiv);
        centerbgdiv.addClass("centerbg_div"); // 添加class类属性
        centerbgdiv.css({"width": "250",
            "height": "250",
            "background": "#EFF3F4",
            "display": "flex",
            "flex-direction": "column",
            "justify-content": "center",
            "align-items": "center"
        });

        var nodataImg = $("<img>");
        var nodataStr = $("<p></p>");
        $(centerbgdiv).append(nodataImg);
        $(centerbgdiv).append(nodataStr);
        // nodataImg.src;
        nodataImg.attr('src', "../images/normal/zanwushuju.png");
        nodataStr.text("暂无结果");
        nodataImg.css({"width": 112, "height": 69});
        nodataStr.css({"color": "#CDCDCD", "font-size": 18, "margin-top": 5});
    }
})