import { Box, Grid, Typography } from "@mui/material";
import { blueColor, BOX_SHADOW } from "../../../constants";
import "../InsightsArea.css";

function InformationCard({ label, value }) {
    return (
        <Box 
            className="information-card"
            component={Grid}
            direction="column"
            container
            boxShadow={BOX_SHADOW}
        >
            <Typography color="gray" variant="subtitle2" align="left">
                {label}
            </Typography>
            <Typography color={blueColor} fontWeight="bold" variant="h3" align="left">
                {value}
            </Typography>
        </Box>
    );
}

export default InformationCard;