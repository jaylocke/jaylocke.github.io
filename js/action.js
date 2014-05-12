(function(){
    function changeText(cont1,cont2,speed){
        var Otimer = null;
        clearInterval(Otimer);
        var Otext=cont1.text();
        var Ocontent=Otext.split("");
        var i=0;
        function show(){
            if(i<Ocontent.length)
            {
                cont2.append(Ocontent[i]);
                i=i+1;
            }else{
                $("#typed-cursor").addClass("typed-cursor-hidden");
            }
        };
        Otimer = setInterval(show,speed);
    };
    function slider(){
        var sWidth = $("#slider_name").width();
        var len = $("#slider_name .silder_panel").length;
        var index = 0;
        var picTimer;

        var btn = "<a class='prev'>Prev</a><a class='next'>Next</a>";
        $("#slider_name").append(btn);

        $("#slider_name .silder_nav li").css({"opacity":"0.6","filter":"alpha(opacity=60)"}).mouseenter(function() {
            index = $("#slider_name .silder_nav li").index(this);
            showPics(index);
        }).eq(0).trigger("mouseenter");

        $("#slider_name .prev,#slider_name .next").css({"opacity":"0.2","filter":"alpha(opacity=20)"}).hover(function(){
            $(this).stop(true,false).animate({"opacity":"0.6","filter":"alpha(opacity=60)"},300);
        },function() {
            $(this).stop(true,false).animate({"opacity":"0.2","filter":"alpha(opacity=20)"},300);
        });


        // Prev
        $("#slider_name .prev").click(function() {
            index -= 1;
            if(index == -1) {index = len - 1;}
            showPics(index);
        });

        // Next
        $("#slider_name .next").click(function() {
            index += 1;
            if(index == len) {index = 0;}
            showPics(index);
        });

        //
        $("#slider_name .silder_con").css("width",sWidth * (len));

        // mouse
        $("#slider_name").hover(function() {
            clearInterval(picTimer);
        },function() {
            picTimer = setInterval(function() {
                showPics(index);
                index++;
                if(index == len) {index = 0;}
            },3000);
        }).trigger("mouseleave");

        // showPics
        function showPics(index) {
            var nowLeft = -index*sWidth;
            $("#slider_name .silder_con").stop(true,false).animate({"left":nowLeft,"opacity":"1"},400);
            $("#slider_name .silder_nav li").removeClass("current").eq(index).addClass("current");
            $("#slider_name .silder_nav li").stop(true,false).animate({"opacity":"0.5"},300).eq(index).stop(true,false).animate({"opacity":"1"},300);
            $("#silder_intro div").css("display","none").eq(index).css("display","block");
        }
    }
    function AppImg(){
        var Img= $("#slide-images");
        var e = Img.children(),
            index = 0,
            R,
            n = e.length;
        function show(index){
                e.removeClass("active");
                e.eq(index).addClass("active");
        }

        Img.bind({
            click:function() {
                event.preventDefault();
                    clearInterval(R);
                    show(index);
                    index++;
                    index >= n && (index = 0);
            },
            mouseover:function(){
                event.preventDefault();
                clearInterval(R);
            },
            mouseout:function(){
                event.preventDefault();
                R =setInterval(timer,1000);
        }
        });
        function timer() {
            show(index);
            index++;
            index >= n && (index = 0);
        }
        R =setInterval(timer,1000);
    }

    function initPopups() {
        $(document).on("click", ".popup-toggle",
            function() {
                $("body").hasClass("no-scroll") && $(".global-popup.visible").find(".close").click();
                var e = $(this).data("popup-id");
                return $("#" + e).toggleClass("visible"),
                    $("body").toggleClass("no-scroll"),
                    $(this).closest(".popup-toggle-status").toggleClass("Current"),
                    !1;
            });
        $(document).on("mouseover", ".global-popup.visible",function(){
            $(this).on("mousewheel",function(e){
                e.stopPropagation();
            });
        });
        $(document).on("click", ".close, .close-link",
            function() {
                var e = $(this).closest(".global-popup").attr("id");

                $("#" + e).toggleClass("visible"),
                    $("body").toggleClass("no-scroll"),
                    $('[data-popup-id="' + e + '"]').closest(".popup-toggle-status").removeClass("Current")
            })

    }
    $(document).ready(function(){
        changeText($("#txt") ,$('#txt-copy') ,100);
        slider();
        AppImg();
        initPopups();
    });
}
)()

