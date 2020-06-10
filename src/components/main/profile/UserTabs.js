import React from 'react'
import { useMediaQuery, Tabs, Tab, useTheme, Typography, Box } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import { FollowerTab, FollowingTab } from './ProfileTabViews';
import {LatestTab} from './LatestTab'

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  
export const UserTabs = ({data, latest}) => {
    const phone = useMediaQuery('(min-width: 620px)');
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      const theme = useTheme()
    
      const handleChangeIndex = (index) => {
        setValue(index);
      };
    if(!phone) {
        return (
            <div>

                <Tabs value={value} onChange={handleChange}  indicatorColor="primary"
                textColor="primary"
                variant="fullWidth" className='profile-tabs'>
                
                    <Tab label="Latest" />
                    <Tab label={`Followers: ${data.followers.length}`} />
                    <Tab label={`Following: ${data.following.length}`} />
                
                </Tabs>

                <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex} className='profile-tabs'
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <LatestTab data={latest} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                <FollowerTab followers={data.followers} />
                  
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                <FollowingTab following={data.following} />
                </TabPanel>
              </SwipeableViews>
            
            </div>
        )
    } else {
      return (
        <div>
        <Tabs value={value} onChange={handleChange}  indicatorColor="primary"
                textColor="primary"
                centered className='profile-tabs'>
                
                    <Tab label="Latest" />
                    <Tab label={`Followers: ${data.followers.length}`} />
                    <Tab label={`Following: ${data.following.length}`} />
                
                </Tabs>
                <section className="profile-tabs">
                <TabPanel value={value} index={0} dir={theme.direction}>
                <LatestTab data={latest} />
               </TabPanel>
               <TabPanel value={value} index={1} dir={theme.direction}>
               <FollowerTab followers={data.followers} />
                 
               </TabPanel>
               <TabPanel value={value} index={2} dir={theme.direction}>
               <FollowingTab following={data.following} />
               </TabPanel>
                
                </section>

        </div>
      )
    }
}