
function get_text_nodes() {
    
    exclude = 
        'audio, ' +
        'applet, ' +
        'code, ' +
        'code *, ' +
        '.MathJax, ' +
        '.MathJax *, ' +
        'output, ' +
        'output *, ' +
        'pre, ' +
        'pre *, ' +
        'samp, ' +
        'samp *, ' +
        'script, ' +
        'style, ' +
        'textarea, ' +
        'var, ' +
        'var *'; 
    
    retval = $('body')                      // Start in body
        .find('*')                          // get descendants
        .not(exclude)                       // exclude the ones we don't want
        .contents()                         // get their children (incl. text)
        .filter(                                
            function () { 
                return this.nodeType === 3   // Return only text nodes
                && $.trim(this.textContent); // that have non-whitespace contents
            }
        );
    
    return retval;
}    

function do_replace(a) {
    
    a = a.replace(/(^|[-\u2014\s(\["])'/g, "$1\u2018");       // opening singles
    a = a.replace(/'/g, "\u2019");                            // closing singles & apostrophes
    a = a.replace(/(^|[-\u2014/\[(\u2018\s])"/g, "$1\u201c"); // opening doubles
    a = a.replace(/"/g, "\u201d");                            // closing doubles
    a = a.replace(/---/g, "\u2014");                          // em-dashes
    a = a.replace(/--/g, "\u2013");                           // en-dashes
    return a;
    
}

function smartify() {
    
    $text_nodes = get_text_nodes();
    $text_nodes.each(
        function() {
            this.textContent = do_replace(this.textContent);
    }
        );
    
}

