import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/patients");
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch patients data");
    }
  }
);

export const addNewPatient = createAsyncThunk(
  "patients/addNewPatient",
  async (newPatient) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/patients",
        newPatient
      );
      return response.data;
    } catch (error) {
      throw Error("Failed to add patient");
    }
  }
);

export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async ({ id, updatedPatient }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/patients/${id}`,
        updatedPatient
      );
      return response.data;
    } catch (error) {
      throw Error("Failed to update patient");
    }
  }
);

export const deletePatient = createAsyncThunk(
  "patients/deletePatient",
  async (id) => {
    try {
      await axios.delete(`http://localhost:5000/patients/${id}`);
      return id;
    } catch (error) {
      throw Error("Failed to delete patient");
    }
  }
);

const patientSlice = createSlice({
  name: "patients",
  initialState: { patients: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPatient.fulfilled, (state, action) => {
        state.patients.push(action.payload);
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        const index = state.patients.findIndex(
          (patient) => patient.id === action.payload.id
        );
        if (index !== -1) {
          state.patients[index] = action.payload;
        }
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.patients = state.patients.filter(
          (patient) => patient.id !== action.payload
        );
      });
  },
});

export default patientSlice.reducer;
