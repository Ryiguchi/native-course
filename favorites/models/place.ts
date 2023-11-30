export class Place {
  id?: number;
  title: string;
  imageUri: string;
  address: string;
  location: Coords;

  constructor(
    title: string,
    imageUri: string,
    address: string,
    location: Coords,
    id?: number
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
    this.id = id;
  }
}
