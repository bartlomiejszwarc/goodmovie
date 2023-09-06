import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function TvSeriesSeasonEpisodes({ episodes }) {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className='w-full md:w-3/5 space-y-3'>
      <span className='text-neutral-200 text-3xl pb-16'>Episodes</span>
      <div>
        {episodes?.map((episode, key) => (
          <Accordion
            key={key}
            expanded={expanded === `${key}`}
            onChange={handleChange(`${key}`)}
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(15px)',
              border: '1px solid #171717',
              borderRadius: '5px',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#a3a3a3' }} />}
              aria-controls='panel1bh-content'
              id='panel1bh-header'
            >
              <div className='flex flex-row items-center space-x-2'>
                <span className='text-xl text-neutral-100'>{episode?.name} </span>
                <span className='text-sm text-neutral-400 pt-[3px]'>
                  {' '}
                  E{episode?.episode_number} S{episode?.season_number}
                </span>
              </div>
            </AccordionSummary>
            <AccordionDetails className='bg-transparent bg-opacity-90 text-slate-100 flex flex-col space-y-2'>
              <span className='text-neutral-400'>{episode?.runtime}m</span>
              <p className=''>
                {episode?.overview?.split('.').filter(Boolean).slice(0, 3).join('.')}
              </p>
              {/* <Link to={`/tv/${series?.id}/episode/${episode?.episode_number}`}>
              <span className='border-b-[1px] border-neutral-500'>
                See episode {episode?.episode_number} details
              </span>
            </Link> */}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default TvSeriesSeasonEpisodes;
