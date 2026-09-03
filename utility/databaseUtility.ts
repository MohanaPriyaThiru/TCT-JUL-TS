import test from "@playwright/test";
import mysql, { Connection } from "mysql2/promise";

test("connext with DB", async () => {
  const Connection = await mysql.createConnection({
    host: "localhost",
    // port:""
    user: "root",
    password: "InaiImai@15",
    database: "august",
  });

  const [row] = await Connection.execute(
    "SELECT  e.emp_name,e.emp_id,e.department,p.project_id ,p.Project_Name FROM employees e  left JOIN employee_projects p ON e.emp_id =p.emp_id",
  );

  console.log(row);
  await Connection.end();
});
