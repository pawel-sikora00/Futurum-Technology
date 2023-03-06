import React, { useState, useEffect } from "react";
import Campaigns, { update } from "../constants/Campaigns";
import Towns from "../constants/Towns";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { Button, TextField } from "@material-ui/core";
import {
  Chip,
  FormControl,
  Input,
  makeStyles,
  InputLabel,
} from "@material-ui/core";
import { Select, MenuItem } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  formControlRoot: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "300px",
    flexWrap: "wrap",
    flexDirection: "row",
    border: "2px solid lightgray",
    padding: 8,
    borderRadius: "4px",
    "&> div.container": {
      gap: "6px",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    "& > div.container > span": {
      backgroundColor: "gray",
      padding: "1px 3px",
      borderRadius: "4px",
    },
  },
}));

const label = { inputProps: { "aria-label": "Switch demo" } };

interface ICreateCampaign {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  id: string;
}

const CreateCampaign = ({
  open,
  setOpen,
  name,
  setName,
  id,
}: ICreateCampaign) => {
  let history = useNavigate();
  const classes = useStyles();
  //campaign state
  const [bid_amount, setBid_amount] = useState(0);
  const [campaign_fund, setCampaign_fund] = useState(0);
  const [status, setStatus] = useState(false);
  const [radius, setRadius] = useState(0);
  const [town, setTown] = useState("");
  const [keywords, setKeywords] = useState<any[]>([]);
  const [currValue, setCurrValue] = useState("");

  //campaign error state
  const [nameError, setNameError] = useState(false);
  const [keywordsError, setKeywordsError] = useState(false);
  const [townError, setTownError] = useState(false);
  const [campaign_fundError, setCampaign_fundError] = useState(false);
  const [bid_amountError, setBid_amountError] = useState(false);
  const [radiusError, setRadiusError] = useState(false);

  //modal state
  const handleClose = () => {
    setOpen(false);
    setCurrValue("");
    setStatus(false);

    setKeywords([]);
    setKeywordsError(false);

    setNameError(false);
    setName("");

    setBid_amount(0);
    setBid_amountError(false);

    setCampaign_fund(0);
    setCampaign_fundError(false);

    setRadius(0);
    setRadiusError(false);

    setTown("");
    setTownError(false);
  };

  const handleKeyUp = (e: any) => {
    console.log(e.keyCode);
    if (e.keyCode === 32) {
      setKeywords((oldState) => [...oldState, e.target.value]);
      setCurrValue("");
    }
  };

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCurrValue(e.target.value);
  };

  const handleDelete = (item: string, index: number) => {
    let arr = [...keywords];
    arr.splice(index, 1);
    console.log(item);
    setKeywords(arr);
  };

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.checked);
  };

  // const camp = Campaigns.find((campaign) => campaign.id === idd);

  // const index = Campaigns.map((e) => {
  //   return e.id;
  // }).indexOf(id);

  // const handleSubmitCampaign = () => {
  //   console.log("handleSubmitCampaign");

  //   update({
  //     id: "1",
  //     name: "hello",
  //     keywords: ["word3", "word3", "word3"],
  //     bid_amount: 789,
  //     campaign_fund: 987,
  //     status: true,
  //     town: "Chicago",
  //     radius: 333,
  //   });

  // };

  const handleSubmitCampaign = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("handleSubmitCampaign");
    // if (Campaigns.some((campaign) => campaign.id === id)) {
    //   let a = Campaigns[index];
    //   useEffect(() => {
    //     setName(localStorage.getItem("id"));
    //     setName(localStorage.getItem("name"));
    //   }, []);
    //   a.name = name as string;
    //   setOpen(false);
    //   history("/");
    // }

    if (name === "") {
      setNameError(true);
    }

    if (keywords.length === 0) {
      setKeywordsError(true);
    }

    if (town === "") {
      setTownError(true);
    }

    if (bid_amount <= 0) {
      setBid_amountError(true);
    }

    if (campaign_fund <= 0) {
      setCampaign_fundError(true);
    }

    if (radius <= 0) {
      setRadiusError(true);
    }

    if (Campaigns.some((obj) => obj.id === id)) {
      update({
        id: "1",
        name: "hello",
        keywords: ["word3", "word3", "word3"],
        bid_amount: 789,
        campaign_fund: 987,
        status: true,
        town: "Chicago",
        radius: 333,
      });
    } else if (
      name &&
      keywords.length > 0 &&
      town &&
      bid_amount >= 0 &&
      campaign_fund >= 0 &&
      radius >= 0
    ) {
      const ids = uuid();
      let uniqueId = ids.slice(0, 8);

      let Name = name;
      let Keywords = keywords;
      let Status = status;
      let Bid_Amount = bid_amount;
      let Fund = campaign_fund;
      let Town = town;
      let Radius = radius;

      Campaigns.push({
        id: uniqueId,
        name: Name,
        keywords: Keywords,
        status: Status,
        bid_amount: Bid_Amount,
        campaign_fund: Fund,
        town: Town,
        radius: Radius,
      });

      setOpen(false);
      setCurrValue("");
      setStatus(false);

      setKeywords([]);
      setKeywordsError(false);

      setNameError(false);
      setName("");

      setBid_amount(0);
      setBid_amountError(false);

      setCampaign_fund(0);
      setCampaign_fundError(false);

      setRadius(0);
      setRadiusError(false);

      setTown("");
      setTownError(false);

      history("/");
    }
  };

  return (
    <div className="pt-12 pb-12">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Create New Campaign
          </Typography>
          <form autoComplete="off" noValidate onSubmit={handleSubmitCampaign}>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <TextField
                required
                id="outlined-basic"
                label="Campaign Name"
                variant="outlined"
                value={name}
                error={nameError}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="flex items-center justify-center">
                <p>Status</p>
                <Switch
                  {...label}
                  defaultChecked
                  checked={status}
                  onChange={handleChangeSwitch}
                />
              </div>
            </div>

            <TextField
              value={currValue}
              id="outlined-basic"
              required
              fullWidth
              error={keywordsError}
              label="Keywords"
              variant="outlined"
              onChange={handleChange}
              onKeyDown={handleKeyUp}
            />
            <div className={"container pt-2"}>
              {keywords.map((item, index) => (
                <Chip
                  size="small"
                  onDelete={() => handleDelete(item, index)}
                  label={item}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 my-8">
              <TextField
                required
                error={bid_amountError}
                type="number"
                id="outlined-basic"
                label="Bid Amount"
                variant="outlined"
                onChange={(e) => setBid_amount(parseInt(e.target.value))}
              />
              <TextField
                required
                type="number"
                error={campaign_fundError}
                id="outlined-basic"
                label="Campaign Fund"
                variant="outlined"
                onChange={(e) => setCampaign_fund(parseInt(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 my-8">
              <TextField
                label="Town"
                id="outlined-basic"
                variant="outlined"
                select
                value={town}
                required
                error={townError}
                onChange={(e) => setTown(e.target.value)}
              >
                {Towns.map((town) => (
                  <MenuItem value={town}>{town}</MenuItem>
                ))}
              </TextField>

              <TextField
                required
                error={radiusError}
                type="number"
                id="outlined-basic"
                label="Radius"
                variant="outlined"
                onChange={(e) => setRadius(parseInt(e.target.value))}
              />
            </div>
            <Button color="primary" fullWidth type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateCampaign;
