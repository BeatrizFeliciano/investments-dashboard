import { Box, Grid, Typography } from "@mui/material";
import "../InsightsArea.css";
import { getEntityHqCountry, getEntityName, isEntity } from "../../../utils/getters";

function DemographicInfo({ selectedEntity }) {
    return (
        <div className="demographic-info">
            <Typography className="demographic-info">
                {getEntityName(selectedEntity)}
                {isEntity(selectedEntity) ? `, ${getEntityHqCountry(selectedEntity)}` : ""}
            </Typography>
        </div>
    );
}

export default DemographicInfo;