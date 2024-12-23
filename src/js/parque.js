export class Parque {
    constructor(id, nombre, descripcion, estado, imagen) {
      this._id = id;
      this._nombre = nombre;
      this._descripcion = descripcion;
      this._estado = estado;
      this._imagen = imagen;
    }
  
    // Getters
    get id() {
      return this._id;
    }
  
    get nombre() {
      return this._nombre;
    }
  
    get descripcion() {
      return this._descripcion;
    }
  
    get estado() {
      return this._estado;
    }
  
    get imagen() {
      return this._imagen;
    }
  
    // Setters
    set id(value) {
      this._id = value;
    }
  
    set nombre(value) {
      this._nombre = value;
    }
  
    set descripcion(value) {
      this._descripcion = value;
    }
  
    set estado(value) {
      this._estado = value;
    }
  
    set imagen(value) {
      this._imagen = value;
    }
  }
  