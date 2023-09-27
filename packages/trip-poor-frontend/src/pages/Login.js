import { LabelInput } from "../components/input";
import { TextH1, TextSpan } from "../components/text";

function Login() {
  return (
    <div>
      <TextH1 $typo="h1">로그인</TextH1>
      <LabelInput placeholder="이메일" />
      <TextSpan $typo="caption">비밀번호 찾기</TextSpan>
    </div>
  );
}

export default Login;
