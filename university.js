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


function writeData(data) {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing file:', err);
  }
}


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


function addProf(departmentId, newProfessor) {
  const data = readData();
  if (!data) return;

  // Validate professor data
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

  department.professors.push(newProfessor);
  backupData();
  writeData(data);
  console.log('Professor added successfully!');
}


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

 
  Object.assign(professor, updatedData);
  backupData();
  writeData(data);
  console.log('Professor updated successfully!');
}


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

  department.professors.splice(professorIndex, 1);
  backupData();
  writeData(data);
  console.log('Professor deleted successfully!');
}


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

addDepartment(newDepartment);
