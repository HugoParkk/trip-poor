import { styled } from "styled-components";
import { TextBase } from "../text";
import { useState } from "react";

export const InputBase = styled.input`
  width: 100%;
  padding: 14px 18px;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 8px;
  ${({ theme }) => theme.typo.body.body2}
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary2};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
  transition: 0.3s;
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
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
  transition: 0.3s;
`;

export const LabelInput = (props) => {
  const { value, onChange, placeholder } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <InputBox>
      {value?.length > 0 && <Label $focused={focused}>{placeholder}</Label>}
      <InputBase
        {...props}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </InputBox>
  );
};
