"use client";

import BusinessForms from "@/app/components/BusinessForms";

const Card: React.FC = () => {
  const inputArray = [
    { label: "company Name", name: "companyName", type: "text" },
    { label: "agent Name", name: "agentName", type: "text" },
    { label: "name On Card", name: "nameOnCard", type: "text" },
    { label: "card Number", name: "cardNumber", type: "number" },
    { label: "expiration Date", name: "expirationDate", type: "month" },
    { label: "cvv", name: "cvv", type: "number" },
    { label: "billing Address", name: "billingAddress", type: "text" },
  ];
  return <BusinessForms type={"Card"} inputArray={inputArray} />;
};

export default Card;
