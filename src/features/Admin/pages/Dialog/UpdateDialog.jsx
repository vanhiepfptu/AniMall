import React from "react";
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
function UpdateDialog({ updateDialogOpen, handleCloseUpdateDialog, formData, setFormData, handleUpdateAccount, updateFail }) {

  return (
    <div>
      <DialogContent>
        <Grid container spacing={2}>

          {/* Name */}
          <Grid item xs={12}>
            <TextField style={{ marginTop: '10px' }}
              label="Name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </Grid>

          {/* Role */}
          <Grid item xs={12}>
            <TextField
              label="Role"
              variant="outlined"
              fullWidth
              select
              value={formData.roleId}
              onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
            >
              <MenuItem value="1">Admin</MenuItem>
              <MenuItem value="2">Staff</MenuItem>
              <MenuItem value="3">Trainer</MenuItem>
              <MenuItem value="4">User</MenuItem>
            </TextField>
          </Grid>

          {/* Status */}
          <Grid item xs={12}>
            <TextField
              label="Status"
              variant="outlined"
              fullWidth
              select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Deactive</MenuItem>

            </TextField>
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleUpdateAccount}
          color="success"
          variant="contained">
          Confirm
        </Button>
        <Button
          onClick={handleCloseUpdateDialog}
          color="error"
          variant="outlined">Cancel</Button>

      </DialogActions>

      {/* Fail alert */}
      {updateFail && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            right: 20
          }}>
          <Paper>
            <Alert variant="filled" severity="error">
              Vui lòng điền đủ thông tin !
            </Alert>
          </Paper>
        </div>
      )}
    </div>

  );
}

export default UpdateDialog;