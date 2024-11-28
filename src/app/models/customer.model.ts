export class Customer {
  id: number;
  companyName: string;
  companySize: number;

  constructor(id: number, companyName: string, companySize: number) {
    this.id = id;
    this.companyName = companyName;
    this.companySize = companySize;
  }
}
