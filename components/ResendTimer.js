import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { InlineGroup, InfoText, TextLink, TextLinkContent, EmphasizeText, Colors } from '../components/styles';
const { brand } = Colors;

const ResendTimer = ({ activeResend, resendEmail, resendingEmail, resendStatus, timeLeft, targetTime }) => {
  return (
    <View>
      <InlineGroup>
        <InfoText>Har du ikke modtaget en email?</InfoText>

        {!resendingEmail && (
          <TextLink style={{ opacity: !activeResend && 0.2 }} disabled={!activeResend} onPress={resendEmail}>
            <TextLinkContent resendStatus={resendStatus} style={{ textDecorationLine: 'underline' }}>
              {resendStatus}
            </TextLinkContent>
          </TextLink>
        )}

        {resendingEmail && (
          <TextLink disabled>
            <TextLinkContent>
              <ActivityIndicator size="small" color={brand} />
            </TextLinkContent>
          </TextLink>
        )}
      </InlineGroup>
      {!activeResend && (
        <InfoText>
          om <EmphasizeText>{timeLeft || targetTime}</EmphasizeText> sekund(er)
        </InfoText>
      )}
    </View>
  );
};

export default ResendTimer;
