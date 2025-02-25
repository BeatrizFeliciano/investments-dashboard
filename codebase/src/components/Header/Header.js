import { AppBar, Autocomplete, TextField, Toolbar, Typography } from "@mui/material";
import "./styles.css";
import { useState } from "react";
import { getEntityName } from "../../utils/getters";

function Header({ data }) {
    const [selectedEntity, setSelectedEntity] = useState();

    const handleChange = (_, value) => {
        setSelectedEntity(value);
    }

    console.log(selectedEntity);

    return (
        <AppBar color="white">
            <Toolbar className="toolbar">
                <Typography variant="body2" component="div">
                    Investments Dashboard
                </Typography>
                <Autocomplete
                    disablePortal
                    options={data}
                    getOptionLabel={(option) => option.name}
                    size="small"
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Entity name"/>} 
                    onChange={handleChange}
                    isOptionEqualToValue={(option, value) => getEntityName(option) === getEntityName(value)} // Ensures unique selection
                />
            </Toolbar>
        </AppBar>
    );
}

export default Header;