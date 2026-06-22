import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateMarks.css';

const UpdateMarks = () => {
  const [programs, setPrograms] = useState([]);
  const [selection, setSelection] = useState({
    dept: '',
    sem: '',
    exam: ''
  });

  const [students, setStudents] = useState([]);

  // =========================
  // Fetch Programs
  // =========================
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/programs"
        );

        setPrograms(response.data);

      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  // =========================
  // Load Marks
  // =========================
  const loadMarks = async () => {
    try {

      const token = sessionStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/marks/filter",
        {
          params: {
            programId: selection.dept,
            semester: selection.sem,
            examType: selection.exam,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(response.data.data);
      console.log(response.data.data);

    } catch (error) {

      console.error(error);

      alert("Failed to load marks");
    }
  };

  // =========================
  // Load Data When Filter Changes
  // =========================
  useEffect(() => {

    if (
      !selection.dept ||
      !selection.sem ||
      !selection.exam
    ) {
      return;
    }

    loadMarks();

  }, [
    selection.dept,
    selection.sem,
    selection.exam
  ]);

  // =========================
  // Handle Marks Change
  // =========================
  const handleMarkChange = (
    studentId,
    subjectIndex,
    value
  ) => {

    setStudents((prev) =>
      prev.map((student) => {

        if (student._id !== studentId) {
          return student;
        }

        const updatedSubjects = [
          ...student.subjects
        ];

        updatedSubjects[
          subjectIndex
        ].marksObtained = Number(value);

        const total =
          updatedSubjects.reduce(
            (sum, subject) =>
              sum + Number(subject.marksObtained),
            0
          );

        const percentage =
          (
            total /
            (updatedSubjects.length * 50)
          ) * 100;

        let grade = "F";

        if (percentage >= 90)
          grade = "A+";
        else if (percentage >= 80)
          grade = "A";
        else if (percentage >= 70)
          grade = "B";
        else if (percentage >= 60)
          grade = "C";
        else if (percentage >= 40)
          grade = "D";

        const status =
          percentage >= 40
            ? "Pass"
            : "Fail";

        return {
          ...student,
          subjects: updatedSubjects,
          totalMarks: Number(total),
          percentage: Number(
            percentage.toFixed(2)
          ),
          grade,
          status,
        };

      })
    );

  };

  // =========================
  // Save Marks
  // =========================
  const saveMarks = async (student) => {
    try {

      const token =
        sessionStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/marks/${student._id}`,
        {
          subjects: student.subjects,
          totalMarks: student.totalMarks,
          percentage: student.percentage,
          grade: student.grade,
          status: student.status,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert("Marks Updated Successfully");

    } catch (error) {

      console.error(error);

      alert("Update Failed");
    }
  };

  // =========================
  // Summary Calculations
  // =========================
  const totalStudents = students.length;

  const avgPercentage =
    totalStudents > 0
      ? (
        students.reduce(
          (sum, student) =>
            sum +
            Number(student.percentage),
          0
        ) / totalStudents
      ).toFixed(2)
      : 0;

  const passStudents =
    students.filter(
      student =>
        student.status === "Pass"
    ).length;

  const failStudents =
    students.filter(
      student =>
        student.status === "Fail"
    ).length;

  const passPercentage =
    totalStudents > 0
      ? (
        (passStudents /
          totalStudents) *
        100
      ).toFixed(2)
      : 0;

  const failPercentage =
    totalStudents > 0
      ? (
        (failStudents /
          totalStudents) *
        100
      ).toFixed(2)
      : 0;

  return (
    <div className="update-marks-container">

      <div className="card selection-row">

        <select
          value={selection.dept}
          onChange={(e) =>
            setSelection({
              ...selection,
              dept: e.target.value,
            })
          }
        >
          <option value="">
            Select Program
          </option>

          {programs.map((program) => (
            <option
              key={program._id}
              value={program._id}
            >
              {program.programName}
            </option>
          ))}
        </select>

        <select
          value={selection.sem}
          onChange={(e) =>
            setSelection({
              ...selection,
              sem: e.target.value,
            })
          }
        >
          <option value="">
            Select Sem
          </option>

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
            (s) => (
              <option
                key={s}
                value={s}
              >
                {s}
              </option>
            )
          )}
        </select>

        <select
          value={selection.exam}
          onChange={(e) =>
            setSelection({
              ...selection,
              exam: e.target.value,
            })
          }
        >
          <option value="">
            Select Exam
          </option>

          <option value="Mid Sem">
            Mid Sem
          </option>

          <option value="Final">
            Final
          </option>

          <option value="Unit Test">
            Unit Test
          </option>
        </select>

      </div>

      <div className="card table-card">
        <div className="table-wrapper">

          <table>

            <thead>
              <tr>

                <th>ID</th>
                <th>Name</th>

                {students.length > 0 &&
                  students[0].subjects.map(
                    (subject) => (
                      <th key={subject._id}>
                        {subject.courseName}
                      </th>
                    )
                  )}

                <th>Total</th>
                <th>%</th>
                <th>Grade</th>
                <th>Status</th>
                <th>Action</th>

              </tr>
            </thead>

            <tbody>

              {students.map((student) => (

                <tr key={student._id}>

                  <td>
                    {student.studentId.studentId}
                  </td>

                  <td>
                    {student.studentId.firstName}
                    {" "}
                    {student.studentId.lastName}
                  </td>

                  {student.subjects.map(
                    (subject, index) => (

                      <td key={subject._id}>

                        <input
                          type="number"
                          value={
                            subject.marksObtained
                          }
                          onChange={(e) =>
                            handleMarkChange(
                              student._id,
                              index,
                              e.target.value
                            )
                          }
                        />

                      </td>

                    )
                  )}

                  <td>
                    {
                      student.subjects.reduce(
                        (sum, subject) =>
                          sum + Number(subject.marksObtained),
                        0
                      )
                    }
                  </td>

                  <td>
                    {student.percentage}
                  </td>

                  <td>
                    {student.grade}
                  </td>

                  <td>
                    <span
                      className={`badge ${student.status.toLowerCase()}`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td>

                    <button
                      className="btn-save"
                      onClick={() =>
                        saveMarks(student)
                      }
                    >
                      Save
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

      <div className="summary-grid">

        <div className="summary-card">
          <span>Total Students</span>
          <strong>
            {totalStudents}
          </strong>
        </div>

        <div className="summary-card">
          <span>Avg %</span>
          <strong className="text-blue">
            {avgPercentage}%
          </strong>
        </div>

        <div className="summary-card">
          <span>Pass %</span>
          <strong className="text-green">
            {passPercentage}%
          </strong>
        </div>

        <div className="summary-card">
          <span>Fail %</span>
          <strong className="text-red">
            {failPercentage}%
          </strong>
        </div>

      </div>

    </div>
  );
};

export default UpdateMarks;