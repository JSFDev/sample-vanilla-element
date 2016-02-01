// CICLO DE VIDA
Polymer.AppartmentliveCycleBehaviors = {
  logBehaviour: function(callbackCycle, msg) {
    var hasInitProperties = function() {
      // [created calllback] hasnt initialized its prototype properties
      return callbackCycle.toLowerCase().indexOf('created') === -1 && !!this.debug;
    };

    if ( hasInitProperties.call(this) ) {
      console.info([callbackCycle, this.getIdentifier(), msg].join(' '));
    }
  },

  getIdentifier: function() {
    return this.id || this.is;
  },

  created: function() {
    this.logBehaviour('[created]', 'was created');
  },

  ready: function() {
    this.logBehaviour('[ready]', ' was registred as an DOM element or HTML element');
  },

  // se lanza cuando se instancia el DOM
  // sobreescribir el constructor del elemento
  factoryImpl: function(calle, instalaciones) {
    this.logBehaviour('[factoryImpl]', ' was instanciated');
    this.calle = calle;
    this.instalaciones = instalaciones;
  },

  // se lanza cuando se añade una etiqueta en el HTML
  attached: function() {
    this.logBehaviour('[attached]', 'was added to DOM');
  },

  detached: function() {
    this.logBehaviour('[detached]', 'was remove from DOM');
  },

  attributeChanged: function(name, oldValue, newValue) {
    this.logBehaviour('[attributeChanged]', 'was changed its attrbute ' + 'from ' + oldValue + ' to ' + newValue);
  },

  printBehaviors: function() {
    for (var i in this.behaviors) {
      console.log(this.behaviors[i]);
    }
  }
};
