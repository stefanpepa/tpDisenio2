export class User {
    id: number = 0;
    name: string = '';
    lastName: string = '';
    age: number = 0;

    constructor(id?: number, name?: string, lastName?: string, age?: number) {
        this.id = id ?? 0;
        this.name = name ?? '';
        this.lastName = lastName ?? '';
        this.age = age ?? 0;
    }
}
