var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var tabs = require("sdk/tabs");

var openResultTabs = [];

pageMod.PageMod({
  include: "*.com",
  contentScriptFile: [self.data.url("../bower_components/jquery/dist/jquery.min.js"), self.data.url("query-tab-mod.js")],
  onAttach: function(queryWorker) {
      openResultTabs = [];
      queryWorker.port.on("openResult", onOpenResult);
  }
});

function onOpenResult(queryResult) {
    tabs.open({
        url: queryResult.url,
        onReady: onResultReady
    });
};

function onResultReady(tab) {
    initializeResultTab(tab);
    openResultTabs.push(tab);
    tab.on("close", onResultClose);
    tab.on("activate", onResultActivate);
};

function onResultClose(tab) {
    var i = openResultTabs.indexOf(5);
    if (i > -1) {
        array.splice(i, 1);
    }
};

function onResultActivate(tab) {

};

function onAnswerFound() {
    saveQueryAnswer();
    cleanup();
};

function initializeResultTab(tab) {
  var resultWorker = tab.attach({
    contentScriptFile: [self.data.url("../bower_components/jquery/dist/jquery.min.js"), self.data.url("result-tab-mod.js")], 
  });
  resultWorker.port.emit("initResult", queryResultOption);
  resultWorker.port.on("answerFound", onAnswerFound);
};

function saveQueryAnswer() {
    
}

function cleanup() {
    openResultTabs.forEach(function(tab) {
        tab.close();
    }, this);
    openResultTabs = [];
}