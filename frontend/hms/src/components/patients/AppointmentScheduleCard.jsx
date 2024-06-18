import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const AppointmentScheduleCard = () => {
  // Example data (replace with actual data retrieval logic)
  const appointments = [
    { id: 1, patientName: 'John Doe', dateTime: '2024-06-25 10:00 AM', reason: 'General checkup' },
    { id: 2, patientName: 'Jane Smith', dateTime: '2024-06-26 02:30 PM', reason: 'Follow-up' },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Appointment Schedule
        </Typography>
        {appointments.map(appointment => (
          <div key={appointment.id}>
            <Typography color="textSecondary" gutterBottom>
              Patient: {appointment.patientName}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Date & Time: {appointment.dateTime}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Reason: {appointment.reason}
            </Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AppointmentScheduleCard;
