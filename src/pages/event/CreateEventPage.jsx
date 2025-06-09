import React from "react";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import CreateEventForm from "../../components/event/CreateEventForm.jsx";
import { useUser } from "../../shared/hooks";

const CreateEventPage = () => {
  const { role } = useUser();

  return (
    <>
      <ResponsiveAppBar role={role} />
      <CreateEventForm />
    </>
  );
};

export default CreateEventPage;