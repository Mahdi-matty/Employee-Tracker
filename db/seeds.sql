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

INSERT INTO employee(first_name, last_name, manager, role_id)
VALUES ('john', 'doe', 'jose', 1),
       ('cristriano', 'ronaldo', 'sir', 1),
       ('waza', 'roney', 'van', 2),
       ('ibrahim', 'zalatan', 'pep', 2);