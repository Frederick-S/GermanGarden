(function ($) {
    // Scroll up plugin
    $.fn.scrollUp = function () {
        return this.each(function () {
            var $this = $(this);

            $(window).scroll(function (e) {
                if ($(document).scrollTop() >= 300) {
                    $this.css("display", "inline");
                } else {
                    $this.css("display", "none");
                }
            });

            $this.click(function () {
                $("html, body").animate({
                    scrollTop: $("body").offset().top + "px"
                }, {
                    duration: 500,
                    easing: "swing"
                });

                return false;
            });
        });
    }
})(jQuery);

(function (window, $) {
    var GM = {};
    
    var config = GM.config = {
        scrollUpId: "scrollUp",
        forvo: {
            searchTextId: "search-content",
            searchButtonId: "search",
            searchWarningId: "warning",
            searchErrorId: "error",
            searchingId: "searching",
            forvoModalDialogId: "forvo-modal-dialog",
            forvoModalLabelId: "forvo-modal-label",
            showForvoModalDialogButtonId: "show-modal-dialog",
            playAudioButtonClassName: "play-audio"
        },
        bootstrap: {
            modalBodyClassName: "modal-body"
        }
    }

    GM.executeWaitingJobs = function (waitingJobsNames) {
        if (!waitingJobsNames) {
            return;
        }

        var length =
            waitingJobsNames.length,
            namespaceLength = 0,
            name = '',
            obj,
            namespaces = [];

        for (var i = 0; i < length; i++) {
            try {
                name = waitingJobsNames[i];
                namespaces = name.split('.');
                namespaceLength = namespaces.length;

                // Reset obj to null;
                obj = null;
                for (var j = 0; j < namespaceLength; j++) {
                    name = namespaces[j];
                    obj = obj ? obj[name] : GM[name];

                    if (j === namespaceLength - 1) {
                        obj();
                    }
                }
            } catch (err) {
                log(err);
            }
        }
    }

    GM.forvo = {
        registerForvoAudioEventHandler: function () {
            $("#" + config.forvo.forvoModalDialogId).delegate("." + config.forvo.playAudioButtonClassName, "click", function () {
                try {
                    var audio = $(this).parent().find("audio").get(0);
                    var source = null;

                    if (audio) {
                        var length = audio.childNodes.length;
                        for (var i = 0; i < length; i++) {
                            source = audio.childNodes[i];
                            if (source.tagName.toLowerCase() === 'source') {
                                source.src = source.getAttribute("data-src");
                            }
                        }

                        audio.load();
                        audio.play();
                    }
                } catch (err) {
                    log(err);
                }
            });
        },
        initSearch: function () {
            $("#" + config.forvo.searchButtonId).click(function () {
                // Get word to search
                var searchContent = $("#" + config.forvo.searchTextId).val();

                var $searchWarning = $("#" + config.forvo.searchWarningId);
                var $searchError = $("#" + config.forvo.searchErrorId);
                var $searching = $("#" + config.forvo.searchingId);

                // Word is empty or only contains spaces
                if (searchContent === '' || searchContent.match(/^\s+$/g)) {
                    $searchWarning.show();
                    $searchError.hide();
                } else {
                    $searchWarning.hide();
                    $searchError.hide();

                    $searching.show();

                    $.ajax({
                        url: "http://apifree.forvo.com/key/f59099477a7fb248dfc9fb53f051b3cb/format/json/callback/pronounce/action/word-pronunciations/word/" + searchContent + "/language/de",
                        jsonpCallback: "pronounce",
                        dataType: "jsonp",
                        type: "jsonp",
                        success: function (json) {
                            var item = null;
                            var items = json.items;
                            var length = items.length;

                            var $forvoModalDialog = $("#" + config.forvo.forvoModalDialogId);

                            var $modalBody = $forvoModalDialog.find("." + config.bootstrap.modalBodyClassName);
                            $modalBody.html("");

                            $forvoModalDialog.find("#" + config.forvo.forvoModalLabelId).text(searchContent + "的所有发音");

                            if (length > 0) {
                                // Create a list to hold all prounications
                                var $pronunicationList = $("<ul class=\"list-style-none\"></ul>");
                                var $li = null;

                                for (var i = 0; i < length; i++) {
                                    item = items[i];
                                    if (item.code === "de") {
                                        // Create li for each forvo pronunciation
                                        $li = $("<li class=\"margin-5\"></li>");

                                        // Append play button
                                        $li.append("<button type=\"button\" class=\"btn btn-default btn-sm play-audio\"><span class=\"glyphicon glyphicon-play\"></span> 播放</button>");

                                        // Append audio info
                                        $li.append("<audio><source data-src=\"" + item.pathogg + "\" type=\"audio/ogg\"><source data-src=\"" + item.pathmp3 + "\" type=\"audio/mpeg\"></audio> By " + item.username + ", " + item.country + " ");

                                        // Append download button
                                        $li.append("<a href=\"" + item.pathmp3 + "\">下载 MP3</a>");

                                        // Append to prounication list
                                        $pronunicationList.append($li);
                                    }
                                }

                                $modalBody.append($pronunicationList);
                            }

                            if (length == 0) {
                                $modalBody.html("<p>没有找到 <strong>" + searchContent + "</strong> 的发音。</p>");
                            }

                            $searching.hide();
                            $("#" + config.forvo.showForvoModalDialogButtonId).click();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            if (jqXHR.statusText !== 'success') {
                                $searching.hide();
                                $searchError.show();
                            }
                        }
                    });
                }
            });
        }
    }

    // Helpers
    function log(err) {
        if (typeof console !== 'undefined') {
            console.log(err);
        }
    }

    window.GM = GM;
})(window, jQuery);