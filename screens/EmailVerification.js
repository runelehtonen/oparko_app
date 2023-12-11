import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  DefaultContainer,
  TopHalf,
  BottomHalf,
  IconBg,
  Colors,
  PageTitle,
  InfoText,
  EmphasizeText,
  StyledButton,
  ButtonText,
} from '../components/styles';

// Colors
const { brand, primary } = Colors;

// Icon
import { Octicons, Ionicons } from '@expo/vector-icons';

// Resend timer
import ResendTimer from './../components/ResendTimer';

const Verification = () => {
  const [resendingEmail, setResendingEmail] = useState(false);
  const [resendStatus, setResendStatus] = useState(' Send igen');

  // resend timer
  const [timeLeft, setTimeLeft] = useState(null);
  const [targetTime, setTargetTime] = useState(null);

  const [activeResend, setActiveResend] = useState(false);
  let resendTimerInterval;

  const calculateTimeLeft = (finalTime) => {
    const difference = finalTime - +new Date();
    if (difference >= 0) {
      setTimeLeft(Math.round(difference / 1000));
    } else {
      setTimeLeft(null);
      clearInterval(resendTimerInterval);
      setActiveResend(true);
    }
  };

  const triggerTimer = (targetTimeInSeconds = 30) => {
    setTargetTime(targetTimeInSeconds);
    setActiveResend(false);
    const finalTime = +new Date() + targetTimeInSeconds * 1000;
    resendTimerInterval = setInterval(() => (calculateTimeLeft(finalTime), 1000));
  };

  useEffect(() => {
    triggerTimer();

    return () => {
      clearInterval(resendTimerInterval);
    };
  }, []);

  const resendEmail = () => {};

  return (
    <DefaultContainer style={{ alignItems: 'center' }}>
      <TopHalf>
        <IconBg>
          <StatusBar style="dark" />
          <Octicons name="inbox" size={125} color={brand} />
        </IconBg>
      </TopHalf>
      <BottomHalf>
        <PageTitle>Verificer din email</PageTitle>
        <InfoText>
          Bekræft din email ved at klikke på linket i den email vi har sendt til
          <EmphasizeText> {`test.eksempel@email.com`}</EmphasizeText>
        </InfoText>

        <StyledButton onPress={() => {}} style={{ backgroundColor: brand, flexDirection: 'row' }}>
          <ButtonText>Proceed </ButtonText>
          <Ionicons name="md-arrow-forward" size={25} color={primary} />
        </StyledButton>
        <ResendTimer
          activeResend={activeResend}
          resendingEmail={resendingEmail}
          resendStatus={resendStatus}
          timeLeft={timeLeft}
          targetTime={targetTime}
          resendEmail={resendEmail}
        />
      </BottomHalf>
    </DefaultContainer>
  );
};

export default Verification;
