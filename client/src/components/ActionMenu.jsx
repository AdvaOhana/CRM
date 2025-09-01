import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';


export default function ActionMenu({ onClick, id, onDelete }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
    };


    return (
        <div onClick={onClick}>
            <IconButton onClick={handleClick}><MoreVertIcon /></IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => navigate(`${id}?edit=true`)}>
                    <EditIcon fontSize="small" style={{ marginRight: 8 }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={() => onDelete.mutate(id)}>
                    <DeleteIcon fontSize="small" style={{ marginRight: 8, color: 'red' }} />
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
}
