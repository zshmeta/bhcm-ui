import { forwardRef } from 'react';
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
    as, // Polymorphic prop /
    href,
    kind = 'primary',
    size = 'md',
    disabled = false,
    className,
    
    // Icon Logic / Logique d'icône
    renderIcon: Icon,
    iconDescription,
    hasIconOnly = false,
    
    // Tooltip Logic (For generic integration) 
    tooltipPosition = 'top',
    tooltipAlignment = 'center',
    
    // Events 
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  } = props;


 
  const isIconOnly = hasIconOnly || (children === null || children === undefined);

  if (isIconOnly && !iconDescription) {
    console.error(
      'Warning [Button]: The `iconDescription` prop is required when `hasIconOnly` is true or no children are provided. This is essential for accessibility.\n' +
      'Avertissement [Button]: La prop `iconDescription` est requise lorsque `hasIconOnly` est vrai ou qu\'aucun enfant n\'est fourni. C\'est essentiel pour l\'accessibilité.'
    );
  }

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
      
      // Event forwarding 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      {...rest}
    >

      {/* As Icon  */}

      {Icon && !isIconOnly && (
        <ButtonIconWrapper side="left">
           <Icon aria-hidden="true" focusable="false" />
        </ButtonIconWrapper>
      )}

      {/* with Children */}

      {!isIconOnly && children}

      {/* 3. Icon Only Mode */}

      {isIconOnly && Icon && (
        <Icon aria-hidden="true" focusable="false" />
      )}
    </StyledButton>
  );
});


Button.displayName = 'Button';



export default Button;