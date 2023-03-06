const Campaigns: Campaign[] = [
  {
    id: "1",
    name: "Mock campaign 1",
    keywords: ["word", "word", "word"],
    bid_amount: 123,
    campaign_fund: 321,
    status: true,
    town: "Warsaw",
    radius: 111,
  },
  {
    id: "2",
    name: "Mock campaign 2",
    keywords: ["word2", "word2", "word2"],
    bid_amount: 456,
    campaign_fund: 654,
    status: false,
    town: "Katowice",
    radius: 222,
  },
  {
    id: "3",
    name: "Mock campaign 3",
    keywords: ["word3", "word3", "word3"],
    bid_amount: 789,
    campaign_fund: 987,
    status: true,
    town: "Chicago",
    radius: 333,
  },
];

// export const create = (newCampaign: Campaign) => {
//   Campaigns.push(newCampaign);
// };

export const init = (id: string) => {
  return Campaigns.find((campaign) => campaign.id === id);
};

export const update = (campaign: Campaign) => {
  const id = campaign.id;
  const index = Campaigns.map((e) => {
    return e.id;
  }).indexOf(id);
  // let cmp = Campaigns.find((item) => item.id === id);
  // cmp = campaign;
  // Campaigns.splice(index, 1);
  console.log(Campaigns.splice(index, -1));
  let tab = [...Campaigns];
  tab[index] = campaign;
  return tab;
};

export const find = () => {
  return [...Campaigns];
};

export default Campaigns;
