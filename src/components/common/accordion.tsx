import React, { useState } from 'react';
import cn from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { heightCollapse } from '@utils/motion/height-collapse';
import { useTranslation } from 'next-i18next';

type CollapseProps = {
  i: number;
  titleKey?: string;
  title?: string;
  content?: any;
  contentKey?: any;
  expanded: number;
  translatorNS: string;
  setExpanded: any;
  variant?: 'gray' | 'transparent';
};

export const Collapse: React.FC<CollapseProps> = ({
  i,
  expanded,
  setExpanded,
  titleKey,
  title,
  content,
  contentKey,
  translatorNS,
  variant = 'gray',
}) => {
  const isOpen = i === expanded;

  const { t } = useTranslation(translatorNS);
  return (
    <div
      className={cn("accordion-collapse", {
        "accordion-collapse--gray": variant === "gray",
        "accordion-collapse--transparent": variant === "transparent",
        "accordion-collapse--open": isOpen,
      })}
    >
      <motion.header
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
        className="accordion-collapse__header"
      >
        <h2 className="accordion-collapse__title">
          {titleKey ? t(titleKey) : title}
        </h2>
        <div className="accordion-collapse__icon-wrap">
          {variant === 'transparent' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          ) : (
            <>
              <div className="accordion-collapse__icon-line accordion-collapse__icon-line--horizontal" />
              <div className="accordion-collapse__icon-line accordion-collapse__icon-line--vertical" />
            </>
          )}
        </div>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="from"
            animate="to"
            exit="from"
            variants={heightCollapse()}
            style={{ overflow: 'hidden' }}
          >
            <div className="accordion-collapse__content">
              {contentKey ? t(contentKey) : content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type AccordionProps = {
  translatorNS: string;
  items: {
    titleKey?: string;
    title?: string;
    contentKey?: string;
    content?: string;
  }[];
  variant?: 'gray' | 'transparent';
};

const Accordion: React.FC<AccordionProps> = ({
  items,
  translatorNS,
  variant = 'gray',
}) => {
  const [expanded, setExpanded] = useState<number>(0);

  return (
    <>
      {items?.map((item, index) => (
        <Collapse
          i={index}
          key={item.titleKey}
          titleKey={item.titleKey}
          contentKey={item.contentKey}
          expanded={expanded}
          setExpanded={setExpanded}
          variant={variant}
          translatorNS={translatorNS}
        />
      ))}
    </>
  );
};

export default Accordion;
