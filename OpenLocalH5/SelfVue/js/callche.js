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
    var isNodata = true;
    if (isNodata === false) {
        $(".listBox_div").css({"display": "none"});
        $(".notialldriver").css({"display": "none"});

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

    if (isNodata === true) {
        for (var i = 0; i < 12; i++) {
            $(".listBox_div ul").append(function () {
                return "<li>\n" +
                    "            <div class=\"liContain_div\">\n" +
                    "                <div class=\"top_div\">\n" +
                    "                    <img src=\"../images/xiaoqiche.png\" alt=\"\">\n" +
                    "                    <p class=\"catNum_p\">贵A4276</p>\n" +
                    "                </div>\n" +
                    "                <div class=\"middle_div\">\n" +
                    "                    <img src=\"../images/linepoint.png\" alt=\"\">\n" +
                    "                    <div class=\"qizhong_div\">\n" +
                    "                        <p class=\"qi_p\">贵阳</p>\n" +
                    "                        <p class=\"zhong_p\">猫场</p>\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "                <div class=\"bottom_div\">\n" +
                    "                    <div class=\"contactdriver_div\" onclick=\"doContactdriver("+i+")\">\n" +
                    "                        <img src=\"../images/tel.png\" alt=\"\">\n" +
                    "                        <p class=\"contactdriver_p\">联系司机</p>\n" +
                    "                    </div>\n" +
                    "                    <div class=\"notidriver_div\" onclick=\"doNotidriver("+i+")\">\n" +
                    "                        <img src=\"../images/tongzhi.png\" alt=\"\">\n" +
                    "                        <p class=\"contactdriver_p\">通知司机</p>\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "        </li>"
            });
        }
    }

    $(".notialldriver").on("click", function () {
        // 弹出底部框
        $("#half").popup();
    });

    // 物品类型重量减
    $(".jianjian_btn").on("click", function () {
        var zlInput = $(".num_input");
        var num = parseFloat(zlInput.text());
        if (num <= 1) {
            return;
        }
        else {
            zlInput.text(num-1);
        }
    });
    // 物品类型重量加
    $(".jiajia_btn").on("click", function () {
        var zlInput = $(".num_input");
        var num = parseFloat(zlInput.text());
        zlInput.text(num+1);
    });

})

function doNotidriver(i) {
    // 通知司机
    console.log("i:"+i);
    // 弹出底部框
    $("#half").popup();
}
function doContactdriver(i) {
    // 拨打司机电话
    window.location.href = "tel:10086";
}