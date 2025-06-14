import { Menu, MenuItem, IconButton } from '@mui/material';
import { Edit, Email, Block, Delete } from '@mui/icons-material';
import { User } from './../../types/User';

interface UserMenuProps {
  anchorEl: HTMLElement | null
  selectedUser: User | null
  onClose: () => void
}

export const UserMenu = ({ anchorEl, selectedUser, onClose }: UserMenuProps) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={onClose}
    PaperProps={{
      sx: {
        borderRadius: '8px',
        mt: 1,
        '& .MuiMenuItem-root': { fontSize: '0.8rem' }
      }
    }}
  >
    <MenuItem onClick={onClose}>
      <Edit sx={{ fontSize: '1rem', mr: 1 }} />
      Edit User
    </MenuItem>
    <MenuItem onClick={onClose}>
      <Email sx={{ fontSize: '1rem', mr: 1 }} />
      Send Email
    </MenuItem>
    <MenuItem onClick={onClose}>
      <Block sx={{ fontSize: '1rem', mr: 1 }} />
      Suspend User
    </MenuItem>
    <MenuItem onClick={onClose} sx={{ color: 'error.main' }}>
      <Delete sx={{ fontSize: '1rem', mr: 1 }} />
      Delete User
    </MenuItem>
  </Menu>
);