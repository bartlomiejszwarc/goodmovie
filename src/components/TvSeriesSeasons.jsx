import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

function TvSeriesSeasons({ series, seasons }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className='w-full md:w-3/5 '>
      {seasons?.map((season, key) => (
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
              <span className='text-xl text-neutral-100'>{season?.name} </span>
              <span className='text-base text-neutral-500'>
                {season?.air_date ? season?.air_date?.slice(0, 4) : null}
              </span>
            </div>
          </AccordionSummary>
          <AccordionDetails className='bg-transparent bg-opacity-90 text-slate-100'>
            <p className='text-neutral-400'>{season?.episode_count} episodes </p>
            <p className='pb-2'>
              {season?.overview
                ? season?.overview?.split('.').filter(Boolean).slice(0, 3).join('.')
                : null}
              .
            </p>
            <Link to={`/tv/${series?.id}/season/${season?.season_number}`}>
              <span className='border-b-[1px] border-neutral-500'>
                See season {season?.season_number} details
              </span>
            </Link>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default TvSeriesSeasons;
