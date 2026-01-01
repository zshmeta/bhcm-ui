import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { StyledButton, ButtonIconWrapper } from './Button.styles';


export const BUTTON_KINDS = [
  'primary',
  'secondary',
  'tertiary',
  'ghost',
  'danger',
  'danger--primary',
  'danger--ghost',
  'warning', 
  'success', 
];


export const BUTTON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];


const Button = forwardRef(function Button(props, ref) {
  const {
    children,
    as, // Polymorphic prop / Prop polymorphique (ex: 'a', 'div')
    href,
    kind = 'primary',
    size = 'md',
    disabled = false,
    className,
    
    // Icon Logic / Logique d'icône
    renderIcon: Icon,
    iconDescription,
    hasIconOnly = false,
    
    // Tooltip Logic (For generic integration) / Logique d'infobulle
    tooltipPosition = 'top',
    tooltipAlignment = 'center',
    
    // Events / Événements
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  } = props;

  // --------------------------------------------------------------------------
  // Logic / Logique
  // --------------------------------------------------------------------------

  /**
   * Validation: Icon-only buttons MUST have a description for screen readers.
   * Validation : Les boutons avec icône seule DOIVENT avoir une description pour les lecteurs d'écran.
   */
  const isIconOnly = hasIconOnly || (children === null || children === undefined);

  if (isIconOnly && !iconDescription) {
    console.error(
      'Warning [Button]: The `iconDescription` prop is required when `hasIconOnly` is true or no children are provided. This is essential for accessibility.\n' +
      'Avertissement [Button]: La prop `iconDescription` est requise lorsque `hasIconOnly` est vrai ou qu\'aucun enfant n\'est fourni. C\'est essentiel pour l\'accessibilité.'
    );
  }

  // --------------------------------------------------------------------------
  // Render / Rendu
  // --------------------------------------------------------------------------
  
  // Note: We pass props with `$` prefix to styled-components to prevent them from leaking to the DOM.
  // Note : Nous passons les props avec le préfixe `$` aux styled-components pour éviter qu'elles ne fuient dans le DOM.
  return (
    <StyledButton
      ref={ref}
      as={as || (href ? 'a' : 'button')}
      href={href}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={className}
      
      // Styling Props / Props de style
      $kind={kind}
      $size={size}
      $isIconOnly={isIconOnly}
      
      // Accessibility / Accessibilité
      aria-label={isIconOnly ? iconDescription : undefined}
      aria-disabled={disabled}
      type={href ? undefined : (props.type || 'button')}
      role={href ? 'button' : undefined} // Ensures <a> tags behave like buttons for screen readers
      
      // Event forwarding / Transfert d'événements
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      {...rest}
    >
      {/* 1. Leading Icon / Icône principale */}
      {/* We check !isIconOnly to avoid rendering it twice / On vérifie !isIconOnly pour éviter le double rendu */}
      {Icon && !isIconOnly && (
        <ButtonIconWrapper side="left">
           <Icon aria-hidden="true" focusable="false" />
        </ButtonIconWrapper>
      )}

      {/* 2. Text Content / Contenu textuel */}
      {!isIconOnly && children}

      {/* 3. Icon Only Mode / Mode Icône Seule */}
      {isIconOnly && Icon && (
        <Icon aria-hidden="true" focusable="false" />
      )}
    </StyledButton>
  );
});

// ============================================================================
// Display Name & Definitions
// ============================================================================

Button.displayName = 'Button';

// ============================================================================
// PropTypes (Documentation & Validation)
// ============================================================================

Button.propTypes = {
  /**
   * Specify how the button itself should be rendered.
   * Spécifiez comment le bouton lui-même doit être rendu.
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /**
   * Specify the content of your Button.
   * Spécifiez le contenu de votre bouton.
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your Button.
   * Spécifiez une className optionnelle à ajouter à votre bouton.
   */
  className: PropTypes.string,

  /**
   * Specify whether the Button should be disabled, or not.
   * Spécifiez si le bouton doit être désactivé ou non.
   */
  disabled: PropTypes.bool,

  /**
   * Specify if the button is an icon-only button.
   * Spécifiez si le bouton est un bouton avec icône uniquement.
   */
  hasIconOnly: PropTypes.bool,

  /**
   * Optionally specify an href for your Button to become an `<a>` element.
   * Spécifiez éventuellement un href pour que votre bouton devienne un élément `<a>`.
   */
  href: PropTypes.string,

  /**
   * If specifying the `renderIcon` prop, provide a description for that icon that can be read by screen readers.
   * Si vous spécifiez la prop `renderIcon`, fournissez une description pour cette icône qui pourra être lue par les lecteurs d'écran.
   */
  iconDescription: (props, propName, componentName) => {
    const { hasIconOnly, children } = props;
    if ((hasIconOnly || !children) && !props[propName]) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Icon-only buttons require a description. / Les boutons icône seule nécessitent une description.`
      );
    }
    return null;
  },

  /**
   * Specify the kind of Button you want to create.
   * Spécifiez le type de bouton que vous souhaitez créer.
   */
  kind: PropTypes.oneOf(BUTTON_KINDS),

  /**
   * Specify the size of the button.
   * Spécifiez la taille du bouton.
   */
  size: PropTypes.oneOf(BUTTON_SIZES),

  /**
   * A component used to render an icon.
   * Un composant utilisé pour rendre une icône.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Optional prop to specify the type of the Button.
   * Prop optionnelle pour spécifier le type du bouton.
   */
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
};

export default Button;