/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/lib/locale",
    "firebug/lib/domplate"
],
function(Obj, FBTrace, Locale, Domplate) {

// ********************************************************************************************* //
// Custom Panel Implementation

var panelName = "Canary";

Firebug.MyPanel = function MyPanel() {};
Firebug.MyPanel.prototype = Obj.extend(Firebug.Panel,
{
    name: panelName,
    title: "Canary",

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Initialization

    initialize: function()
    {
        Firebug.Panel.initialize.apply(this, arguments);

        if (FBTrace.DBG_FIRECANARY)
            FBTrace.sysout("fireCanary; MyPanel.initialize");

        // TODO: Panel initialization (there is one panel instance per browser tab)
        var jsd = Components.classes["@mozilla.org/js/jsd/debugger-service;1"].getService(Components.interfaces.jsdIDebuggerService);

        // jsd.on(); // enables the service till firefox 3.6, for 4.x use asyncOn
        // if (jsd.isOn) alert(42); // disables the service

        this.refresh();

        jsd.scriptHook =
        {
            onScriptCreated: function(script)
                {
                    if (FBTrace.DBG_FIRECANARY)
                        FBTrace.sysout("fireCanary; MyPanel.onScriptCreated", this.panelNode);

                    Firebug.MyPanel.prototype.RowTemplate.log("Script create: " + script, this.panelNode)
                },
            onScriptDestroyed: function(script){Firebug.MyPanel.prototype.RowTemplate.log("Script create: " + script, this.panelNode)}
        };
    },

    destroy: function(state)
    {
        if (FBTrace.DBG_FIRECANARY)
            FBTrace.sysout("fireCanary; MyPanel.destroy");

        Firebug.Panel.destroy.apply(this, arguments);
    },

    show: function(state)
    {
        Firebug.Panel.show.apply(this, arguments);

        if (FBTrace.DBG_FIRECANARY)
            FBTrace.sysout("fireCanary; MyPanel.show");
    },

    refresh: function()
    {
        // Render panel content. The HTML result of the template corresponds to: 
        //this.panelNode.innerHTML = "<span>" + Locale.$STR("hellobootamd.panel.label") + "</span>";
        this.MyTemplate.render(this.panelNode);

        // this.RowTemplate.log("testfunction", this.panelNode)

        // TODO: Render panel content
    }
});

// ********************************************************************************************* //
// Panel UI (Domplate)

// Register locales before the following template definition.
Firebug.registerStringBundle("chrome://firecanary/locale/firecanary.properties");

/**
 * Domplate template used to render panel's content. Note that the template uses
 * localized strings and so, Firebug.registerStringBundle for the appropriate
 * locale file must be already executed at this moment.
 */
with (Domplate) {
Firebug.MyPanel.prototype.MyTemplate = domplate(
{
    tag:
        DIV({onclick: "$onClick"},
        SPAN(
            Locale.$STR("firecanary.panel.label")
        )),

    render: function(parentNode)
    {
        this.tag.replace({}, parentNode);
    },

    onClick: function(event)
    {
        alert(42);
    }
})}

with (Domplate){
    Firebug.MyPanel.prototype.RowTemplate = domplate(
    {
        tag: 
            DIV(
                SPAN("$date"),SPAN(" - "),SPAN("$functionName")
                ),  
    log: function(funcName, parentNode)
    {
        var args = {
            date: (new Date()).toGMTString(),
            functionName: "aaaa"
        };
        this.tag.append(args, parentNode, this);
    }
    })
}
// ********************************************************************************************* //
// Registration

Firebug.registerPanel(Firebug.MyPanel);
Firebug.registerStylesheet("chrome://firecanary/skin/firecanary.css");

if (FBTrace.DBG_FIRECANARY)
    FBTrace.sysout("fireCanary; myPanel.js, stylesheet registered");

return Firebug.MyPanel;

// ********************************************************************************************* //
});
