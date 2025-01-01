🐊# JSON_Project
Creation of a complex JSON structure to depict university system with departments, professors and students.

🎮**SETUP INSTRUCTIONS**:-
1.) Clone this repository.
2.) Install node.js from https://nodejs.org. This also installs node package manager by default.
3.) Since, javascript is a client side based language it doesn't need to be installed, just create a file named bny "JSON_Project.js" if you want to in vscode.
4.) Ensure a backup file exists for university backup data.
5.) Also can copy both the json and the javascript file and execute it in the terminal of ur IDE//similar to cloning of repo.


💯**FUNCTION USAGE**:-

**function readData**: Reads data from the json file from const fs
**function writeData**: writing data into the sample json file
**function backupData**: used for data backup with backup file path, implements backup automatically before modification of data
{console.error will give error if any function does not perform as per its expectation or any invalid input such as negative inputs for id)
**function validateProfessor, validateDepartment, validateStudent** used for validating data input and if any wrong input provided (ex: negative integers for id or a new data type other than integer), errors will be given out
**function addDepartment, data updation using updateProfessor** allows to assign new professor using Object.assign 
**function deleteProfessors** uses index of professors to delete their data by using writedata function aswell
**function searchProfbyName** searches professors with lowercase names aswell and returns the result stored in const result, usage example given in the code aswell as follows:-

// Example usage
const newDepartment = {
  id: 5,
  name: 'Mechanical Engineering',
  professors: []
};
