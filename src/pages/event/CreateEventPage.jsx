import React from "react";
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import CreateEventForm from "../../components/event/CreateEventForm.jsx";

const CreateEventPage = () => (
  <>
    <ResponsiveAppBar />
    <CreateEventForm />
  </>
);

export default CreateEventPage;