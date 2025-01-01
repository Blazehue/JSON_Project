const fs = require('fs');
const path = './university.json';

//reading data from function
function readData() {
  try {
    if (!fs.existsSync(path)) {
      console.error('File not found!');
      return null;
    }
    const rawData = fs.readFileSync(path);
    return JSON.parse(rawData);
  } catch (err) {
    console.error('Error reading file:', err);
    return null;
  }
}

//writes the data to the file path
function writeData(data) {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

//backup data function before modification
function backupData() {
  try {
    const rawData = fs.readFileSync(path);
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const backupPath = `./backups/university_backup_${timestamp}.json`;
    fs.writeFileSync(backupPath, rawData);
    console.log(`Backup created at ${backupPath}`);
  } catch (err) {
    console.error('Error creating backup:', err);
  }
}
//function for validating a department using its name attribute or string attribute
function validateDepartment(department) {
  if (typeof department.name !== 'string' || department.name.trim() === '') {
    throw new Error('Department name must be a non-empty string.');
  }
  if (typeof department.id !== 'number' || department.id <= 0) {
    throw new Error('Department ID must be a positive number.');
  }
}


function validateProfessor(professor) {
  if (typeof professor.name !== 'string' || professor.name.trim() === '') {
    throw new Error('Professor name must be a non-empty string.');
  }
  if (typeof professor.id !== 'number' || professor.id <= 0) {
    throw new Error('Professor ID must be a positive number.');
  }
}


function validateStudent(student) {
  if (typeof student.name !== 'string' || student.name.trim() === '') {
    throw new Error('Student name must be a non-empty string.');
  }
  if (typeof student.id !== 'number' || student.id <= 0) {
    throw new Error('Student ID must be a positive number.');
  }
  if (typeof student.age !== 'number' || student.age <= 0) {
    throw new Error('Student age must be a positive number.');
  }
  if (!['A', 'B', 'C', 'D', 'F'].includes(student.grade)) {
    throw new Error('Student grade must be one of: A, B, C, D, F.');
  }
}

//primary function for adding a new department
function addDepartment(newDept) {
  const data = readData();
  if (!data) return;

  validateDepartment(newDept);

  if (data.university.departments.find(dept => dept.id === newDept.id)) {
    console.log('Department ID already exists.');
    return;
  }

  data.university.departments.push(newDept);
  backupData();
  writeData(data);
  console.log('Department added successfully!');
}

//function for adding a professor using its department id with its name attribute for the json file also includes validation of data added and modification of the data
function addProf(departmentId, newProfessor) {
  const data = readData();
  if (!data) return;

  // validate professor data
  validateProfessor(newProfessor);

  const department = data.university.departments.find(dept => dept.id === departmentId);
  if (!department) {
    console.log('Department not found.');
    return;
  }

  if (department.professors.find(prof => prof.id === newProfessor.id)) {
    console.log('Professor ID already exists.');
    return;
  }
//pushes the new professor's data and backup is done for the same and writing it
  department.professors.push(newProfessor);
  backupData();
  writeData(data);
  console.log('Professor added successfully!');
}

//defines addition of a student using department Id, professor Id and the name of the student using newStudent
function addStudent(departmentId, professorId, newStudent) {
  const data = readData();
  if (!data) return;

  validateStudent(newStudent);

  const department = data.university.departments.find(dept => dept.id === departmentId);
  if (!department) {
    console.log('Department not found.');
    return;
  }

  const professor = department.professors.find(prof => prof.id === professorId);
  if (!professor) {
    console.log('Professor not found.');
    return;
  }

  if (professor.students.find(student => student.id === newStudent.id)) {
    console.log('Student ID already exists.');
    return;
  }

  professor.students.push(newStudent);
  backupData();
  writeData(data);
  console.log('Student added successfully!');
}
//updates professor for the student data provided
function updateProfessor(departmentId, professorId, updatedData) {
  const data = readData();
  if (!data) return;

  const department = data.university.departments.find(dept => dept.id === departmentId);
  if (!department) {
    console.log('Department not found.');
    return;
  }

  const professor = department.professors.find(prof => prof.id === professorId);
  if (!professor) {
    console.log('Professor not found.');
    return;
  }

 //assigns the updated data and logs the message of updation
  Object.assign(professor, updatedData);
  backupData();
  writeData(data);
  console.log('Professor updated successfully!');
}

//deletion of professors using their departmentId and professorId
function deleteProfessors(departmentId, professorId) {
  const data = readData();
  if (!data) return;

  const department = data.university.departments.find(dept => dept.id === departmentId);
  if (!department) {
    console.log('Department not found.');
    return;
  }

  const professorIndex = department.professors.findIndex(prof => prof.id === professorId);
  if (professorIndex === -1) {
    console.log('Professor not found.');
    return;
  }
//using splice removing array elements allows to remove the professor data using the id attribute for the particular professor
  department.professors.splice(professorIndex, 1);
  backupData();
  writeData(data);
  console.log('Professor deleted successfully!');
}

//function searchProfByName(name) searches names of the professor in a nested way and flatmap used to flatlist each and every professor which maps particular department attribute to the professor's id, and filter converts it to the lowercase name structure
function searchProfByName(name) {
  const data = readData();
  if (!data) return [];

  const result = data.university.departments.flatMap(dept => dept.professors)
    .filter(prof => prof.name.toLowerCase().includes(name.toLowerCase()));
  return result;
}

// Example usage
const newDepartment = {
  id: 5,
  name: 'Mechanical Engineering',
  professors: []
};
//function call
addDepartment(newDepartment);
