import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

// --- IMPORTANT: Ensure these files exist in your src/images folder! ---
import tylerImg from '../../images/tyler.png';
import keithImg from '../../images/keith.png';

const StyledRecommendationsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
    width: 100%;
  }
`;

const StyledGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  /* INCREASED WIDTH: Changed from 300px to 450px to make the text boxes wider */
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  grid-gap: 20px;
  position: relative;
  margin-top: 50px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
`;

const StyledRecommendation = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .inner {
        transform: translateY(-7px);
      }
    }
  }

  .inner {
    ${({ theme }) => theme.mixins.boxShadow};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2.5rem 2rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
  }

  /* NEW HEADER LAYOUT: Profile picture and info moved to the top */
  header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
    width: 100%;
  }

  .recommender-pic {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--green);
  }

  .recommender-info {
    display: flex;
    flex-direction: column;
  }

  .recommender-name {
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 600;
  }

  .recommender-title {
    color: var(--green);
    font-family: var(--font-sans);
    font-size: var(--fz-sm);
    margin-top: 5px;
    line-height: 1.3;
  }

  .recommendation-text {
    color: var(--light-slate);
    font-size: 15px;
    line-height: 1.6;

    p {
      margin-bottom: 15px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;

const Recommendations = () => {
  const revealTitle = useRef(null);
  const revealRecommendations = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealRecommendations.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const recommendationsData = [
    {
      name: 'Keith Sarver, PE, MBA, ICC',
      title: 'Electrical Section Manager at Burns & McDonnell',
      image: keithImg,
      text: [
        'It is my pleasure to recommend Ahan Shah. He worked with us at Burns & McDonnell as an electrical intern during the summer of 2025 and reported to me in my position as Electrical Section Manager.',
        'As an employee, Ahan was always a well-disciplined, industrious worker with a pleasant personality. Throughout his internship, Ahan demonstrated great perseverance and initiative. He is highly intelligent and has good analytical skills. Ahan’s work displayed his ability to provide a detailed understanding of complex electrical building design. He was highly proficient in applying the training he received in analyzing specific tasks.',
        'In addition, Ahan has excellent communication skills. He always explained his ideas very concisely and spoke with clarity. Ahan demonstrated good teamwork skills in tasks with other engineers. His work during the internship demonstrates he would be an excellent employee after graduation. He has proven himself to have the perseverance, initiative, and intellectual creativity necessary to perform electrical engineering work.',
      ],
    },
    {
      name: 'Tyler Cook, EIT',
      title: 'Staff Electrical Engineer at Burns & McDonnell',
      image: tylerImg,
      text: [
        'I am Tyler Cook, an Assistant Electrical Engineer at Burns & McDonnell. I have 2 years of experience working in electrical engineering in the building design and construction industry. Of the interns I have worked with over the course of my career, Ahan stands out.',
        'During his internship, Ahan displayed great talents in communication and attention to detail, and technical talents in computing logic, design concepts, and lighting calculations. He is respectful, considerate of others, open-minded, and is willing to give extra effort for the good of his team. He developed a great proficiency in the use of standard design software such as Revit and AGi32. In particular, his proficiency with AGi32 made his team efficient and clear on the best options for them to pursue in lighting designs. When we first started working together, I was impressed by how fast Ahan picked up difficult concepts and could apply them to varied situations. He truly enjoyed his work and excelled in his understanding of lighting design.',
        'However, it\'s not just Ahan\'s technical skills that impress me. He was also a joy to work with because of his positive attitude and the energy that he brought to the office each day. His motivation to learn and help others was key to everyone\'s success. In addition, throughout his internship he sought out constructive feedback and willingly made changes based on it. His internship occurred during a crucial project timeline, and his determination was necessary and highly valued not just by me but by his peers as well.',
        'I am confident that Ahan will take the skills he developed into future positions, and he will quickly become an asset.',
      ],
    },
  ];

  return (
    <StyledRecommendationsSection id="recommendations">
      <h2 className="numbered-heading" ref={revealTitle}>
        Recommendations
      </h2>

      <StyledGrid>
        {recommendationsData.map((rec, i) => (
          <StyledRecommendation key={i} ref={el => (revealRecommendations.current[i] = el)}>
            <div className="inner">
              {/* Profile info mapped here instead of bottom */}
              <header>
                <img src={rec.image} alt={rec.name} className="recommender-pic" />
                <div className="recommender-info">
                  <div className="recommender-name">{rec.name}</div>
                  <div className="recommender-title">{rec.title}</div>
                </div>
              </header>

              <div className="recommendation-text">
                {rec.text.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>
            </div>
          </StyledRecommendation>
        ))}
      </StyledGrid>
    </StyledRecommendationsSection>
  );
};

export default Recommendations;
