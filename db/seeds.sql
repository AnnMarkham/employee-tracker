USE employeetracker_db

 INSERT INTO department (name)
 VALUES 
  ('jetsHome'),
  ('jetSchool'),
  ('skyPadApts');

  
  INSERT INTO roles
  (title, salary, department_id)
  VALUES
  ('computer', 150000, 101),
  ('Dad', 1, 100), 
  ('robot', 999999, 110),
  ('super', 1, 111),
  ('snob', 1, 1);



INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
  ('Ru', 'Di', 101, 2),
  ('George', 'Jetson', 100, 2),
  ('Ro', 'Sie', 110, 2),
  ('Henry', 'Orbit', 111, 3),
  ('Arthur', 'Spacely', 1, 4),
  ('Marcia', 'VanMarsdale', 1, 4);



