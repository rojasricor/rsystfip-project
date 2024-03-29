import { Container } from "@mui/material";
import { Helmet } from "react-helmet";
import { Statistics } from "../components";
import { AppointmentStatus } from "../features/appointments/appointmentsSlice";

function PageStcsDaily(): React.ReactNode {
  return (
    <>
      <Helmet>
        <title>RSystfip | Statistics daily people</title>
      </Helmet>

      <Container component="main" maxWidth="xl">
        <Statistics appointment_status={AppointmentStatus.daily} />
      </Container>
    </>
  );
}

export default PageStcsDaily;
