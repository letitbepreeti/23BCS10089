// Base class: Person
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // Method to display basic info
  displayInfo() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

// Subclass: Student extends Person
class Student extends Person {
  constructor(name, age, course) {
    super(name, age); // call parent constructor
    this.course = course;
  }

  // Overriding displayInfo() method
  displayInfo() {
    console.log(
      `Student Name: ${this.name}, Age: ${this.age}, Course: ${this.course}`
    );
  }
}

// Subclass: Teacher extends Person
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age); // call parent constructor
    this.subject = subject;
  }

  // Overriding displayInfo() method
  displayInfo() {
    console.log(
      `Teacher Name: ${this.name}, Age: ${this.age}, Subject: ${this.subject}`
    );
  }
}

// Creating instances and testing
const student1 = new Student("Aarav", 20, "Computer Science");
const teacher1 = new Teacher("Mr. Sharma", 45, "Mathematics");

// Display information in console
student1.displayInfo();
teacher1.displayInfo();
