import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import { Description, PictureAsPdf, InsertChart, AttachFile, Image } from '@mui/icons-material';
import {
  faFilePdf,
  faFileExcel,
  faFileWord,
  faFileImage,
  faFile
} from "@fortawesome/free-solid-svg-icons";
import APIService from './APIService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Stats() {
  const [isLoading, setIsLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    'Total Documents': null,
    'PDF Documents': null,
    'Word Documents': null,
    'Excel Documents': null,
    'Image Documents': null,
    'Handwritten Documents': null,
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
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
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
                {type === 'PDF Documents' && <FontAwesomeIcon icon={faFilePdf} className='dash-icons' />}
                {type === 'Word Documents' && <FontAwesomeIcon icon={faFileWord} className='dash-icons' />}
                {type === 'Excel Documents' && <FontAwesomeIcon icon={faFileExcel} className='dash-icons' />}
                {type === 'Image Documents' && <FontAwesomeIcon icon={faFileImage} className='dash-icons' />}
                {type === 'Handwritten Documents' && <FontAwesomeIcon icon={faFileImage} className='dash-icons' />}
                {type === 'Total Documents' && <FontAwesomeIcon icon={faFile} className='dash-icons' />}
                <Typography variant="h5" color="textSecondary" className='doc-name'>
                  {type}
                </Typography>
              </Box>
              <Typography variant="h4" className='DocName'>{isLoading ? <CircularProgress style={{ color: "#1c2944" }} size={50} thickness={5} /> : count}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    </div>
  )
}

export default Stats
