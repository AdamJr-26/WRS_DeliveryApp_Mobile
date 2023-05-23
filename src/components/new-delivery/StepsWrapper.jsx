import { View, Text } from "react-native";
import React from "react";
import StepVehicle from "./StepVehicle";
import StepSchedules from "./StepSchedules";
import StepFinalizeAndSubmit from "./StepFinalizeAndSubmit";

const StepsWrapper = ({
  step,
  vehiclesData,
  selectedVehicle,
  setSelectedVehicle,
  handleSelectSchedule,
  selectedSchedules,
  form,
  totalLoad,
  exceededLoad,
  handleSubmit,
  isSubmitting,
}) => {
  console.log("object", step, "Schedules");
  if (step.name === "Vehicle") {
    return (
      <StepVehicle
        vehiclesData={vehiclesData}
        selectedVehicle={selectedVehicle}
        setSelectedVehicle={setSelectedVehicle}
      />
    );
  } else if (step.name === "Schedules") {
    return (
      <StepSchedules
        handleSelectSchedule={handleSelectSchedule}
        selectedSchedules={selectedSchedules}
      />
    );
  } else if (step.name === "Finalize & Submit") {
    return (
      <StepFinalizeAndSubmit
        selectedSchedules={selectedSchedules}
        form={form}
        selectedVehicle={selectedVehicle}
        totalLoad={totalLoad}
        exceededLoad={exceededLoad}

      />
    );
  }
};

export default StepsWrapper;
