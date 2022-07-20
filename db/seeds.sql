INSERT INTO departments (department_name)
VALUES 
('Marketing'),
('Human Resources'),
('Finance'),
('Operations Management'),
('IT');

INSERT INTO roles (role_title, role_salary, department_id)
VALUES
('Director', '200000', 1),
('Managers', '100000', 1),
('Assistant', '50000', 1),
('Intern', '25000', 1),
('Director', '200000', 2),
('Managers', '100000', 2),
('Assistant', '50000', 2),
('Intern', '25000', 2),
('Director', '200000', 3),
('Managers', '100000', 3),
('Assistant', '50000', 3),
('Intern', '25000', 3),
('Director', '200000', 4),
('Managers', '100000', 4),
('Assistant', '50000', 4),
('Intern', '25000', 4),
('Director', '200000', 5),
('Managers', '100000', 5),
('Assistant', '50000', 5),
('Intern', '25000', 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Paul', 'Walker', 1, NULL),
('Justin', 'Moore', 2, 1),
('Anthony', 'Ward', 3, 2),
('Donna', 'Edwards', 4, 2),
('Ryan', 'Evans', 5, NULL),
('Julia', 'Collins', 6, 5),
('Charles', 'Jackson', 7, 6),
('Irene', 'Turner', 8, 6),
('Stephanie', 'Allen', 9, NULL),
('Robert', 'Ramirez', 10, 9),
('Evelyn', 'Gray', 11, 10),
('Deborah', 'Young', 12, 10),
('Peter', 'Henderson', 13, NULL),
('Louise', 'Simmons', 14, 13),
('Wanda', 'Long', 15, 14),
('Jeremy', 'Morgan', 16, 14),
('Willie', 'James', 17, NULL),
('Karen', 'Stewart', 18, 17),
('Jane', 'Brown', 19, 18),
('Carl', 'Garcia', 20, 18);