import { Typography } from '@mui/material';
import "../InsightsArea.css";

function NoSelection() {
  return (
    <div className='insights-area-wrapper-no-data'>
        <Typography variant='h4' fontWeight="bold">
            No investor selected
        </Typography>
        <Typography>
            Select an investor on the header to gather informations about investments
        </Typography>
    </div>
  );
}

export default NoSelection;
