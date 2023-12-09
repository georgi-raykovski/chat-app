const lightTheme: ITheme = {
  bodyBgColor: '#e5f7e4',
  textColor: '#000',
}

const darkTheme: ITheme = {
  bodyBgColor: '#121212',
  textColor: '#fff',
}

export interface ITheme {
  bodyBgColor: string,
  textColor: string
}

export const AvailableThemes: Record<string, ITheme> = {
  light: lightTheme,
  dark: darkTheme,
};
