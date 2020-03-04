// Packages 
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql");

// Classify app
const app = express();

// Const
const questions= [
    {
    type: "input",
    name: "first_name",
    message: "What is your first name?"
  },
  {
     type:"input",
     name: "last_name",
     message: "What is your last name?"
  },
  {
    type: "number",
    name: "roleId",
    message: "Which of the following is the employee role? Input Interger: 1.Sales, 2.Manager, 3.Software Engineer, or 4.Lead Engineer"
  },
  {
      type:"number",
      name:"empManager",
      message: "Who is this employees manager? [Insert Interger] 1. Elisa, 2. Nathan, or 3.Emma",
  }
];


// Classify Port
const PORT = process.env.PORT || 7000;

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "data_db"
});


connection.connect(function (err) {
    if (err) throw err;
    //Make sure we're calling our runSearch function ONLY AFTER our connection to the database was successfully established
    runSearch();

});

function runSearch() {
    //Run an inquirer prompt to ask for the user's desired action
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add Employee",
                "Add roles",
                "Add department",
                "View all employees",
                "View all departments",
                "View all roles",
                "Update employee",
                "Delete"
            ]
        })
        .then(answer => {
            //Based on the selected action, call one of our functions to query the database
            switch (answer.action) {
                case "Add Employee":
                    createEmp();
                    break;
                case "Add roles":
                    createRole();
                    break;
                case "Add department":
                    createDepartment();
                    break;

                case "View all employees":
                    showAllEmp();
                    break;
                case "View all departments":
                    showallDep();
                    break;
                case "View all roles":
                    showallRoles();
                    break;

                case "Update employee roles":
                    updateEmp();
                    break;  
                case "Delete":
                    deleteEmp();
                    break;
            }
        });
        // console.log(answer);
}


function createEmp(){
    inquirer
    .prompt(questions).then(
        response =>{
            console.log(response);
            
            connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)",
            [response.first_name, response.last_name,response.roleId,response.empManager],
            (err,res) =>{
                if(err) throw err;
                console.table(res);
            })
            
        }
    )
    
};

function createRole(){
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter role"
        },
        {
          type: "number",
          name: "salary",
          message: "Enter role salary"
        },
        {
          type: "number",
          name: "departement_id",
          message: "Enter role departement_id"
        }
      ]).then(response =>{
          console.log(response);
          connection.query("INSERT INTO role(title,salary,department_id) VALUES(?,?,?)", [response.title, response.salary, response.departement_id], (err,res)=>{
              if(err) throw err;
              console.table(res);
          })
      })
};

function createDepartment(){
    inquirer
      .prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the departement"
        }
      ]).then(response =>{
        console.log(response);
        connection.query("INSERT INTO department(name_dep) VALUES(?)",[response.name], (err,res) =>{
            if(err) throw err;
            console.table(res);
        })
      })
};

function showAllEmp(){
    connection.query("SELECT * FROM employee", (err, res) =>{
        if(err) throw err;
        console.table(res);
    })
    runSearch();
};

function showallRoles(){
    connection.query("SELECT * FROM role", (err, res) =>{
        if(err) throw err;
        console.table(res);
    })
    runSearch();
};

function showallDep(){
    connection.query("SELECT * FROM department", (err, res) =>{
        if(err) throw err;
        console.table(res);
    })
    runSearch();
};

function updateEmp(){
   conncection.query("UPDATE employee SET first_name =?, last_name = ? role_id =?", [response.first_name,response.last_name, response.role_])
};

function deleteEmp(){
    inquirer
    .prompt(
      {
          type: "input",
          message: "Which employee would you like to remove from staff?",
          name:"delete"
      }
    ).then(response =>{
        console.table(response);
        let q = ""
        connection.query(q,[response.delete], (err,res)=>{

        })
    })
};



app.listen(PORT, () => {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
    });