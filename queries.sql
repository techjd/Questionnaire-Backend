CREATE TABLE `questionnaire_responses`.`soft_skills` ( `id` VARCHAR(512) NOT NULL , `one` CHAR(1) NOT NULL , `two` CHAR(1) NOT NULL , `three` CHAR(1) NOT NULL , `four` CHAR(1) NOT NULL , `five` CHAR(1) NOT NULL , `six` CHAR(1) NOT NULL , `seven` CHAR(1) NOT NULL , `eight` CHAR(1) NOT NULL , `nine` CHAR(1) NOT NULL , `ten` CHAR(1) NOT NULL , PRIMARY KEY (`id`(512))) ENGINE = InnoDB;

SELECT student_details.enrollment_number,
student_details.email_id,
student_details.branch,
student_details.semester,
extra_curricular.one,
extra_curricular.two,
extra_curricular.three,
extra_curricular.four,
extra_curricular.five,
extra_curricular.six,
extra_curricular.seven,
extra_curricular.eight,
extra_curricular.nine,
extra_curricular.ten
FROM student_details
INNER JOIN extra_curricular
ON student_details.extra_curricular = extra_curricular.id