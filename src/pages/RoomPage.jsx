import React, { useContext } from 'react'
import { ZegoUIKitPrebuilt, ZegoUserState } from '@zegocloud/zego-uikit-prebuilt'
import { UserContext } from '../lib/UserContext'
import { setUserStatus } from '../lib/api.js'
import { useParams } from 'react-router-dom'

const RoomPage = () => {
  const { user } = useContext(UserContext);
  const { roomId } = useParams();
  const handleHomeReturn = async () => {
    await setUserStatus(user.email, "ONLINE");
    window.location.href = '/';
  }

  let myMeeting = async (element) => {
    const appID = Number(import.meta.env.VITE_zego_appid);

    const serverSecret = import.meta.env.VITE_zego_serverSecret; 
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      user.id,
      user.name
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Room Link',
          url:
           window.location.protocol + '//' + 
           window.location.host + window.location.pathname +
            '?roomId=' +
            roomId,
        },
      ],
      
      turnOnMicrophoneWhenJoining: false,
      turnOnCameraWhenJoining: false,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 50,
      layout: "Auto",
      showLayoutButton: true,
      onReturnToHomeScreenClicked: handleHomeReturn,
      scenario: {
        mode: "VideoConference",
        config: {
          role: "Host",
        },
      },
    });
    

  }; 


  return (
    <div className='w-screen h-screen relative'>
      <div
        ref={myMeeting} 
        className='w-full h-full flex justify-center items-center' 
      ></div>
    </div>
  )
}

export default RoomPage