import * as React from 'react';
import { Grid, Card, CardContent } from '@mui/material';
import PieChartComponent from './PieChartComponent';
import LineChartComponent from './LineChartComponent';


const DashboardCharts = () => {
  return (
    <div style={{ padding: 24 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
            <Card>
                <CardContent>
                <PieChartComponent />
                </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
            <Card>
                <CardContent>
                <LineChartComponent />
                </CardContent>
            </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardCharts;
