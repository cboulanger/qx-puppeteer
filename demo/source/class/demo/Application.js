/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "demo"
 *
 * @asset(demo/*)
 */
qx.Class.define("demo.Application",
{
  extend : qx.application.Standalone,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Patch qx.core.Object to support ownerId/objectId
      qx.Class.include(qx.core.Object,demo.MObjectId);

      // Create a button
      var button1 = new qx.ui.form.Button("First Button", "demo/test.png");
      button1.set({ownerId:"demo",objectId:"button1"});

      // Document is the application root
      var doc = this.getRoot();

      // Add button to document at fixed coordinates
      doc.add(button1, {left: 100, top: 50});

      // Add an event listener dispatched when button is clicked
      button1.addListener("execute", function(e) {
        let dialog1 = dialog.Dialog.alert("Hello World!");
        // add data element
        dialog1.set({ownerId:"demo",objectId:"dialog1"});
      });
    }
  }
});
