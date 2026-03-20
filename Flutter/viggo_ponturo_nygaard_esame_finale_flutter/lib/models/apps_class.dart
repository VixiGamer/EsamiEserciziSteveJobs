class Appsclass {
  String? target;
  String? name;
  String? image;
  String? description;
  bool starOutline = true;

  //^Costruttore
  Appsclass(
    this.target,
    this.name,
    this.image,
    this.description,
    this.starOutline,
  );

  //^Dato un Json ritorna un Oggetto di tipo Appsclass
  Appsclass.fromJson(dynamic json) {
    target = json["target"];
    name = json["name"];
    image = json["image"];
    description = json["description"];
  }
}
