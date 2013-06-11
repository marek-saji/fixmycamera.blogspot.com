~function () {

    "use strict";

    // it won't work in non-modern browsers.
    // well.. tough!
    var setLang = function (language) {
        var i,
            section,
            prevMainLangSections = document.querySelectorAll('section.main'),
            mainLangSections     = document.querySelectorAll('section[lang=' + language + ']')
        ;

        for ( i=0, section ; section = prevMainLangSections[i++] ;)
        {
            section.className = section.className.replace(/\bmain\b/, '');
        }
        for ( i=0, section ; section = mainLangSections[i++] ;)
        {
            section.className += " main";
        }
    };

    if ( navigator && navigator.language )
    {
        setLang(navigator.language.match(/^[a-z]*/)[0]);
    }

    var sh = document.createElement('script'),
        s1 = document.getElementsByTagName('script')[0]
    ;
    window.gotHeaders = function (headers) {
        var languages = headers["Accept-Language"].split(','),
            i
        ;
        for (i in languages)
        {
            languages[i] = (languages[i] + ";q=1.0").split(';');
        }
        languages.sort(function (a, b) {
            if (a[1] < b[1]) return -1;
            if (a[1] > b[1]) return  1;
            return 0;
        });
        setLang(languages.shift()[0]);
    };
    sh.src = "http://ajaxhttpheaders2.appspot.com/?callback=gotHeaders";
    s1.parentNode.insertBefore(sh, s1);

}();

