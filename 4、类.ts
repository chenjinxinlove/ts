class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return 'hello. ' + this.greeting;
    }
}

let greeter = new Greeter('world');

class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

class Animal {
    name: string;
    constructor(theName: string) {
        this.name = theName;
    }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name);
    }
    move(dispatchInMeters = 5) {
        super.move(dispatchInMeters)
    }
}