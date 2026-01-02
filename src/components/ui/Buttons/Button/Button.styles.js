import styled, { css } from 'styled-components';

// ============================================================================
// Helper Functions / Fonctions Utilitaires
// ============================================================================

/**
 * Returns CSS based on the generic "kind" (primary, ghost, etc.)
 * Retourne le CSS basé sur le "genre" générique.
 */
const getKindStyles = (kind, theme) => {
  // Map generic names to specific theme tokens
  // Mappage des noms génériques vers les tokens spécifiques du thème
  const kinds = {
    primary: css`
      background-color: ${theme.colors.action.primary};
      color: ${theme.colors.text.inverse};
      &:hover { background-color: ${theme.colors.action.primaryHover}; }
    `,
    secondary: css`
      background-color: ${theme.colors.action.secondary};
      color: ${theme.colors.text.inverse};
      &:hover { background-color: ${theme.colors.action.secondaryHover}; }
    `,
    ghost: css`
      background-color: transparent;
      color: ${theme.colors.action.primary};
      border: 1px solid transparent;
      &:hover { 
        background-color: ${theme.colors.action.hoverGeneric}; 
        color: ${theme.colors.action.primaryHover};
      }
    `,
    danger: css`
      background-color: ${theme.colors.status.error};
      color: white;
      &:hover { background-color: ${theme.colors.status.errorHover}; }
    `,
    // ... add other kinds here / ajouter les autres genres ici
  };

  return kinds[kind] || kinds.primary;
};

/**
 * Returns CSS based on the size prop.
 * Retourne le CSS basé sur la prop taille.
 */
const getSizeStyles = (size) => {
  const sizes = {
    xs: css`height: 24px; padding: 0 8px; font-size: 12px;`,
    sm: css`height: 32px; padding: 0 12px; font-size: 13px;`,
    md: css`height: 40px; padding: 0 16px; font-size: 14px;`,
    lg: css`height: 48px; padding: 0 24px; font-size: 16px;`,
    xl: css`height: 64px; padding: 0 32px; font-size: 18px;`,
    '2xl': css`height: 80px; padding: 0 40px; font-size: 20px;`,
  };

  return sizes[size] || sizes.md;
};

// ============================================================================
// Styled Components / Composants Stylisés
// ============================================================================

export const StyledButton = styled.button`
  font-family: inherit;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent; 
  outline: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.2, 0, 0.38, 0.9);
  text-decoration: none;
  border-radius: 4px; 
  box-sizing: border-box;


  ${props => getKindStyles(props.$kind, props.theme)}
  ${props => getSizeStyles(props.$size)}

  /* 3. Icon Only Modification / Modification Icône Seule */

  ${props => props.$isIconOnly && css`
    padding: 0;
    width: ${props.$size === 'xs' ? '24px' : props.$size === 'lg' ? '48px' : '40px'};
  `}


  &:disabled, &[disabled], &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: ${props => props.theme.colors.action.disabled};
    color: ${props => props.theme.colors.text.disabled};
    /* Prevents hover styles / Empêche les styles de survol */
    pointer-events: none; 
  }


  &:focus-visible {
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.canvas}, 0 0 0 4px ${props => props.theme.colors.action.focus};
    z-index: 1;
  }
`;

export const ButtonIconWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-right: ${props => props.side === 'left' ? '8px' : '0'};
  margin-left: ${props => props.side === 'right' ? '8px' : '0'};
`;