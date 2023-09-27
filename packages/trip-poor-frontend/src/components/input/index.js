import { styled } from "styled-components";
import { TextBase } from "../text";
import { useState } from "react";

export const InputBase = styled.input`
  padding: 14px 18px;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 8px;
  ${({ theme }) => theme.typo.body.body1}
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary2};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

const InputBox = styled.div`
  position: relative;
`;

const Label = styled(TextBase).attrs({ as: "label" })`
  ${({ theme }) => theme.typo.body.body3}
  position: absolute;
  top: -8px;
  left: 14px;
  padding: 0 4px;
  background-color: #fff;
  ${({ theme, $focused }) =>
    $focused &&
    `
    color: ${theme.colors.primary2};
  `}
`;

export const LabelInput = ({ placeholder }) => {
  const [focused, setFocused] = useState(false);

  return (
    <InputBox>
      <Label $focused={focused}>{placeholder}</Label>
      <InputBase
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </InputBox>
  );
};
