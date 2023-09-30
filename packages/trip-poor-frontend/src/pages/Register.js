import { useState } from "react";
import styled from "styled-components";
import { LinkText, TextH1, TextSpan } from "../components/text";
import { LabelInput } from "../components/input";
import { IconButton, PrimaryButton } from "../components/button";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoWrapper = styled.div`
  width: 178px;
  & > svg {
    width: 100%;
    height: auto;
  }
`;

const LeftWrapper = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CaptionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 14px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

function Register() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
  });
  const { email, password, passwordCheck, nickname } = inputs;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <Container>
      <Content>
        <LogoWrapper>
          <svg
            viewBox="0 0 485 149"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M211.472 49.3201L212.752 56.7441H213.264C219.28 51.6241 226.704 47.5281 234.384 47.5281C252.048 47.5281 262.544 61.9921 262.544 84.0081C262.544 108.584 247.824 122.792 232.08 122.792C225.808 122.792 219.792 119.976 214.288 114.984L214.8 126.76V148.52H196.112V49.3201H211.472ZM227.856 107.304C236.56 107.304 243.216 100.136 243.216 84.2641C243.216 70.4401 238.864 63.0161 229.008 63.0161C224.016 63.0161 219.792 65.4481 214.8 70.4401V101.928C219.408 105.896 223.888 107.304 227.856 107.304Z"
              fill="#11C97C"
            />
            <path
              d="M308.439 122.792C290.519 122.792 274.007 108.84 274.007 85.2881C274.007 61.3521 290.519 47.5281 308.439 47.5281C326.359 47.5281 342.871 61.3521 342.871 85.2881C342.871 108.84 326.359 122.792 308.439 122.792ZM308.439 107.432C318.167 107.432 323.671 98.7281 323.671 85.2881C323.671 71.4641 318.167 62.8881 308.439 62.8881C298.711 62.8881 293.207 71.4641 293.207 85.2881C293.207 98.7281 298.711 107.432 308.439 107.432Z"
              fill="#11C97C"
            />
            <path
              d="M388.564 122.792C370.644 122.792 354.132 108.84 354.132 85.2881C354.132 61.3521 370.644 47.5281 388.564 47.5281C406.484 47.5281 422.996 61.3521 422.996 85.2881C422.996 108.84 406.484 122.792 388.564 122.792ZM388.564 107.432C398.292 107.432 403.796 98.7281 403.796 85.2881C403.796 71.4641 398.292 62.8881 388.564 62.8881C378.836 62.8881 373.332 71.4641 373.332 85.2881C373.332 98.7281 378.836 107.432 388.564 107.432Z"
              fill="#11C97C"
            />
            <path
              d="M454.097 49.3201L455.377 61.9921H455.889C461.137 52.6481 468.561 47.5281 476.241 47.5281C480.209 47.5281 482.513 48.1681 484.689 49.0641L481.361 65.3201C478.929 64.4241 476.881 64.1681 473.937 64.1681C468.305 64.1681 461.521 67.8801 457.425 78.2481V121H438.737V49.3201H454.097Z"
              fill="#11C97C"
            />
            <path
              d="M203.472 42.3201L204.752 49.7441H205.264C211.28 44.6241 218.704 40.5281 226.384 40.5281C244.048 40.5281 254.544 54.9921 254.544 77.0081C254.544 101.584 239.824 115.792 224.08 115.792C217.808 115.792 211.792 112.976 206.288 107.984L206.8 119.76V141.52H188.112V42.3201H203.472ZM219.856 100.304C228.56 100.304 235.216 93.1361 235.216 77.2641C235.216 63.4401 230.864 56.0161 221.008 56.0161C216.016 56.0161 211.792 58.4481 206.8 63.4401V94.9281C211.408 98.8961 215.888 100.304 219.856 100.304Z"
              fill="#042228"
            />
            <path
              d="M34.352 115.792C17.328 115.792 10.8 105.04 10.8 88.912V57.168H0.687988V43.216L11.696 42.32L13.872 23.12H29.616V42.32H47.28V57.168H29.616V88.912C29.616 96.976 32.816 100.944 39.344 100.944C41.776 100.944 44.464 100.304 46.384 99.408L49.456 113.104C45.488 114.512 40.624 115.792 34.352 115.792Z"
              fill="#042228"
            />
            <path
              d="M77.222 42.32L78.502 54.992H79.014C84.262 45.648 91.686 40.528 99.366 40.528C103.334 40.528 105.638 41.168 107.814 42.064L104.486 58.32C102.054 57.424 100.006 57.168 97.062 57.168C91.43 57.168 84.646 60.88 80.55 71.248V114H61.862V42.32H77.222Z"
              fill="#042228"
            />
            <path
              d="M115.948 30.8V12.624H134.636V30.8H115.948ZM115.82 42.32H134.508V114H115.82V42.32Z"
              fill="#042228"
            />
            <path
              d="M209 26C209 40.3594 197.359 52 183 52C168.641 52 157 40.3594 157 26C157 11.6406 168.641 0 183 0C197.359 0 209 11.6406 209 26Z"
              fill="#A7B2B4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M199.804 58.8193C202.113 61.1961 202.058 64.9947 199.681 67.3037L182.181 84.3037C180.437 85.9972 177.845 86.4717 175.614 85.5053L160.614 79.0053C157.574 77.6878 156.177 74.1549 157.495 71.1144C158.812 68.0738 162.345 66.6771 165.386 67.9947L176.7 72.8977L191.319 58.6963C193.696 56.3874 197.495 56.4424 199.804 58.8193Z"
              fill="#A7B2B4"
            />
          </svg>
        </LogoWrapper>
        <LeftWrapper style={{ margin: "38px 0 34px" }}>
          <TextH1 $typo="h1">회원가입</TextH1>
        </LeftWrapper>
        <InputWrapper>
          <LabelInput
            name="email"
            placeholder="이메일"
            type="email"
            value={email}
            onChange={handleChange}
          />
          <LabelInput
            name="password"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <LabelInput
            name="passwordCheck"
            placeholder="비밀번호 확인"
            type="password"
            value={passwordCheck}
            onChange={handleChange}
          />
          <LabelInput
            name="nickname"
            placeholder="닉네임"
            type="text"
            value={nickname}
            onChange={handleChange}
          />
        </InputWrapper>
        <ButtonWrapper>
          <PrimaryButton>회원가입</PrimaryButton>
          <IconButton $border>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.64 9.20419C17.64 8.56601 17.5827 7.95237 17.4764 7.36328H9V10.8446H13.8436C13.635 11.9696 13.0009 12.9228 12.0477 13.561V15.8192H14.9564C16.6582 14.2524 17.64 11.9451 17.64 9.20419Z"
                fill="#4285F4"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z"
                fill="#34A853"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40664 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54755 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z"
                fill="#FBBC05"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z"
                fill="#EA4335"
              ></path>
            </svg>
            구글로 계속하기
          </IconButton>
        </ButtonWrapper>
        <CaptionWrapper>
          <TextSpan $typo="caption">이미 가입하셨나요?</TextSpan>
          <LinkText $typo="caption" $color="primary2" to="/login">
            로그인
          </LinkText>
        </CaptionWrapper>
      </Content>
    </Container>
  );
}

export default Register;
