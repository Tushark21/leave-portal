const LEAVE_REQUEST_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS leaverequests (
        id TEXT PRIMARY KEY,
        employeename TEXT NOT NULL,
        employeeemail TEXT NOT NULL,
        supervisorname TEXT NOT NULL,
        supervisoremail TEXT NOT NULL,
        leavereason TEXT NOT NULL,
        fromdate TEXT NOT NULL,
        todate TEXT NOT NULL,
        applieddate TEXT NOT NULL,
        action TEXT NOT NULL
    )`;

const EMPLOYEES_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS employees (
        id TEXT PRIMARY KEY,
        employeename TEXT NOT NULL,
        employeeemail TEXT NOT NULL,
        supervisorname TEXT NOT NULL,
        supervisoremail TEXT NOT NULL,
        role TEXT NOT NULL
    )`;

const INSERT_QUERY={
    "leaverequests": 'INSERT INTO leaverequests(id, employeename, employeeemail, supervisorname, supervisoremail, leavereason, fromdate, todate, applieddate, action) VALUES(?, ?, ?, ?, ?, ?, ?, ?, datetime(?), ?)',
    "employees": 'INSERT INTO employees(id, employeename, employeeemail, supervisorname, supervisoremail, role) VALUES(?, ?, ?, ?, ?, ?)'
}

const DELETE_QUERY={
    "leaverequests": 'DELETE FROM leaverequests WHERE id = ?',
    "employees": 'DELETE FROM employees WHERE id = ?',
}

const UPDATE_QUERY={
    "leaverequests": 'UPDATE leaverequests SET action = ? WHERE id = ?',
    "employees": 'UPDATE employees SET employeename = ? WHERE id = ?',
}

const ITEMS_PER_PAGE=10;

module.exports={ LEAVE_REQUEST_TABLE_QUERY, EMPLOYEES_TABLE_QUERY, INSERT_QUERY, DELETE_QUERY, UPDATE_QUERY, ITEMS_PER_PAGE }