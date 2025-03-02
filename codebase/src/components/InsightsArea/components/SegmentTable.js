import { Box, Grid, Typography } from "@mui/material";
import { blueColor, BOX_SHADOW } from "../../../constants";
import "../InsightsArea.css";

function SegmentTable({ title, segments }) {

    if (segments && segments.length > 0)
        return (
            <Box 
                className="investment-areas"
                component={Grid}
                direction="column"
                container
                boxShadow={BOX_SHADOW}
            >
                <Typography 
                    className="investment-areas-title" 
                    color={blueColor} 
                    fontWeight="bold"
                    align="left"
                >
                    {title}
                </Typography>
                <Box className="investment-areas-list">
                    {segments.map((segment) => (
                        <div className="area-investment">{segment}</div>
                    ))}
                </Box>
            </Box>
        );

    return <Typography className="no-investment-areas">No {title}</Typography>
}

export default SegmentTable;