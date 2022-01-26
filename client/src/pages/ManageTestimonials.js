import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import axios from "axios";
import { Checkbox, TextField, Typography } from '@mui/material';
import FileBase from "react-file-base64";

const ManageData = ({ updateId, fetchedData }) => {

  const data = ({ name: "", image: "", post: "", description: "", active: "" })
  const [testimonial, setTestimonial] = useState(data);
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState('paper');
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = async () => {
    if (updateId) {
      try {
        const { data } = await axios.patch(`http://localhost:5000/update/${updateId}`, testimonial)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        await axios.post("http://localhost:5000/create", testimonial);
      } catch (error) {
        console.log(error)
      }
    }
    handleClose()
  };

  useEffect(() => {
    if (updateId) setTestimonial(fetchedData)
    else setTestimonial(data)
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const checkActive = () => {
    setIsActive(!isActive)

    if (isActive) testimonial.active = "true";
    else testimonial.active = "false";
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={scroll === 'paper'}>
          <Typography variant="p" color='primary' style={{ marginLeft: '50px' }}>Fields marked with (*) are mandatory</Typography>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <TextField type="text" value={testimonial.name} required label="Name" style={{ margin: "10px" }} fullWidth onChange={(e) => setTestimonial({ ...testimonial, name: e.target.value })} variant="outlined" />
            <TextField value={testimonial.post} required label="Position" style={{ margin: "10px" }} fullWidth onChange={(e) => setTestimonial({ ...testimonial, post: e.target.value })} variant="outlined" />
            <TextField value={testimonial.description} required label="Description" style={{ margin: "10px" }} fullWidth onChange={(e) => setTestimonial({ ...testimonial, description: e.target.value })} variant="outlined" />
            <FileBase type="file" multiple={false} value={testimonial?.image} onDone={({ base64 }) => setTestimonial({ ...testimonial, image: base64 })} />
            <Typography>
              <Checkbox color="primary" onClick={checkActive} style={{ marginLeft: "10px" }} checked={testimonial.active == "true"} text="Active" />Active
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ManageData