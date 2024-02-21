import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { Description, PictureAsPdf, InsertChart, AttachFile, Image } from '@mui/icons-material';
import APIService from './APIService';


function Stats() {
  const [statsData, setStatsData] = useState({
    'Total Documents': 0,
    'PDF Documents': 0,
    'Word Documents': 0,
    'Excel Documents': 0,
    'Image Documents': 0,
    'Handwritten Documents': 0,
  });
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await APIService.fetchDashboardStats();
        console.log('Received data:', data);
        setStatsData({
          'Total Documents': data.totalDocuments,
          'PDF Documents': data.pdfDocuments,
          'Word Documents': data.wordDocuments,
          'Excel Documents': data.excelDocuments,
          'Image Documents': data.imageDocuments,
          'Handwritten Documents': data.handwrittenDocuments,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="statsbox">

    
    <Grid container spacing={3}>
      {Object.entries(statsData).map(([type, count]) => (
        <Grid key={type} item xs={12} md={6} lg={4} >
          <Card className='statscard'>
            <CardContent className='statscardin'>
              <Box display="flex" alignItems="center">
                {type === 'PDF Documents' && <PictureAsPdf color="primary" fontSize="large" className='dash-icons' />}
                {type === 'Word Documents' && <InsertChart color="primary" fontSize="large" className='dash-icons' />}
                {type === 'Excel Documents' && <AttachFile color="primary" fontSize="large" className='dash-icons' />}
                {type === 'Image Documents' && <Image color="primary" fontSize="large" className='dash-icons' />}
                {type === 'Handwritten Documents' && <AttachFile color="primary" fontSize="large" className='dash-icons' />}
                {type === 'Total Documents' && <Description color="primary" fontSize="large" className='dash-icons' />}
                <Typography variant="h6" color="textSecondary" >
                  {type}
                </Typography>
              </Box>
              <Typography variant="h4" className='DocName'>{count}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    </div>
  )
}

export default Stats
