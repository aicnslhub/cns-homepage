import { CONFIG } from '../constants/config';

export async function cognitoLogin(email, password) {
  const response = await fetch(
    `https://cognito-idp.${CONFIG.REGION}.amazonaws.com/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-amz-json-1.1',
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
      },
      body: JSON.stringify({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: CONFIG.COGNITO_CLIENT_ID,
        AuthParameters: {
          USERNAME: email.trim(),
          PASSWORD: password,
        },
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    if (data.__type?.includes('NotAuthorizedException')) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    if (data.__type?.includes('UserNotFoundException')) {
      throw new Error('가입되지 않은 이메일입니다.');
    }

    if (data.__type?.includes('UserNotConfirmedException')) {
      throw new Error('이메일 인증이 완료되지 않은 계정입니다.');
    }

    throw new Error(data.message || '로그인에 실패했습니다.');
  }

  const result = data.AuthenticationResult;

  if (!result?.IdToken) {
    throw new Error('로그인 토큰을 받지 못했습니다.');
  }

  return {
    idToken: result.IdToken,
    accessToken: result.AccessToken,
    refreshToken: result.RefreshToken,
  };
}

export function saveAuthTokens(tokens) {
  localStorage.setItem('aicns_id_token', tokens.idToken);

  if (tokens.accessToken) {
    localStorage.setItem('aicns_access_token', tokens.accessToken);
  }

  if (tokens.refreshToken) {
    localStorage.setItem('aicns_refresh_token', tokens.refreshToken);
  }
}

export function clearAuthTokens() {
  localStorage.removeItem('aicns_id_token');
  localStorage.removeItem('aicns_access_token');
  localStorage.removeItem('aicns_refresh_token');

  localStorage.removeItem('cns_web_login');
  localStorage.removeItem('cns_web_role');

  localStorage.removeItem('cns_app_login');
  localStorage.removeItem('cns_app_role');

  localStorage.removeItem('cns_user_role');
}

export async function cognitoSignUp(email, password, name = '') {
  const userAttributes = [
    {
      Name: 'email',
      Value: email.trim(),
    },
  ];

  if (name.trim()) {
    userAttributes.push({
      Name: 'name',
      Value: name.trim(),
    });
  }

  const response = await fetch(
    `https://cognito-idp.${CONFIG.REGION}.amazonaws.com/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-amz-json-1.1',
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.SignUp',
      },
      body: JSON.stringify({
        ClientId: CONFIG.COGNITO_CLIENT_ID,
        Username: email.trim(),
        Password: password,
        UserAttributes: userAttributes,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    if (data.__type?.includes('UsernameExistsException')) {
      throw new Error('이미 가입된 이메일입니다.');
    }

    if (data.__type?.includes('InvalidPasswordException')) {
      throw new Error('비밀번호 조건이 맞지 않습니다. 대문자, 소문자, 숫자, 특수문자를 포함하세요.');
    }

    throw new Error(data.message || '회원가입에 실패했습니다.');
  }

  return data;
}

export async function cognitoConfirmSignUp(email, code) {
  const response = await fetch(
    `https://cognito-idp.${CONFIG.REGION}.amazonaws.com/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-amz-json-1.1',
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.ConfirmSignUp',
      },
      body: JSON.stringify({
        ClientId: CONFIG.COGNITO_CLIENT_ID,
        Username: email.trim(),
        ConfirmationCode: code.trim(),
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    if (data.__type?.includes('CodeMismatchException')) {
      throw new Error('인증코드가 올바르지 않습니다.');
    }

    if (data.__type?.includes('ExpiredCodeException')) {
      throw new Error('인증코드가 만료되었습니다.');
    }

    throw new Error(data.message || '이메일 인증에 실패했습니다.');
  }

  return data;
}