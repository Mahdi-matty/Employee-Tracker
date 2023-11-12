INSERT INTO department(department_name)
VALUES ('marketing'),
       ('finance'),
       ('sale');

INSERT INTO role(title, salary, department_id)
VALUES ('supervisor', 7000, 1),
       ('supervisor', 7500, 2),
       ('supervisor', 6500, 3),
       ('representative', 5000, 3),
       ('acounting', 6500, 2),
       ('agent', 6000, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('john', 'doe', 1, 1),
       ('cristriano', 'ronaldo', 2, 1),
       ('waza', 'roney', 3, 2),
       ('ibrahim', 'zalatan', 4, 2);