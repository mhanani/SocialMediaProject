export class User {
  constructor() {
  }

  public nom: string;
  public prenom: string;
  public age: number;
  public email: string;
  public pseudo: string;
  public password: string;
  public userPhoto: string;
  public NbPublication: string;

  public getNom(): string {
    return this.nom;
  }

  public setNom(nom: string): void {
    this.nom = nom;
  }

  public getPrenom(): string {
    return this.prenom;
  }

  public setPrenom(prenom: string): void {
    this.prenom = prenom;
  }

  public getAge(): number {
    return this.age;
  }

  public setAge(age: number): void {
    this.age = age;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getPseudo(): string {
    return this.pseudo;
  }

  public setPseudo(pseudo: string): void {
    this.pseudo = pseudo;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public getUserPhoto(): string {
    return this.userPhoto;
  }

  public setUserPhoto(userPhoto): void {
    this.userPhoto = userPhoto;
  }

  public getNbPublication(): string {
    return this.NbPublication;
  }

  public setNbPublication(userNbPublication): void {
    this.NbPublication = userNbPublication;
  }

}
