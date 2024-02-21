import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { InsertDriveFile, Description, PictureAsPdf, InsertChart, AttachFile } from '@mui/icons-material';
import Stats from '../Components/Stats';
import ProfSection from '../Components/ProfSection';
import Graph from '../Components/Graph';
import DoughnutGraph from '../Components/DoughnutGraph';
import RecentDoc from '../Components/RecentDoc';
import LineGraph from '../Components/LineGraph';

function Dashboard({handleSidebarItemClick}) {



  return (
    <Box className='cont-text'>

      <h2 className='dash-head'>
        Dashboard
      </h2>

      <Stats />

      <div className='secondpart'>
        {/* <div className='flex-1'>
        </div> */}
          <ProfSection handleSidebarItemClick={handleSidebarItemClick} />
          <Graph />
      </div>

      <div className="thirdpart">
        <RecentDoc handleSidebarItemClick={handleSidebarItemClick} />
      </div>

      <div className="fourthpart">
        <DoughnutGraph />
        <LineGraph />
      </div>


    </Box>
  )
}

export default Dashboard
