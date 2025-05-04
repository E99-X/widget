import { lightTheme } from '@mysten/dapp-kit';
export const myTheme = {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      outlineButton: 'var(--font-light-color)',
      primaryButton: 'var(--font-light-color)',
    },
    backgroundColors: {
      ...lightTheme.backgroundColors,
      primaryButton: 'transparent',
      outlineButtonHover: 'var(--font-light-color)',
      primaryButtonHover: 'transparent',
    },
    borderColors: {
      outlineButton: 'var(--font-light-color)',
    },
    radii: {
        ...lightTheme.radii,
		medium: '6px',
	},
    shadows: {
        ...lightTheme.shadows,
		primaryButton: 'none',
	},

  };