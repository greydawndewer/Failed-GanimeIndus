const Func = function () { console.log("Hello!") };
document.getElementById("clickMe").onclick = Func;
var el = document.getElementById("clickMe");
if (el.addEventListener)
    el.addEventListener("click", Func, false);
else if (el.attachEvent)
    el.attachEvent('onclick', Func);
