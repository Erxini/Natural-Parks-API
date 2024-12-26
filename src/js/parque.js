export class Parque {
  constructor(id, nombre, descripcion, estado, imagen, latitude, longitude) { // Cambiado a latitude y longitude
    this._id = id;
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._estado = estado;
    this._imagen = imagen;
    this._latitude = latitude; // Cambiado a latitude
    this._longitude = longitude; // Cambiado a longitude
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

  get latitude() { // Cambiado a latitude
    return this._latitude;
  }

  get longitude() { // Cambiado a longitude
    return this._longitude;
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

  set latitude(value) { // Cambiado a latitude
    this._latitude = value;
  }

  set longitude(value) { // Cambiado a longitude
    this._longitude = value;
  }
}
