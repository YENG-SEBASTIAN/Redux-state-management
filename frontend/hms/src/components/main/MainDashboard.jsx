import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import DashboardCharts from '../chart/dashboardChart/DashboardCharts';


const MainDashboard = styled('div')({
  flexGrow: 1,
  padding: 24,
});

const DashboardCard = () => {
  return (
    <MainDashboard>
      {/* Top row of cards */}
      <Grid container spacing={3} mb={3}>
        {/* Hospitals Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" align="center">
                Hospitals
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Doctors Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" align="center">
                Doctors
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Specializations Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" align="center">
                Specializations
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Dates Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" align="center">
                Dates
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bottom row of cards */}
      <Grid container spacing={3}>
        {/* Hospitals Count Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" align="center">
                Hospitals
              </Typography>
              <Typography variant="h6" component="h6" align="center">
                10
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Patients Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" align="center">
                Patients
              </Typography>
              <Typography variant="h6" component="h6" align="center">
                215
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Avg. Length of Stay Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" align="center">
                Avg. Length of Stay
              </Typography>
              <Typography variant="h6" component="h6" align="center">
                15
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Admitted Patients Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" align="center">
                Admitted Patients
              </Typography>
              <Typography variant="h6" component="h6" align="center">
                5
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <DashboardCharts />
    </MainDashboard>
  );
};

export default DashboardCard;
