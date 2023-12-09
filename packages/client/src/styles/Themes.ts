export const Theme: Record<string, ITheme> = {
  light: {
    bodyBgColor: '#e5f7e4',
    textColor: '#000',
    input: {
      bgColor: '#fff',
      placeholderColor: 'rgba(0, 0, 0, 0.7)',
      border: '0.5px solid rgba(0, 0, 0, 0.5)',
    },
  },
  dark: {
    bodyBgColor: '#121212',
    textColor: '#fff',
    input: {
      bgColor: '#d3d3d380',
      placeholderColor: 'rgba(255, 255, 255, 0.7)',
      border: '0.5px solid rgba(255, 255, 255, 1)',
    },
  },
};

export interface ITheme {
  bodyBgColor: string;
  textColor: string;
  input: {
    bgColor: string;
    placeholderColor: string;
    border: string;
  };
}
