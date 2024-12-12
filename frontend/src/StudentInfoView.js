import React from 'react';

const StudentInfoView = () => {
  const courseDetails = {
    name: 'SE/ComS3190 Construction of User Interfaces',
    semester: 'Fall 2024',
    date: new Date().toLocaleDateString()
  };

  const students = [
    {
      fullName: 'Thabang Pila',
      email: 'tpila@iastate.edu'
    },
    {
      fullName: 'Andrew Wilken', 
      email: 'awilken@iastate.edu'
    }
  ];

  const instructors = [
    {
      fullName: 'Dr. Abraham N. Aldaco Gastelum',
      email: 'aldaco@iastate.edu',
      title: 'Course Instructor'
    }
  ];

  return (
    <div className="student-info-view">
      <h1>Course Information</h1>
      
      <section className="course-details">
        <h2>Course Details</h2>
        <p>Course: {courseDetails.name}</p>
        <p>Semester: {courseDetails.semester}</p>
        <p>Date: {courseDetails.date}</p>
      </section>

      <section className="students">
        <h2>Students</h2>
        {students.map((student, index) => (
          <div key={index} className="student-info">
            <p>Name: {student.fullName}</p>
            <p>Email: {student.email}</p>
          </div>
        ))}
      </section>

      <section className="instructors">
        <h2>Instructors</h2>
        {instructors.map((instructor, index) => (
          <div key={index} className="instructor-info">
            <p>Name: {instructor.fullName}</p>
            <p>Email: {instructor.email}</p>
            <p>Title: {instructor.title}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default StudentInfoView; 

