import React, { useEffect, useState } from 'react';
import { styled, Typography, Box, Button } from '@mui/material';
import { Person, Email, Phone, LocationOn, Edit, AccountCircle } from '@mui/icons-material';
import APIService from './APIService';

const ProfileSection = styled('div')({
    width: '35%',
    padding: '30px',
    backgroundColor: '#1c2944',
    borderRadius: '10px',
    boxShadow: '0 0 10px 0 #040b1c'
});

const ProfileInfo = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    width: '100%',
    justifyContent: 'flex-start',
    padding: '20px 0',
    borderBottom: '1px solid #8a8a8a7f',
});

const ProfileIcon = styled('div')({
    marginRight: '30px',
    flex: '0',
    color: '#1c2944',
    backgroundColor: '#ebebeb ',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '10px',
});

const EditButton = styled(Button)({
    backgroundColor: 'transparent',
    border: 'none',
    transition: 'border 0.3s ease-in',
    '&:hover': {
        border: '1px solid #d3d3d3',
        backgroundColor: 'transparent',

    },
});

function ProfSection({handleSidebarItemClick}) {
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        // Fetch user data when the component mounts
        APIService.GetUserData()
            .then((userData) => {
                setUserData(userData); // Save the fetched user data in state
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });


    }, []);

    return (
        <ProfileSection>
            <div className='profsec-up'>
                <Typography variant="h5" gutterBottom>
                    Profile Information
                </Typography>
                <EditButton
                    variant="contained"
                    className='prof-editBtn'
                    onClick={() => handleSidebarItemClick("edit-profile")}
                >
                    <Edit />
                </EditButton>
            </div>

            <ProfileInfo>
                <ProfileIcon>
                    <Person className='iconprof' />
                </ProfileIcon>
                <Typography variant="body1" className='profname'>{userData?.name}</Typography>
            </ProfileInfo>
            <ProfileInfo>
                <ProfileIcon>
                    <AccountCircle className='iconprof' />
                </ProfileIcon>
                <Typography variant="body1" className='profname'>{userData?.username}</Typography>
            </ProfileInfo>
            <ProfileInfo>
                <ProfileIcon>
                    <Email className='iconprof' />
                </ProfileIcon>
                <Typography variant="body1" className='profname'>{userData?.email}</Typography>
            </ProfileInfo>
            <ProfileInfo>
                <ProfileIcon>
                    <Phone className='iconprof' />
                </ProfileIcon>
                <Typography variant="body1" className='profname'>{userData?.phone}</Typography>
            </ProfileInfo>
            <ProfileInfo className='lastprof'>
                <ProfileIcon>
                    <LocationOn className='iconprof' />
                </ProfileIcon>
                <Typography variant="body1" className='profname'>{userData?.address}</Typography>
            </ProfileInfo>
            {/* Other ProfileInfo components */}

        </ProfileSection>
    );
}

export default ProfSection;
