const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const PORT_NO = 5000;
const marks = require('./marks');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mySqlconnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'questionnaire_responses',
});

mySqlconnection.connect((err) => {
  if (!err) {
    console.log('Connection SuccessFully Establised to MYSQL');
  } else {
    console.log('Error Encountere');
    console.log(err);
  }
});

app.get('/check', (req, res) => {
  res.status(200).send({ status: 'Successful' });
});

app.post('/getResponse/isSubmitted', (req, res) => {
  const num = req.body.enrollment_no;
  console.log(num);
  const SQL =
    'SELECT * FROM questions_responses' +
    ' WHERE ' +
    'enrollment_number = ' +
    num;
  mySqlconnection.query(SQL, (err, rows, fields) => {
    if (!err) {
      console.log(rows);
      if (rows.length == 0) {
        res.status(206).send("You Have'nt Submitted It");
      } else {
        res.status(205).send('You Have Already Submitted It');
      }
    } else {
      res.send("Ypu Haven't Submitted");
    }
  });
});

// For Getting All Responses
app.get('/', (req, res) => {
  mySqlconnection.query(
    'SELECT * FROM student_details',
    (err, rows, fields) => {
      if (!err) {
        // console.log(rows[1].enrollment_number);
        // console.log(typeof rows);
        // console.log(rows[0][2]);

        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.get('/getFullResponse/:cat/brch/sem', (req, res) => {
  const category = req.params.cat;
  const semester = req.params.sem;
  const fullBranch = new Map();
  fullBranch.set('computer', 'Computer Engineering');
  fullBranch.set('it', 'Information Technology');
  fullBranch.set('fpt', 'Food Processing');
  fullBranch.set('mechanical', 'Mechanical Engineering');
  fullBranch.set('civil', 'Civil Engineering');
  fullBranch.set('electrical', 'Electrical Engineering');

  const branch = req.params.brch;
  console.log(branch);
  console.log(category);
  const sql = `SELECT student_details.enrollment_number,
  student_details.email_id,
  student_details.branch,
  student_details.semester,
  ${category}.one,
  ${category}.two,
  ${category}.three,
  ${category}.four,
  ${category}.five,
  ${category}.six,
  ${category}.seven,
  ${category}.eight,
  ${category}.nine,
  ${category}.ten
  FROM student_details
  INNER JOIN ${category}
  ON student_details.${category} = ${category}.id
  WHERE branch = "${fullBranch.get(branch)}"
  AND semester = "${semester}"
  `;
  mySqlconnection.query(sql, (err, result) => {
    if (!err) {
      const map = new Map();
      map.set(1, 'one');
      map.set(2, 'two');
      map.set(3, 'three');
      map.set(4, 'four');
      map.set(5, 'five');
      map.set(6, 'six');
      map.set(7, 'seven');
      map.set(8, 'eight');
      map.set(9, 'nine');
      map.set(10, 'ten');
      let finalResult = [];
      for (let ind = 0; ind < result.length; ind++) {
        let obj = {};
        // for (const property in result[ind]) {
        //   obj.property = result[ind].property;
        //   console.log(property);
        // }
        obj.enrollment_number = result[ind].enrollment_number;
        obj.email_id = result[ind].email_id;
        obj.branch = result[ind].branch;
        obj.semester = result[ind].semester;
        let count = 0;
        for (let i = 1; i <= 10; i++) {
          obj[i] =
            marks.extra_curricular[map.get(i)][result[ind][map.get(i)]] /
            marks.extra_curricular[map.get(i)]['weightage'];
          count = count + obj[i];
          // console.log(result[ind][map.get(i)]);
        }
        obj.count = count;
        // obj.one =
        //   marks.extra_curricular.one[optOne] /
        //   marks.extra_curricular.one.weightage;
        finalResult.push(obj);
      }
      // console.log(marks.extra_curricular.one['A']);
      // console.log(
      //   marks.extra_curricular.one.A / marks.extra_curricular.one.weightage
      // );
      console.log(finalResult);
      if (finalResult.length == 0) {
        res.send(
          `No Data Currently Available for ${branch} in ${semester} semester`
        );
      } else {
        res.send(finalResult);
      }
      // console.log(result[0].one);
    } else {
      res.send('Some Error Currently ! Please Try Again After Some Time');
      console.log(err);
    }
  });
});

app.get('/getResponses/:cat/:brch/:sem', (req, res) => {
  const category = req.params.cat;
  const semester = req.params.sem;
  const fullBranch = new Map();
  fullBranch.set('computer', 'Computer Engineering');
  fullBranch.set('it', 'Information Technology');
  fullBranch.set('fpt', 'Food Processing');
  fullBranch.set('mechanical', 'Mechanical Engineering');
  fullBranch.set('civil', 'Civil Engineering');
  fullBranch.set('electrical', 'Electrical Engineering');

  const branch = req.params.brch;
  console.log(branch);
  console.log(category);
  const sql = `SELECT student_details.enrollment_number,
  student_details.email_id,
  student_details.branch,
  student_details.semester,
  ${category}.one,
  ${category}.two,
  ${category}.three,
  ${category}.four,
  ${category}.five,
  ${category}.six,
  ${category}.seven,
  ${category}.eight,
  ${category}.nine,
  ${category}.ten
  FROM student_details
  INNER JOIN ${category}
  ON student_details.${category} = ${category}.id
  WHERE branch = "${fullBranch.get(branch)}"
  AND semester = "${semester}"
  `;
  mySqlconnection.query(sql, (err, result) => {
    if (!err) {
      const map = new Map();
      map.set(1, 'one');
      map.set(2, 'two');
      map.set(3, 'three');
      map.set(4, 'four');
      map.set(5, 'five');
      map.set(6, 'six');
      map.set(7, 'seven');
      map.set(8, 'eight');
      map.set(9, 'nine');
      map.set(10, 'ten');
      let finalResult = [];
      for (let ind = 0; ind < result.length; ind++) {
        let obj = {};
        // for (const property in result[ind]) {
        //   obj.property = result[ind].property;
        //   console.log(property);
        // }
        obj.enrollment_number = result[ind].enrollment_number;
        obj.email_id = result[ind].email_id;
        obj.branch = result[ind].branch;
        obj.semester = result[ind].semester;
        let count = 0;
        for (let i = 1; i <= 10; i++) {
          obj[i] =
            marks.extra_curricular[map.get(i)][result[ind][map.get(i)]] /
            marks.extra_curricular[map.get(i)]['weightage'];
          count = count + obj[i];
          // console.log(result[ind][map.get(i)]);
        }
        obj.count = count;
        // obj.one =
        //   marks.extra_curricular.one[optOne] /
        //   marks.extra_curricular.one.weightage;
        finalResult.push(obj);
      }
      // console.log(marks.extra_curricular.one['A']);
      // console.log(
      //   marks.extra_curricular.one.A / marks.extra_curricular.one.weightage
      // );
      console.log(finalResult);
      if (finalResult.length == 0) {
        res.send(
          `No Data Currently Available for ${branch} in ${semester} semester`
        );
      } else {
        res.send(finalResult);
      }
      // console.log(result[0].one);
    } else {
      res.send('Some Error Currently ! Please Try Again After Some Time');
      console.log(err);
    }
  });
});

app.post('/responses', (req, res) => {
  const enrollment_number = req.body.enrollment_number;
  const emailId = req.body.email_id;
  const branch = req.body.branch;
  const semester = req.body.semester;
  const responses = req.body.responses;

  console.log(
    enrollment_number + ' ' + emailId + ' ' + branch + ' ' + semester
  );
  console.log(responses);

  const insertIntoExtraCurricular = () => {
    return new Promise((resolve, reject) => {
      const idForExtraCurricular = enrollment_number + 'A';
      const sql = `INSERT INTO extra_curricular (id, one, two, three, four, five, six, seven, eight, nine, ten) VALUES ('${idForExtraCurricular}','${responses[0]}','${responses[1]}','${responses[2]}','${responses[3]}','${responses[4]}','${responses[5]}','${responses[6]}','${responses[7]}','${responses[8]}','${responses[9]}');`;
      mySqlconnection.query(sql, (err, result) => {
        if (!err) {
          resolve(idForExtraCurricular);
        } else {
          console.log(err);

          reject('Error');
        }
      });
    });
  };

  const insertIntoResearch = () => {
    return new Promise((resolve, reject) => {
      const idForResearch = enrollment_number + 'B';
      const sql = `INSERT INTO research (id, one, two, three, four, five, six, seven, eight, nine, ten) VALUES ('${idForResearch}','${responses[10]}','${responses[11]}','${responses[12]}','${responses[13]}','${responses[14]}','${responses[15]}','${responses[16]}','${responses[17]}','${responses[18]}','${responses[19]}');`;
      mySqlconnection.query(sql, (err, result) => {
        if (!err) {
          resolve(idForResearch);
        } else {
          console.log(err);

          reject('Error');
        }
      });
    });
  };

  const insertIntoSportsAndCultural = () => {
    return new Promise((resolve, reject) => {
      const idForSportsAndCultural = enrollment_number + 'C';
      const sql = `INSERT INTO sports_and_cultural (id, one, two, three, four, five, six, seven, eight, nine, ten) VALUES ('${idForSportsAndCultural}','${responses[20]}','${responses[21]}','${responses[22]}','${responses[23]}','${responses[24]}','${responses[25]}','${responses[26]}','${responses[27]}','${responses[28]}','${responses[29]}');`;
      mySqlconnection.query(sql, (err, result) => {
        if (!err) {
          resolve(idForSportsAndCultural);
        } else {
          console.log(err);

          reject('Error');
        }
      });
    });
  };

  const insertIntoEntrepreneurialAttitude = () => {
    return new Promise((resolve, reject) => {
      const idForEntrepreneurialAttitude = enrollment_number + 'D';
      const sql = `INSERT INTO entrepreneurial_attitude (id, one, two, three, four, five, six, seven, eight, nine, ten) VALUES ('${idForEntrepreneurialAttitude}','${responses[30]}','${responses[31]}','${responses[32]}','${responses[33]}','${responses[34]}','${responses[35]}','${responses[36]}','${responses[37]}','${responses[38]}','${responses[39]}');`;
      mySqlconnection.query(sql, (err, result) => {
        if (!err) {
          resolve(idForEntrepreneurialAttitude);
        } else {
          console.log(err);

          reject('Error');
        }
      });
    });
  };

  const insertIntoSoftSkills = () => {
    return new Promise((resolve, reject) => {
      const idForSoftSkills = enrollment_number + 'E';
      const sql = `INSERT INTO soft_skills (id, one, two, three, four, five, six, seven, eight, nine, ten) VALUES ('${idForSoftSkills}','${responses[40]}','${responses[41]}','${responses[42]}','${responses[43]}','${responses[44]}','${responses[45]}','${responses[46]}','${responses[47]}','${responses[48]}','${responses[49]}');`;
      mySqlconnection.query(sql, (err, result) => {
        if (!err) {
          resolve(idForSoftSkills);
        } else {
          console.log(err);

          reject('Error');
        }
      });
    });
  };

  const insertIntoDB = (
    idForOne,
    idForTwo,
    idForThree,
    idForFour,
    idForFive
  ) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO student_details (enrollment_number, email_id, branch, semester, extra_curricular, research, sports_and_cultural, entrepreneurial_attitude, soft_skills) VALUES ('${enrollment_number}', '${emailId}', '${branch}','${semester}','${idForOne}', '${idForTwo}', '${idForThree}', '${idForFour}', '${idForFive}');`;
      mySqlconnection.query(sql, (err, result) => {
        if (!err) {
          resolve('Success');
        } else {
          console.log(err);
          reject('Error');
        }
      });
    });
  };

  let idForOne;
  let idForTwo;
  let idForThree;
  let idForFour;
  let idForFive;

  insertIntoExtraCurricular()
    .then((data) => {
      idForOne = data;
      return insertIntoResearch();
    })
    .then((data) => {
      idForTwo = data;
      return insertIntoSportsAndCultural();
    })
    .then((data) => {
      idForThree = data;
      return insertIntoEntrepreneurialAttitude();
    })
    .then((data) => {
      idForFour = data;
      return insertIntoSoftSkills();
    })
    .then((data) => {
      idForFive = data;
      return insertIntoDB(idForOne, idForTwo, idForThree, idForFour, idForFive);
    })
    .then((data) => {
      res.status(200).send({ status: data });
    })
    .catch((err) => {
      res.send({ status: 'Error' });
      console.log(err);
    });
});
app.listen(PORT_NO, () => {
  console.log(`Port Running on PORT ${PORT_NO}`);
});
