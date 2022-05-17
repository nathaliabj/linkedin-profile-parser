import React, { FC, useState } from "react";
import { DOMMessage, DOMMessageResponse } from "../../types";
import {
  RedirectButtons,
  ScrapProfileButton,
  UserName,
  Location,
  InfoWrapper,
  Item,
} from "./PopUp.styles";

type User = {
  name: string;
  location: string;
};

const RetrieveUserPopUp: FC = () => {
  const [userInfo, setUserInfo] = useState<User | undefined>();
  const [education, setEducation] = useState<[] | undefined>();
  const [experience, setExperience] = useState<[] | undefined>();
  const [profileUrl, setProfileUrl] = useState<string | undefined>();

  const getUserMainInfo = () => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          setProfileUrl(tabs[0].url);
          console.log(tabs);
          
          chrome.tabs.sendMessage(
            tabs[0].id || 0,
            { type: "GET_DOM" } as DOMMessage,
            (response: DOMMessageResponse) => {
              setUserInfo({
                name: response?.headlines[0] || "",
                location: response?.location[0] || "",
              });
            }
          );

          {
          /***************************************************
            This part of the code will programmatically redirect to:
            /details/experience -> /details/education -> profile
            however will not set the data on each of this pages but only 
            on the main profile 
          ***************************************************/
          }

          // chrome.tabs.update(
          //   { url: `${tabs[0].url}details/experience/` },
          //   (tabs) => {
          //     chrome.tabs.sendMessage(
          //       tabs?.id || 0,
          //       { type: "GET_DOM" } as DOMMessage,
          //       (response: DOMMessageResponse) => {
          //         setExperience(response.info);
          //       }
          //     );
          //   }
          // );
          // chrome.tabs.update(
          //   { url: `${tabs[0].url}details/education/` },
          //   (tabs) => {
          //     chrome.tabs.sendMessage(
          //       tabs?.id || 0,
          //       { type: "GET_DOM" } as DOMMessage,
          //       (response: DOMMessageResponse) => {
          //         setEducation(response.info);
          //       }
          //     );
          //   }
          // );
          // chrome.tabs.update({ url: `${tabs[0].url}` });
        }
      );
  };

  const getExperience = () => {
    chrome.tabs.update(
      { active: true, url: `${profileUrl}details/experience/` },
      (tabs) => {
        chrome.tabs.sendMessage(
          tabs?.id || 0,
          { type: "GET_DOM", currentWindow: true } as DOMMessage,
          (response: DOMMessageResponse) => {
            setExperience(response.info);
          }
        );
      }
    );
  };

  const getEducation = () => {
    chrome.tabs.update(
      { active: true, url: `${profileUrl}details/education/` },
      (tabs) => {
        chrome.tabs.sendMessage(
          tabs?.id || 0,
          { type: "GET_DOM", currentWindow: true } as DOMMessage,
          (response: DOMMessageResponse) => {
            setEducation(response.info);
          }
        );
      }
    );
  };

  const seeProfile = () => {
    chrome.tabs.update({ active: true, url: `${profileUrl}` });
  };
  return (
    <InfoWrapper>
      {!userInfo && <h1>Hey! 👋 </h1>}
      <p>Let's see if this is a viable candidate 👀</p>

      {!userInfo ? (
        <ScrapProfileButton onClick={getUserMainInfo}>
          Parse Profile
        </ScrapProfileButton>
      ) : (
        <>
          <UserName>{userInfo.name}</UserName>
          <Location>{userInfo.location.trim()}</Location>
          <RedirectButtons onClick={() => getExperience()}>
            Parse experience
          </RedirectButtons>
          <RedirectButtons onClick={() => getEducation()}>
            Parse education
          </RedirectButtons>
          <RedirectButtons onClick={() => seeProfile()}>
            See full profile
          </RedirectButtons>
          {experience && <h3>Experience</h3>}
          {experience && experience?.map((item,i) => <Item key={`experience${i}`}>{item}</Item>)}
          {education && <h3>Education</h3>}
          {education && education?.map((item, i) => <Item key={`education${i}`}>{item}</Item>)}
        </>
      )}
    </InfoWrapper>
  );
};

export default RetrieveUserPopUp;
