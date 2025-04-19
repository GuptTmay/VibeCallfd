import React, { useContext } from 'react'
import { ZegoUIKitPrebuilt, ZegoUserState } from '@zegocloud/zego-uikit-prebuilt'
import { useParams } from 'react-router-dom'
import { UserContext } from '../lib/UserContext'
import { setUserStatus } from '../lib/api.js'

const RoomPage = () => {
  const { roomId } = useParams();
  const { user } = useContext(UserContext);

  const handleHomeReturn = async () => {
    await setUserStatus(user.email, "ONLINE");
    // navigate("/");
    window.location.href = '/';
  }

  const handleLeaveRoom = () => {

  }

  let myMeeting = async (element) => {
    const appID = 1232664549;
    const serverSecret = "ce243661e192e7c82dbf81d228000bc0";
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
      onLeaveRoom: handleLeaveRoom,
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