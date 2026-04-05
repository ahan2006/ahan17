import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .contact-details {
    margin-top: 40px;
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    color: var(--light-slate);

    .highlight {
      color: var(--green);
    }

    p {
      margin: 10px 0;
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        My inbox is always open. Whether you have a question or just want to say hi, I’ll get back
        to you!
      </p>

      <div className="contact-details">
        <p>
          Email: <span className="highlight">ahanpshah@gmail.com</span>
        </p>
        <p>
          Phone: <span className="highlight">(262)-402-0488</span>
        </p>
      </div>

      <a className="email-link" href="mailto:ahanpshah@gmail.com">
        Say Hello
      </a>
    </StyledContactSection>
  );
};

export default Contact;
