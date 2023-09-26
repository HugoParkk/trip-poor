import font from "./font";

const typo = {
  title: {
    h1: `
      font-size: ${font.fontSize.xlarge};
      font-weight: ${font.fontWeight.bold};
      line-height: ${font.lineHeight.xlarge};
    `,
    h2: `
      font-size: ${font.fontSize.large};
      font-weight: ${font.fontWeight.bold};
      line-height: ${font.lineHeight.large};
    `,
  },
  body: {
    body1: `
      font-size: ${font.fontSize.medium};
      font-weight: ${font.fontWeight.medium};
    `,
    body2: `
      font-size: ${font.fontSize.medium};
      font-weight: ${font.fontWeight.regular};
    `,
    body3: `
      font-size: ${font.fontSize.small};
      font-weight: ${font.fontWeight.regular};
      letter-spacing: ${font.letterSpacing.small};
    `,
  },
  caption: `
    font-size: ${font.fontSize.small};
    font-weight: ${font.fontWeight.light};
    letter-spacing: ${font.letterSpacing.small};
  `,
};

export default typo;
