class Person {
    // Class attribute to keep track of the population
    static population = 0;

    // Constructor to initialize the person's attributes
    constructor(firstName, lastName, age, gender, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.email = email;
        Person.population += 1; // Increment population when a new person is created
    }

    // Method to get the full name of the person
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    // Method to increment age and return a birthday message
    birthday() {
        this.age += 1;
        return `Happy birthday ${this.firstName}! You are now ${this.age} years old.`;
    }

    // Method to update the email address
    updateEmail(newEmail) {
        this.email = newEmail;
        return `Email updated to ${this.email}`;
    }

    // String representation of the Person object
    toString() {
        return `Person(${this.fullName()}, ${this.age}, ${this.gender}, ${this.email})`;
    }

    // Class method to get the current population
    static getPopulation() {
        return `The current population is ${Person.population}.`;
    }

    // Static method to check if a given age is that of an adult
    static isAdult(age) {
        return age >= 18;
    }
}

// Example usage
const person1 = new Person("John", "Doe", 30, "Male", "john.doe@example.com");
console.log(person1.toString());
console.log(person1.fullName());
console.log(person1.birthday());
console.log(person1.updateEmail("new.email@example.com"));
console.log(person1.toString());

const person2 = new Person("Jane", "Doe", 25, "Female", "jane.doe@example.com");
console.log(person2.toString());
console.log(Person.getPopulation());  // Class method call
console.log(Person.isAdult(20));  // Static method call
console.log(Person.isAdult(17));  // Static method call
