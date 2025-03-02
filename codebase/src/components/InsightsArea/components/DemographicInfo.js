import { Typography } from "@mui/material";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { getEntityHqCountry, getEntityName, isEntity } from "../../../utils/getters";
import "../InsightsArea.css";

function DemographicInfo({ selectedEntity }) {
    return (
        <div className="demographic-info">
            <div className="demographic-info-element">
                {isEntity(selectedEntity) ? <FaRegBuilding size={25}/> : <IoPersonOutline size={25}/>}
                <Typography className="demographic-info-text" variant="h6" fontWeight="bold">
                    {getEntityName(selectedEntity)}
                </Typography>
            </div>
            {isEntity(selectedEntity) && 
                <div className="demographic-info-element">
                    <MdOutlineLocationOn size={25}/>
                    <Typography className="demographic-info-text" variant="h6">
                        {getEntityHqCountry(selectedEntity)}
                    </Typography>
                </div>
            }
        </div>
    );
}

export default DemographicInfo;