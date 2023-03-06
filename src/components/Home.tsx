import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Campaigns, { find, init } from "../constants/Campaigns";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { ImBin } from "react-icons/im";
import { AiTwotoneEdit } from "react-icons/ai";
// import EditCampaign from "./EditCampaign";

const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [editid, setEditId] = useState("");
  const [name, setName] = useState<string | null>("");
  const [id, setId] = useState("");

  let history = useNavigate();
  const handleDeleteCampaign = (id: string) => {
    console.log("handleDelete", id);
    const index = Campaigns.map((e) => {
      return e.id;
    }).indexOf(id);
    Campaigns.splice(index, 1);
    history("/");
  };

  const handleEdit = (id: string, name: string) => {
    console.log("handleEdit", id);
    // const campaign = Campaigns.find((obj) => {
    //   return obj.id === id;
    // });

    // localStorage.setItem("id", id);
    // localStorage.setItem("name", name);
    // history("/");
    // console.log(campaign);
    const camp = init(id);
    console.log(camp);
    setName(camp!.name);
    history("/");
    // setKeyword TODO
  };

  return (
    <div className="mx-[5%] md:mx-[20%]">
      <div className="my-16">
        <Button color="primary" variant="contained" onClick={handleOpen}>
          Create Campagin
        </Button>
      </div>
      {open && (
        <Modal
          name={name}
          setName={setName}
          open={open}
          setOpen={setOpen}
          id={id}
        />
      )}
      {find().map((campaign) => {
        return (
          <div
            className="border-2 mb-20 rounded-xl p-8 bg-emerald-300"
            key={campaign.id}
          >
            <div className="grid gap-y-4">
              <div>
                <p>
                  Campaign Name:
                  <span className="font-medium pl-4">{campaign.name}</span>
                </p>
              </div>
              <div>
                <p>
                  Campaign Fund:
                  <span className="font-medium pl-4">
                    {campaign.campaign_fund}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  Campaign Keywords:
                  <span className="font-medium pl-4">{campaign.keywords}</span>
                </p>
              </div>
              <div>
                <p>
                  Campaign Town:
                  <span className="font-medium pl-4">{campaign.town}</span>
                </p>
              </div>
              <div>
                <p>
                  Campaign Radius:
                  <span className="font-medium pl-4">{campaign.radius}</span>
                </p>
              </div>

              <div className="flex flex-row">
                Campaign Status:
                <span className="font-medium pl-4">
                  {campaign.status === true ? (
                    <div> Is On</div>
                  ) : (
                    <div> Is Off</div>
                  )}
                </span>
              </div>
            </div>
            <div className="flex justify-center gap-8 pt-10">
              <Button
                variant="contained"
                onClick={() => handleDeleteCampaign(campaign.id)}
              >
                <ImBin />
              </Button>

              <Button
                variant="contained"
                onClick={() => {
                  setEditId(campaign.id);
                  setOpen(true);
                  handleEdit(campaign.id, campaign.name);
                }}
              >
                <AiTwotoneEdit />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
