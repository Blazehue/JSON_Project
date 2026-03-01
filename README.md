# JSON Project 🐊(fun side project).

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

Creation of a complex JSON structure to depict university system with departments, professors and students.

## 📋 Overview

This project demonstrates the creation of a complex JSON structure that represents a university system with departments, professors, and students. It includes functionality for reading, writing, and manipulating JSON data.

## 🎮 Setup Instructions

1. **Clone this repository**
2. **Install Node.js** from [https://nodejs.org](https://nodejs.org). This also installs npm by default
3. **Create a file** named `JSON_Project.js` if you want to work in VS Code
4. **Ensure a backup file exists** for university backup data
5. **Copy both the JSON and JavaScript files** and execute them in the terminal of your IDE

## 💯 Function Usage

### Core Functions

1. **`readData`**: Reads data from the JSON file using `const fs`
2. **`writeData`**: Writes data into the sample JSON file
3. **`backupData`**: Used for data backup with backup file path, implements backup automatically before modification of data. `console.error` will give an error if any function does not perform as expected or if invalid input is provided (e.g., negative inputs for ID)
4. **`validateProfessor`, `validateDepartment`, `validateStudent`**: Used for validating data input. If any wrong input is provided (e.g., negative integers for ID or a new data type other than integer), errors will be displayed
5. **`addDepartment`, `updateProfessor`**: Allows assigning new professors using `Object.assign`
6. **`deleteProfessors`**: Uses index of professors to delete their data by using the `writeData` function as well
7. **`searchProfbyName`**: Searches professors with lowercase names as well and returns the result stored in `const result`. Usage example given in the code

## 📖 Example Usage

```javascript
const newDepartment = {
  id: 5,
  name: 'Mechanical Engineering',
  professors: []
};
```

## 📄 License

This project is proprietary and all rights are reserved by the author.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Blazehue">Blazehue</a>
</p>