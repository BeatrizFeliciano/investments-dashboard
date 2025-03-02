import { Autocomplete, Box, Grid, TextField, Typography, ListSubheader } from "@mui/material";
import { getEntityName, getEntityType } from "../../utils/getters";
import "./Header.css";
import { BOX_SHADOW } from "../../constants";

function Header({ data, setSelectedEntity }) {

    const handleChange = (_, value) => {
        setSelectedEntity(value);
    }

    return (
        <Box 
            className="header"
            component={Grid}
            container
            boxShadow={BOX_SHADOW}
            zIndex={1}
        >
            <Typography variant="h7" component="div">
                Investments Dashboard
            </Typography>
            <Autocomplete
                disablePortal
                options={data}
                getOptionLabel={(entity) => getEntityName(entity)}
                groupBy={(entity) => getEntityType(entity)}
                size="small"
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select entity"/>} 
                onChange={handleChange}
                isOptionEqualToValue={(option, value) => getEntityName(option) === getEntityName(value)} // Ensures unique selection
            />
        </Box>
    );
}

export default Header;