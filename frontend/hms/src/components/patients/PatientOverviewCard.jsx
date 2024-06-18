import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PatientOverviewCard = () => {
  // Example data (replace with actual data retrieval logic)
  const totalPatients = 250;
  const activePatients = 180;
  const dischargedPatients = 70;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Patient Overview
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Total Patients: {totalPatients}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Active Patients: {activePatients}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Discharged Patients: {dischargedPatients}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PatientOverviewCard;
