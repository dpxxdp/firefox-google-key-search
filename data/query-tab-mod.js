// $("body").html("<h1>Page matches ruleset</h1>");

// //'document.body.innerHTML = ' + ' "<h1>Page matches ruleset</h1>";'

$(document).ready(function() {
    
    var pointer = -1;
    var results = [];
    
    function initialize() {
        var query = $(document).find("title").text().split('-')[0].trim();
        $('.r > a').each(function(i, obj) {
            results.push({
                id: i,
                query: query,
                url: $(obj).attr('href'),
                opened: false
            });
            $(obj).before("<div class='circle' id='result" + i + "'></div>");
            console.log(results[i]);
        });
    };
    
    $(document).keydown(function(e) {
        if (e.altKey && (e.which === 37)) {
            returnToSearchBar();
            console.log( "You pressed ALT + Left" );
        } else if (e.altKey && (e.which === 38)) {
            previousResult();
            console.log( "You pressed ALT + Up" );
        } else if (e.altKey && (e.which === 39)) {
            openResult(pointer);
            console.log( "You pressed ALT + Right" );
        } else if (e.altKey && (e.which === 40)) {
            nextResult();
            console.log( "You pressed ALT + Down" );
        }
        console.log(pointer);
    });

    function previousResult() {
        $("lst-ib").blur();
        if(pointer > 0) {
            pointer--;
        } else if(pointer === 0)  {
            returnToSearchBar();
        } else {
            pointer = results.length - 1;
        }
        updateUi();
    }

    function nextResult() {
        $("lst-ib").blur();
        if(pointer < results.length - 1) {
            pointer++;
        } else {
            returnToSearchBar();
        }
        updateUi();
    }
    
    function returnToSearchBar() {
        pointer = -1;
        $("lst-ib").focus();
        updateUi();
    }
    
    function openResult(i) {
        self.port.emit("openResult", results[i]);
        if(results[i]) {
            results[i].opened = true;
        }
        updateUi();
    }
    
    function updateUI() {
        var resultId = "result" + pointer;
        for(i in results.range) {
            var id = "result" + i;
            $(id).hide();
            if(results[i] && results[i].opened) {
                $(id).addClass("opened");
                $(id).show();
            }
        }
        $(resultId).addClass("pointer");
        $(resultId).removeClass("opened");
        $(resultId).removeClass("closed");
        $(resultId).show();
    }
    
    initialize();
});