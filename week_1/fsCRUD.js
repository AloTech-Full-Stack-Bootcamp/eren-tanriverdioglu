const fs = require('fs');

const employee = {
  "name": "Employee Name",
  "salary": 2000
};

let directoryName = 'homework';
let fileName = 'employee.json';
let filePath = directoryName + '/' + fileName;
let myName = 'Eren';

// update function that returns promise
const updateDataPromise = (data) => {
  return new Promise((resolve) => {
    data = JSON.parse(data.toString());
    data.name = myName;
    resolve(data);
  })
}

// An async function to use async-await structure
const fsCRUD = async (directoryName, filePath, employee) => {
  try {

    // create directory if it doesn't exist
    await fs.promises.mkdir(directoryName, {
      recursive: true
    });
    console.log(`A new directory named "${directoryName}" was created.`);

    // write initial data to file
    await fs.promises.writeFile(filePath, JSON.stringify(employee));
    console.log(`A file contains employee data was created.`);

    // read the data from the file
    const fileData = await fs.promises.readFile(filePath);
    console.log('Employee: ' + fileData);

    // update the data
    const newData = await updateDataPromise(fileData);
    console.log('Employee data was updated.');

    // write the new data to the file
    await fs.promises.writeFile(filePath, JSON.stringify(newData));
    console.log('The file was updated!');

    // read the new data from the file
    const newFileData = await fs.promises.readFile(filePath);
    console.log('Employee: ' + newFileData);

    // delete the file
    await fs.promises.unlink(filePath);
    console.log('The file was deleted!');

    // delete the folder
    await fs.promises.rmdir(directoryName);
    console.log('The folder was deleted!');

  } catch (err) {
    // logging error message
    console.log(err);
  }
}

// run the function
fsCRUD(directoryName, filePath, employee);
