import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPatient,
  deletePatient,
  fetchPatients,
  updatePatient,
} from "../redux/patientSlice";

import { Form, Table, Button } from "react-bootstrap";

const PatientManagement = () => {
  const dispatch = useDispatch();
  const { patients, status, error } = useSelector((state) => state.patients);

  const [patientForm, setPatientForm] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(
        updatePatient({ id: patientForm.id, updatedPatient: patientForm })
      );
    } else {
      dispatch(addNewPatient(patientForm));
    }
    resetForm();
  };

  const handleEdit = (patient) => {
    setPatientForm(patient);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    dispatch(deletePatient(id));
  };

  const resetForm = () => {
    setPatientForm({
      name: "",
      age: "",
      gender: "",
      address: "",
    });
    setIsEditing(false);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <>
      <h1>Patient Management</h1>

      {/* Search Form */}
      <Form className="mb-4">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchKeyword}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Form>

      {/* Patient Form */}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={patientForm.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="text"
            name="age"
            value={patientForm.age}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            name="gender"
            value={patientForm.gender}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={patientForm.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit">{isEditing ? "Save" : "Add Patient"}</Button>
      </Form>

      {/* Table */}
      {status === "loading" && <p>Loading patients...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.address}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(patient)}>
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(patient.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default PatientManagement;
