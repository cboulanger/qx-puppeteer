/**
 * A mixin providing object ids and owner ids
 */
qx.Mixin.define("demo.MObjectId",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /** @type {Object} The registry */
    __registry : { __unowned : {} },
  },

 /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {

    /** The ID of the owning object */
    ownerId :
    {
      check : "String",
      init : null,
      nullable : true,
      apply : "_applyOwnerId"
    },


    /** The ID of the object. Must be unique if no owner is specified */
    objectId :
    {
      check : "String",
      nullable : false,
      apply : "_applyObjectId"
    },
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    /**
     * Return a valid object key for owner id even if it is null.
     */
    _getOwnerIdKey : function(ownerId){
      return ownerId || "__unowned";
    },

    /**
     * apply owner id
     */
    _applyOwnerId : function(value, old)
    {
      // todo: check if we have to move to new owner 
      // for example, if objectId has been assigned before ownerId

      // create entry in registry
      var registry = this.self(arguments).__registry;  
      var ownerId = this._getOwnerIdKey(value);
      registry[ownerId]={};

      // apply to DOM node
      if( value ) {
        this.addListener("appear", ()=>{
          this.getContentElement().getDomElement().dataset.ownerId = value;
        });
      }
    },

    /**
     * apply object id
     */
    _applyObjectId : function(value, old)
    {
      // for the moment, do not allow change since that needs to be handled
      if (old ){
        this.error("Changing object ID not allowed");
      }

      var registry = this.self(arguments).__registry;
      var ownerId  = this._getOwnerIdKey(this.getOwnerId());

      if( registry[ownerId][value] !== undefined ){
        this.error(`ID ${value} is already taken.`);
      }

      // register
      registry[ownerId][value] = this;

      // apply to DOM node
      this.addListener("appear", ()=>{
        this.getContentElement().getDomElement().dataset.objectId = value;
      });
    },

    /**
     * Returns an array of objects that are owned by this object, or an
     * empty array if none exists. TODO: we need a top-level method returning
     * the list of unowned objects.
     *
     * @return {Array}
     */    
    getOwnedObjects : function(){
      var objectId = this.getObjectId();
      var registry = this.self(arguments).__registry;
      var objects = [];
      for (var objectId in registry[objectId] ) {
        objects.push(registry[objectId]);
      } 
    }




  }
});
