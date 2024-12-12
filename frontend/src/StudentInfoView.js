import React from 'react';
import './GlobalTheme.css';
import './StudentInfoView.css';
import thabangImage from './assets/Thabang.JPEG';
import andrewImage from './assets/Andrew.jpg';

const StudentInfoView = () => {
  const courseDetails = {
    name: 'SE/ComS3190 Construction of User Interfaces',
    semester: 'Fall 2024',
    date: new Date().toLocaleDateString()
  };

  const students = [
    {
      fullName: 'Thabang Pila',
      email: 'tpila@iastate.edu',
      image: thabangImage
    },
    {
      fullName: 'Andrew Wilken', 
      email: 'awilken@iastate.edu',
      image: andrewImage
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
    <div className="course-info-container">
      <div className="course-header">
        <h1>Course Information</h1>
        <div className="course-details">
          <h2>{courseDetails.name}</h2>
          <p>Semester: {courseDetails.semester}</p>
          <p>Date: {courseDetails.date}</p>
        </div>
      </div>

      <div className="course-sections">
        <section className="students-section">
          <h3>Students</h3>
          <div className="student-grid">
            {students.map((student, index) => (
              <div key={index} className="student-card">
                <div className="student-image-container">
                  <img 
                    src={student.image} 
                    alt={student.fullName} 
                    className="student-image" 
                  />
                </div>
                <div className="student-info">
                  <h4>{student.fullName}</h4>
                  <p>{student.email}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="instructors-section">
          <h3>Instructors</h3>
          {instructors.map((instructor, index) => (
            <div key={index} className="instructor-card">
              <div className="instructor-info">
                <h4>{instructor.fullName}</h4>
                <p>Email: {instructor.email}</p>
                <p>Title: {instructor.title}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default StudentInfoView; 

