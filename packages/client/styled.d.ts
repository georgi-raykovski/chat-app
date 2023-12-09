import 'styled-components';
import { ITheme } from './src/styles/Themes';


declare module 'styled-components' {
  interface DefaultTheme extends ITheme {}
}
