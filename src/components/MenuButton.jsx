import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import mailIcon from "../assets/mail.svg";
import personAddIcon from "../assets/personadd.svg";
import notiIcon from "../assets/noti.svg";

const MenuButton = () => {
  const [menu, setMenu] = React.useState(null);

  const handleClick = (event) => {
    setMenu(event.currentTarget);
  };
  
  const handleClose = () => {
    setMenu(null);
  };
  
  const open = Boolean(menu);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div className='absolute mt-17 ml-5 z-10'>
     <div aria-describedby={id} className='px-3 py-3 cursor-pointer bg-gray-700 hover:scale-105 transition-all duration-200 text-white rounded-2xl' onClick={handleClick}>
       <img src={mailIcon} alt="Message Menu"/> 
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={menu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Typography component="div" sx={{ height: 480 }}>
          <div className='flex flex-col justify-start items-center w-full h-full'>
            <div className='flex justify-center items-center'>
              <div className='flex justify-center items-center border-2 border-black gap-2 px-10 py-2'>
                <img src={personAddIcon} className='w-6 h-6 -mt-0.5' alt="Search" />
                <span>All Users</span>
              </div>
              <div className='flex justify-center items-center border-2 gap-2 px-10 py-2'>
                <img src={notiIcon} className='w-6 h-6 -mt-0.5' alt="notification" />
                <span>Invitation</span>
              </div>
            </div>
          </div>
        </Typography>
      </Popover>
    </div>
  )
}

export default MenuButton