export const GlobalStyles = {
  colors: {
    primary50: '#e4d9fd',
    primary100: '#c6affc',
    primary200: '#a281f0',
    primary400: '#5721d4',
    primary500: '#3e04c3',
    primary700: '#2d0689',
    primary800: '#200364',
    accent500: '#f7bc0c',
    error50: '#fcc4e4',
    error500: '#9b095c',
    gray500: '#39324a',
    gray700: '#221c30',
  },
};

export const defaultHeaderStyles = {
  headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
  headerTintColor: '#fff',
};

export const defaultTabBarStyles = {
  tabBarStyle: {
    backgroundColor: GlobalStyles.colors.primary500,
    height: 68,
    paddingBottom: 10,
  },
  tabBarActiveTintColor: GlobalStyles.colors.accent500,
};

export const defaultContentStyles = {
  contentStyle: { backgroundColor: GlobalStyles.colors.primary800 },
};
