import styled from 'styled-components';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

// colors
export const Colors = {
  primary: '#ffffff',
  secondary: '#E5e7EB',
  tertiary: '#1F2937',
  darkLight: '#9CA3AF',
  lightGray: '#B2B2B2',
  light: '#EFF6FE',
  brand: '#025578',
  green: '#10B981',
  red: '#EF4444',
  bg: '#F2F5F8',
  lightBlue: 'rgba(2, 85, 120, 0.1)',
};

const { primary, secondary, tertiary, darkLight, brand, green, light, bg, red } = Colors;

export const DefaultContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 30}px;
  background-color: ${bg};
`;

export const StyledContainer = styled.View`
  flex: 1;
  padding-top: ${StatusBarHeight + 30}px;
  background-color: ${bg};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;

export const FormBackground = styled.View`
  width: 100%;
  align-items: center;
  background-color: ${primary};
  padding: 25px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const WelcomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`;

export const PageLogo = styled.Image`
  position: absolute;
  width: 212px;
  height: 59px;
  z-index: 3;
  transform: translateY(-595px);
  opacity: 0.06;
`;

export const CarImg = styled.Image`
  width: 204px;
  height: 78px;
  margin-right: 130px;
  transform: scaleX(-1) translateY(10px);
  z-index: 3;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${secondary};
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const WelcomeImage = styled.Image`
  height: 50%;
  min-width: 100%;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;

  ${(props) =>
    props.welcome &&
    `
    font-size: 35px;
    `}
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};

  ${(props) =>
    props.welcome &&
    `
    margin-bottom: 5px;
    font-weight: normal;
    `}
`;

export const StyledFormArea = styled.View`
  width: 100%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${light};
  padding: 15px;
  padding-left: 70px;
  padding-right: 55px;
  border-radius: 50px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
`;

export const LeftIconContainer = styled.View`
  position: absolute;
  left: 3px;
  top: 21px;
  z-index: 1;
  background-color: white;
  width: 55px;
  height: 55px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export const LeftIcon = styled.View`
  position: absolute;
  z-index: 2;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 16px;
  top: 36px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-vertical: 5px;
  height: 60px;

  ${(props) =>
    props.google == true &&
    `
        background-color: ${darkLight};
        flex-direction: row;
        justify-content: center;
    `}
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;

  ${(props) =>
    props.google == true &&
    `
        padding-left: 25px;
        padding-right: 25px;
    `}
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${(props) => (props.type == 'SUCCESS' ? green : red)};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-items: center;
  color: ${tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  ${(props) => {
    const { resendStatus } = props;
    if (resendStatus === 'Failed!') {
      return `
        color: ${Colors.red};
      `;
    } else if (resendStatus === 'Sent!') {
      return `
        color: ${brand};
      `;
    }
  }}
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;

  ${(props) => {
    const { resendStatus } = props;
    if (resendStatus === 'Failed!') {
      return `
        color: ${Colors.red};
      `;
    } else if (resendStatus === 'Sent!') {
      return `
        color: ${green};
      `;
    }
  }}
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const ModalContent = styled.View`
  background-color: white;
  padding: 16px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  elevation: 5; /* Android elevation for shadow */
  shadow-color: black; /* iOS shadow color */
  shadow-offset: 0px -3px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  margin-top: 10px; /* Adjust the margin as needed */
`;

// Email Verification Screen
export const TopHalf = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

export const IconBg = styled.View`
  background-color: ${Colors.lightBlue};
  width: 250px;
  height: 250px;
  border-radius: 250px;
  align-items: center;
  justify-content: center;
`;

export const BottomHalf = styled(TopHalf)`
  justify-content: space-around;
`;

export const InfoText = styled.Text`
  color: ${Colors.lightGray};
  font-size: 16px;
  text-align: center;
`;

export const EmphasizeText = styled.Text`
  font-weight: bold;
  font-style: italic;
`;

export const InlineGroup = styled.View`
  flex-direction: row;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;
