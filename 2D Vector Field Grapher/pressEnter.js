window.onload = function() {
    document.onkeydown = function(e) {
        e = e || window.event;
        switch (e.which || e.keyCode) {
            case 13 : // Your Code Here (13 is ascii for 'ENTER')
                plotFunction();
                break;
        }
    }
}
