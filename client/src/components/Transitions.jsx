import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const FadeTransition = ({ children, location }) => {
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={300}
        classNames="fade"
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};
