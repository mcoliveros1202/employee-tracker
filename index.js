const db = require('./db/connection');
const inquirer = require("inquirer");
const { query } = require('./db/connection');

function displayStuff() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "pickOne",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee"
        ],
      },
    ])
    .then((answer) => {
      switch (answer.pickOne) {
        case "View all departments":
          viewDepts();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmpl();
          break;
        case "Add a department":
          addDept();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmploy();
          break;
        case "Update an employee":
          updateEmploy();
          break;
      }
    });
}

function viewDepts() {
  const sql = `SELECT roles.*, departments.department_name
                 AS department_name
                 FROM roles
                 LEFT JOIN departments
                 ON roles.department_id = departments.id`;
  db.query(sql, (err, data) => {
    if (err) {
      return (err);
    }
    console.log('=======================');
    console.table(data);
    console.log('=======================\n');
    displayStuff();
  });
};

function viewRoles() {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, data) => {
    if (err) {
      return (err);
    }
    console.log('=======================');
    console.table(data);
    console.log('=======================\n');
    displayStuff();
  });
};

function viewEmpl() {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, data) => {
    if (err) {
      return (err);
    }
    console.log('=======================')
    console.table(data)
    console.log('=======================\n')
    displayStuff();
  });
};

// add a department-- user input
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "Please provide a department name",
      },
    ])
    // add input to table
    .then(answers => {
      insertDept(answers);
    });
}
// create new row for dept
function insertDept(answers) {
  const sql = `INSERT INTO departments (department_name)
        VALUES (?)`;
  const params = [answers.deptName];

  db.query(sql, params, (err, data) => {
    if (err) {
      console.log('Error!');
      return (err);
    }
    console.log('=======================');
    console.table(data);
    console.log('=======================');
    displayStuff();
  });
};

// role questions
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Please provide the title of this role.",
      },
      {
        type: "name",
        name: "salary",
        message: "Please provide the salary amount.",
      },
      {
        type: "input",
        name: "deptName",
        message: "Please assign this role to a department.",
      },
    ])
    .then(answers => {
      insertRole(answers);
    });
}

function insertRole(answers) {
  const sql = `INSERT INTO roles (role_title, role_salary, department_id)
  VALUES (?, ?, ?)`;
  const params = [answers.roleTitle, answers.salary, answers.deptName];

  db.query(sql, params, (err, data) => {
    if (err) {
      console.log(err);
      return (err);
    }
    console.log('=======================');
    console.table(data);
    console.log('=======================');
    displayStuff();
  });
};

// employee questions
function addEmploy() {
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Please provide employee's first name.",
    },
    {
      type: "",
      name: "lastName",
      message: "Please provide employee's last name.",
    },
    {
      type: "",
      name: "roleTitle",
      message: "Please provide employee's role.",
    },
    {
      type: "",
      name: "managerName",
      message: "Please provide the manager's id number.",
    }
  ])
    // add input to table
    .then(answers => {
      insertEmploy(answers);
    });
}

// create a new row for employee
function insertEmploy(answers) {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`;
  const params = [answers.firstName,
  answers.lastName, answers.roleTitle, answers.managerName];

  db.query(sql, params, (err, data) => {
    if (err) {
      console.log(err);
      return (err);
    }
    console.log('=======================');
    console.table(data);
    console.log('=======================');
    displayStuff();
  });
}

// update employee role
function updateEmploy() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Please provide the id number for the employee whose role is being updated.'
    },
    {
      type: "input",
      name: 'newRole',
      message: 'Please provide the new role.'
    }
  ])
    .then(answers => {
      insertUpdate(answers);
    });
}

function insertUpdate(answers) {
  const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
  const params = [answers.employeeId, answers.newRole];

  db.query(sql, params, (err, data) => {
    if (err) {
      console.log(err);
      return (err);
    }
    console.log('=======================');
    console.table(data);
    console.log('=======================');
    displayStuff();
  })
}

// update employee manager
function updateManager() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Please provide the id number for the employee whose manager is being updated.'
    },
    {
      type: "input",
      name: 'newManager',
      message: 'Please provide the new manager.'
    }
  ])
    .then(answers => {
      insertManager(answers);
    });
}

function insertManager(answers) {
  const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;
  const params = [answers.employeeId, answers.newManager];

  db.query(sql, params, (err, data) => {
    if (err) {
      console.log(err);
      return (err);
    }
    console.log('=======================');
    console.table(data);
    console.log('=======================');
    displayStuff();
  });
};

displayStuff();
