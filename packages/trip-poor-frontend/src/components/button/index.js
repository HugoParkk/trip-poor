import { styled } from "styled-components";

export const ButtonBase = styled.button`
  width: 100%;
  padding: 14px 18px;
  border: ${({ theme, $border }) =>
    $border ? `1px solid ${theme.colors.gray2}` : `none`};
  border-radius: 8px;
  background-color: ${({ theme, $bgColor }) =>
    $bgColor ? theme.colors[$bgColor] : theme.colors.white};
  color: ${({ theme, $color }) =>
    $color ? theme.colors[$color] : theme.colors.gray4};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  ${({ theme }) => theme.typo.body.body1}
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.gray1};
  }
  &:active {
    opacity: 0.7;
  }
  &:disabled {
    opacity: 0.5;
  }
  transition: 0.3s;
`;

export const PrimaryButton = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.colors.primary2};
  color: ${({ theme }) => theme.colors.white};
  &:focus {
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary1};
  }
`;

export const IconButton = styled(ButtonBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  & > svg,
  & > img {
    width: 20px;
    height: 20px;
  }
`;
