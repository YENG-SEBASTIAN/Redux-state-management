// Base class Person
class Person {
    static population = 0; // Class attribute to keep track of the population

    constructor(first_name, last_name, age, gender, email) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
        this.gender = gender;
        this.email = email;
        Person.population++; // Increment population when a new person is created
    }

    // Method to get the full name of the person
    full_name() {
        return `${this.first_name} ${this.last_name}`;
    }

    // Method to increment age and return a birthday message
    birthday() {
        this.age++;
        return `Happy birthday ${this.first_name}! You are now ${this.age} years old.`;
    }

    // Method to update the email address
    update_email(new_email) {
        this.email = new_email;
        return `Email updated to ${this.email}`;
    }

    // Static method to check if a given age is that of an adult
    static is_adult(age) {
        return age >= 18;
    }

    // Static method to get the current population
    static get_population() {
        return `The current population is ${Person.population}.`;
    }

    // String representation of the Person object
    toString() {
        return `Person(${this.full_name()}, ${this.age}, ${this.gender}, ${this.email})`;
    }
}

// Child class Student inheriting from Person (Inheritance)
class Student extends Person {
    constructor(first_name, last_name, age, gender, email, student_id, major) {
        super(first_name, last_name, age, gender, email); // Calling the constructor of the base class
        this.student_id = student_id;
        this.major = major;
    }

    // Overriding the full_name method (Polymorphism)
    full_name() {
        return `${this.first_name} ${this.last_name} (Student ID: ${this.student_id})`;
    }

    // String representation of the Student object
    toString() {
        return `Student(${this.full_name()}, ${this.age}, ${this.gender}, ${this.email}, ${this.major})`;
    }
}

// Example usage
// Creating a Person object
let person1 = new Person("John", "Doe", 30, "Male", "john.doe@example.com");
console.log(person1.toString());
console.log(person1.full_name());
console.log(person1.birthday());
console.log(person1.update_email("new.email@example.com"));
console.log(person1.toString());

// Creating a Student object
let student1 = new Student("Jane", "Doe", 22, "Female", "jane.doe@example.com", "S12345", "Computer Science");
console.log(student1.toString());
console.log(student1.full_name());
console.log(student1.birthday());
console.log(student1.update_email("jane.newemail@example.com"));
console.log(student1.toString());

// Class method call to get the population
console.log(Person.get_population());

// Static method call to check if an age is that of an adult
console.log(Person.is_adult(20));
console.log(Person.is_adult(17));
