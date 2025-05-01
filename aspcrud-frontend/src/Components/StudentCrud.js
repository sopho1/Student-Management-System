import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StudentCrud() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [courses, setCourses] = useState([]); // Updated to handle an array
  const [courseInput, setCourseInput] = useState(""); // For adding courses dynamically
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isGraduated, setIsGraduated] = useState(false);
  const [students, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("https://localhost:44368/api/Students/");
    setUsers(result.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:44368/api/Students/", {
        name: name,
        courses: courses, // Pass the courses array
        age: parseInt(age),
        gender: gender,
        isGraduated: isGraduated,
      });
      toast.success("Student Registered successfully!", {
        autoClose: 4000,  
      });
      resetForm();
      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editStudent(student) {
    setId(student.id);
    setName(student.name);
    setCourses(student.courses || []); // Set courses array
    setAge(student.age);
    setGender(student.gender);
    setIsGraduated(student.isGraduated);
  }

  async function DeleteStudent(id) {
    await axios.delete("https://localhost:44368/api/Students/" + id);
    toast.success("Student Deleted Succesfully!", {
      autoClose: 4000,
    });
    resetForm();
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put(
        "https://localhost:44368/api/Students/" +
          (students.find((u) => u.id === id).id || id),
        {
          id: id,
          name: name,
          courses: courses, // Pass the courses array
          age: parseInt(age),
          gender: gender,
          isGraduated: isGraduated,
        }
      );
      toast.success("Student Registration Updated successfully!", {
        autoClose: 4000,
      });
      resetForm();
      Load();
    } catch (err) {
      alert(err);
    }
  }

  function resetForm() {
    setId("");
    setName("");
    setCourses([]);
    setCourseInput("");
    setAge("");
    setGender("");
    setIsGraduated(false);
  }

  function addCourse() {
    if (courseInput.trim() !== "") {
      setCourses([...courses, courseInput.trim()]);
      setCourseInput("");
    }
  }

  function removeCourse(index) {
    setCourses(courses.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h1>Student Details</h1>
      <ToastContainer />
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => setId(event.target.value)}
            />

            <label>Student Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Courses</label>
            <div>
              <input
                type="text"
                className="form-control"
                id="courseInput"
                value={courseInput}
                onChange={(event) => setCourseInput(event.target.value)}
              />
              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={addCourse}
              >
                Add Course
              </button>
            </div>
            <ul>
              {courses.map((course, index) => (
                <li key={index}>
                  {course}{" "}
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeCourse(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              className="form-control"
              id="age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              className="form-control"
              id="gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Graduated</label>
            <input
              type="checkbox"
              id="isGraduated"
              checked={isGraduated}
              onChange={(event) => setIsGraduated(event.target.checked)}
            />
          </div>
          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br />

      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Student Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">Courses</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
            <th scope="col">Graduated</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {students.map(function fn(student) {
          return (
            <tbody>
              <tr>
                <th scope="row">{student.id}</th>
                <td>{student.name}</td>
                <td>{(student.courses || []).join(", ")}</td> {/* Safely display courses */}
                <td>{student.age}</td>
                <td>{student.gender}</td>
                <td>{student.isGraduated ? "Yes" : "No"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => DeleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default StudentCrud;
