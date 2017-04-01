$(sep_init);

var s = 1;
var last_s = 0;
var $ul_content = $("<ul>");
var $current_li;

function addToContent($element) {
    if ($element.length != 0) {
        var $ul = $("<ul>");
        $current_li.append($ul);
        s++;
    }
    while ($element.length != 0) {
        $element.prepend($("<div>").addClass("sep_topic_title sep_s"+s).html($element.data("sep-title")));
        var text = $element.data("sep-title");
        var id = $element.attr("id");
        var $a = $("<a>").attr("href", "#" + id).html(text);
        var $li = $("<li>").append($a);
        $ul_content.append($li);
        $ul.append($li);
        $current_li = $li;
        addToContent($element.children("div.sep_topic").first());
        $element = $element.next("div.sep_topic").first();
    }
}

function call(id) {
    if (htmlView = undefined) {
        htmlView.call(id);
    } else {
        window.open("https://self-education-project.ru/educationalResources.php?subj=chemistry&id=" + id.toLowerCase(), "SelfEducationProject");
    }
}

function sep_call(id) {
    if (htmlView = undefined) {
        htmlView.call(id);
    } else {
        window.open("https://self-education-project.ru/educationalResources.php?subj=chemistry&id=" + id.toLowerCase(), "SelfEducationProject");
    }
}

function sep_init() {
    //definition
    $(".sep_definition").wrapInner("<fieldset>");
    $(".sep_definition>fieldset").prepend("<legend>Определение</legend>");

    //content
    
    var $topics = $("body.sep div.sep_topic").first();

    while ($topics.length != 0) {
        $topics.prepend($("<div>").addClass("sep_topic_title").html($topics.data("sep-title")));
        $("div.sep_topic_title",$topics).after("<hr>");
        var text = $topics.data("sep-title");
        var id = $topics.attr("id");
        var $a = $("<a>").attr("href", "#" + id).html(text);
        var $li = $("<li>").append($a);
        $ul_content.append($li);
        $current_li = $li;
        addToContent($topics.children("div.sep_topic").first());
        $topics = $topics.next("div.sep_topic").first();
    }

    var $content = $("<div>").addClass("sep_content").append($ul_content);
    $content.prepend($("<h3>").text("Содержание"));
    if ($ul_content.children().length != 0) {
        $("body.sep, div.sep").prepend($content);
        $ul_content.hide();
        $content
            .mouseenter(function() {
                $ul_content.slideDown();
            })
            .mouseleave(function() {
                $ul_content.slideUp();
            });
    }
    //laws

    $(".sep_law").each(function() {
        $(this).wrapInner("<fieldset>");
        $("fieldset", this).prepend($("<legend>").text($(this).data("name")));
    })

    //images
    $("img.sep").each(function() {
            if ($(this).hasClass("sep_middle")) $(this).wrap($("<div>").attr("align", "center"));
            if ($(this).attr("title") == undefined) return;
            var caption = $("<span>").html($(this).attr("title"));
            $(this).after(caption);
            $(this).after("<br>");
        })
        //a
    $("a.sep").each(function() {
        if ($(this).attr("id") == undefined) {
            return;
        }
        $(this).click(function() {
            sep_call($(this).attr("id"));
        })
    });


    //details
    window.onresize = function() {
        //if (document.documentElement.clientWidth < 500)
        $("details.sep").each(function() {
            if ($(this).attr("open") != undefined) {
                if (document.documentElement.clientWidth < 500)
                    $(this).removeAttr("open");
                else $(this).attr("open", "");
            }
        });
    }
    window.onresize();
}
