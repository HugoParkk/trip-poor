import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const TextBase = styled.div`
  ${({ theme, $typo = "" }) =>
    $typo.includes("h")
      ? theme.typo.title[$typo]
      : $typo.includes("body")
      ? theme.typo.body[$typo]
      : $typo.includes("caption")
      ? theme.typo.caption
      : null};
  color: ${({ theme, $color }) =>
    $color ? theme.colors[$color] : theme.colors.gray4};
  ${({ $underline }) => $underline && `text-decoration: underline`};
`;

export const TextH1 = styled(TextBase).attrs({ as: "h1" })``;
export const TextH2 = styled(TextBase).attrs({ as: "h2" })``;
export const TextP = styled(TextBase).attrs({ as: "p" })``;
export const TextSpan = styled(TextBase).attrs({ as: "span" })``;

export const LinkText = styled(Link)`
  ${({ theme, $typo = "" }) =>
    $typo.includes("h")
      ? theme.typo.title[$typo]
      : $typo.includes("body")
      ? theme.typo.body[$typo]
      : $typo.includes("caption")
      ? theme.typo.caption
      : null};
  color: ${({ theme, $color }) =>
    $color ? theme.colors[$color] : theme.colors.blue2};
  text-decoration-line: ${({ $underline }) =>
    $underline ? $underline : `underline`};
`;
