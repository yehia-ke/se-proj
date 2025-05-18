import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../../../shared-theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { useRef, useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import useScrollTrigger from '@mui/material/useScrollTrigger';

export default function HomePage(props: { disableCustomTheme?: boolean }) {
  const features = useRef<HTMLDivElement>(null);
  const highlights = useRef<HTMLDivElement>(null);
  const faq = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Scroll to top function
  const scrollToTop = () => {
    if (topRef.current) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // Show back-to-top button when scrolled down
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <div ref={topRef} />
      <AppAppBar featuresRef={features} highlightsRef={highlights} faqRef={faq} />
      <Hero />
      <div>
        <div ref={features}><Features /></div>
        <div><Divider /></div>
        <div ref={highlights}><Highlights /></div>
        <div><Divider /></div>
        <div ref={faq}><FAQ /></div>
        <div><Divider /></div>
        <div><Footer /></div>
      </div>
      <Zoom in={trigger}>
        <Fab
          color="primary"
          size="small"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </AppTheme>
  );
}