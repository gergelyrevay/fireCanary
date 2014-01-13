/* See license.txt for terms of usage */

define([
    "firebug/lib/trace",
    "firebug/trace/traceModule",
    "firebug/trace/traceListener",
    "firecanary/myPanel",
    "firecanary/myModule",
],
function(FBTrace, TraceModule, TraceListener, MyPanel, MyModule) {

// ********************************************************************************************* //
// Documentation

// Firebug coding style: http://getfirebug.com/wiki/index.php/Coding_Style
// Firebug tracing: http://getfirebug.com/wiki/index.php/FBTrace

// ********************************************************************************************* //
// The application/extension object

var theApp =
{
    initialize: function()
    {
        //if (FBTrace.DBG_FIRECANARY)
            FBTrace.sysout("fireCanary; fireCanary extension initialize");

        // Registration of Firebug panels and modules is made within appropriate files,
        // but it could be also done here.

        // TODO: Extension initialization
    },

    shutdown: function()
    {
        if (FBTrace.DBG_FIRECANARY)
            FBTrace.sysout("fireCanary; fireCanary extension shutdown");

        // Unregister all registered Firebug components
        Firebug.unregisterPanel(Firebug.MyPanel);
        Firebug.unregisterModule(Firebug.MyModule);
        Firebug.unregisterStylesheet("chrome://firecanary/skin/firecanary.css");
        Firebug.unregisterStringBundle("chrome://firecanary/locale/firecanary.properties");

        // TODO: Extension shutdown
    }
}


// ********************************************************************************************* //

return theApp;

// ********************************************************************************************* //
});
