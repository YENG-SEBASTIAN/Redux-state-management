# Base class Person
class Person:
    population = 0  # Class attribute to keep track of the population

    def __init__(self, first_name, last_name, age, gender, email):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.gender = gender
        self.email = email
        Person.population += 1  # Increment population when a new person is created

    # Method to get the full name of the person
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    # Method to increment age and return a birthday message
    def birthday(self):
        self.age += 1
        return f"Happy birthday {self.first_name}! You are now {self.age} years old."

    # Method to update the email address
    def update_email(self, new_email):
        self.email = new_email
        return f"Email updated to {self.email}"

    # Class method to get the current population
    @classmethod
    def get_population(cls):
        return f"The current population is {cls.population}."

    # Static method to check if a given age is that of an adult
    @staticmethod
    def is_adult(age):
        return age >= 18

    # String representation of the Person object
    def __str__(self):
        return f"Person({self.full_name()}, {self.age}, {self.gender}, {self.email})"

# Child class Student inheriting from Person (Inheritance)
class Student(Person):
    def __init__(self, first_name, last_name, age, gender, email, student_id, major):
        super().__init__(first_name, last_name, age, gender, email)  # Calling the constructor of the base class
        self.student_id = student_id
        self.major = major

    # Overriding the full_name method (Polymorphism)
    def full_name(self):
        return f"{self.first_name} {self.last_name} (Student ID: {self.student_id})"

    # String representation of the Student object
    def __str__(self):
        return f"Student({self.full_name()}, {self.age}, {self.gender}, {self.email}, {self.major})"

# Example usage
# Creating a Person object
person1 = Person("John", "Doe", 30, "Male", "john.doe@example.com")
print(person1)
print(person1.full_name())
print(person1.birthday())
print(person1.update_email("new.email@example.com"))
print(person1)

# Creating a Student object
student1 = Student("Jane", "Doe", 22, "Female", "jane.doe@example.com", "S12345", "Computer Science")
print(student1)
print(student1.full_name())
print(student1.birthday())
print(student1.update_email("jane.newemail@example.com"))
print(student1)

# Class method call to get the population
print(Person.get_population())

# Static method call to check if an age is that of an adult
print(Person.is_adult(20))
print(Student.is_adult(22))
