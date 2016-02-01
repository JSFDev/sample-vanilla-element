// PROTOTIPO DEL WEB COMPONENT <appartment-list>
var appartmentListProto = {
  is: 'appartment-list', // nuevo HTML-element
  properties: {
    // propiedades de la api publica
    name: {
      type: String,
      value: 'atico'
    },
    urlImg: {
      type: String,
      value: 'http://eslint.org/img/logo.svg',
    },
    debug: {
      type: Boolean,
      value: false,
      // refleja la accion sobre las propiedades del DOM como atributo en el <HTML>
      reflectToAttribute: true
    },
    id: {
    	type: String,
    	reflectToAttribute: true,
      // two way data binding, publica los cambios de propiedades hacia arriba
      notify: true
    },
    portal: {
      type: String,
      notify: true
    },
    letraPiso: {
      type: String,
      notify: true
    },
    appartmentStreet: {
      type: String,
      // atributos que al cvambiar lanzan elsetter de la propiedad (valor computado)
      computed: '_computedAppartmentStreet(portal, letraPiso)'
    },
    tenants: Object
  },

  _computedAppartmentStreet: function() {
    return this.portal + ', ' + this.letraPiso;
  },

  getAllInstalaciones: function() {
    return [
      this.name,
      'tiene las siglientes instalaciones',
      this.instalaciones.join(', ')
    ].join(' ');
  },

  // comportamientos transversales del elemento
  behaviors: [
    Polymer.AppartmentliveCycleBehaviors
  ],

  // extender elementos nativos del navegador (solo nativos del navegador)
  // extends: 'input'
};

// registramos elemento como HTMLElement y creamos el prototipo
window.AppartmentList = Polymer(appartmentListProto); // nuevo constructor HTML-element
