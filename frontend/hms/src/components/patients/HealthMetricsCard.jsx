import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const HealthMetricsCard = () => {
  // Example data (replace with actual data retrieval logic)
  const healthMetrics = [
    { id: 1, metricName: 'Blood Pressure', value: '120/80 mmHg' },
    { id: 2, metricName: 'Heart Rate', value: '72 bpm' },
    { id: 3, metricName: 'BMI', value: '25.5' },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Health Metrics
        </Typography>
        {healthMetrics.map(metric => (
          <div key={metric.id}>
            <Typography color="textSecondary" gutterBottom>
              {metric.metricName}: {metric.value}
            </Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default HealthMetricsCard;
